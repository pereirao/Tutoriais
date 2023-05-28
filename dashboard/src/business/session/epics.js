//@flow

import _ from 'lodash';
import {concat, Observable, of, timer} from 'rxjs';
import {distinctUntilChanged, filter, map, merge, mergeMap, switchMap, tap} from 'rxjs/operators';
import Raven from 'raven-js';
import {replace} from 'connected-react-router';
// import { order_actions } from '../order';
import * as session_actions from './actions';
import session_selectors from './selectors';
import {POLLING_INTERVALS} from './reducer';
import {api, CredentialStorage, OAuth, Socket} from '../networking';
import createActionsForRequest from '../utils/create_actions_for_request';
import createActionForSocket from '../utils/create_action_for_socket';
import replaySkipUntil from '../utils/replay_skip_until';

const {myEmail, pollingIntervalLength, unconfirmedCount} = session_selectors;
const {setPollingInterval, resetState} = session_actions;

const SHORT_INTERVAL_PING_COUNT_THRESHOLD = 15;

export const authenticate = (action$: Object) => {
  const authenticate_response_action$ = action$
    .pipe(
      filter(action => action.type === 'SESSION:AUTHENTICATE'),
      switchMap(action => {
        const {email, password} = action.payload || {};
        return createActionsForRequest(OAuth.fetchToken({username: email, password}), action.type, action.meta);
      }));

  return authenticate_response_action$;
};

export const fetchMe = (action$: Object) => {
  const me_response_action$ = action$
    .pipe(
      filter(action => action.type === 'SESSION:AUTHENTICATE__SUCCESS' || action.type === 'SESSION:FETCH_ME'),
      switchMap(action => {
        const meta = {outside: action.type === 'SESSION:AUTHENTICATE__SUCCESS'};
        return createActionsForRequest(api.fetchMe(), 'SESSION:FETCH_ME', meta);
      }));

  return me_response_action$;
};

export const bootToLogin = (action$: Object) => {
  const unauthorized_request_action$ = action$
    .pipe(
      filter(action => (
        action.type && action.type.endsWith('__ERROR') && !_.get(action, 'meta.outside') && _.get(action.payload, 'response.status') === 401
      )));

  const failed_me_request_action$ = action$
    .pipe(
      filter(action => {
        return action.type === 'SESSION:FETCH_ME__ERROR' && !action.meta.outside && _.get(action.payload, 'error.message') === 'No user';
      }));

  const boot_to_login_response_action$ = action$
    .pipe(
      filter(action => action.type === 'SESSION:SIGN_OUT'),
      merge(unauthorized_request_action$),
      merge(failed_me_request_action$),
      map(_trigger => CredentialStorage.resetToken()),
      switchMap(_trigger => {
        const reset_state_action$ = of(resetState());
        const replace_login_action$ = of(replace('/login'));
        return concat(reset_state_action$, replace_login_action$);
      }));

  return boot_to_login_response_action$;
};

export const initializeSocket = (action$: Object, $state: Object) => {
  const socket_action$ = action$.pipe(
    filter(action => action.type === 'SESSION:FETCH_ME__SUCCESS'),
    tap((action) => Socket.emit('store id', action.payload.supplier.channel_id)),
    switchMap(_action => {
      return Observable.create(observer => {
        return Socket.on('message', data => {
          console.log({data})
          observer.next(data);
        });
      }).pipe(
        switchMap((data) => (
          createActionForSocket(data, $state.value.router.location.pathname, myEmail($state.value))
        ))
      );
    }));

  return socket_action$;
};

export const sendForHelp = (action$: Object) => {
  const socket_action$ = action$
    .pipe(
      filter(action => action.type === 'SESSION:SEND_FOR_HELP'),
      switchMap(action => {
        return createActionsForRequest(api.sendForHelp(action.payload), action.type, action.meta);
      }));

  return socket_action$;
};

export const ping = (action$: Object, $state: Object) => {
  const fetch_me_success_action$ = action$
    .pipe(filter(action => action.type === 'SESSION:FETCH_ME__SUCCESS'));

  const ping_response$ = action$
    .pipe(
      map(_action => pollingIntervalLength($state.value)),
      replaySkipUntil(fetch_me_success_action$),
      distinctUntilChanged(),
      switchMap(interval_length => {
        return timer(0, interval_length)
          .pipe( // emit once initially (at 0) then every interval_length
            mergeMap(_i => createActionsForRequest(api.ping(), 'SESSION:PING', {unconfirmed_count: unconfirmedCount($state.value)}))
          );
      }));

  return ping_response$;
};

export const takeBreak = (action$: Object) => {
  const take_break_action$ = action$
    .pipe(
      filter(action => action.type === 'SESSION:TAKE_BREAK'),
      switchMap(action => {
        return createActionsForRequest(api.takeBreak(action.payload), action.type, action.meta);
      }));

  return take_break_action$;
};

export const changeDeliveryExpectation = (action$: Object) => {
  const change_delivery_expectation_action$ = action$
    .pipe(
      filter(action => action.type === 'SESSION:CHANGE_DELIVERY_EXPECTATION'),
      switchMap(action => {
        return createActionsForRequest(api.changeDeliveryExpectation(action.payload), action.type, action.meta);
      }));

  return change_delivery_expectation_action$;
};

export const resumeWork = (action$: Object) => {
  const resume_work_action$ = action$
    .pipe(
      filter(action => action.type === 'SESSION:RESUME_WORK'),
      switchMap(action => {
        return createActionsForRequest(api.resumeWork(), action.type, action.meta);
      }));

  return resume_work_action$;
};

export const initializeRavenContext = (action$: Object) => {
  const raven_context_response$ = action$
    .pipe(
      filter(action => action.type === 'SESSION:FETCH_ME__SUCCESS'),
      map(action => (
        Raven.setUserContext({
          supplier_id: action.payload.supplier.id,
          supplier_name: action.payload.supplier.name,
          employee_email: action.payload.email
        })
      )),
      filter(() => false));

  return raven_context_response$;
};


export const socketFallback = (action$: Object, $state: Object) => {
  let short_interval_accurate_count = 0;

  const fallback_response$ = action$
    .pipe(
      filter(action => action.type === 'SESSION:PING__SUCCESS' && !_.isNull(action.meta.unconfirmed_count)),
      filter(action => {
        const same_unconfirmed_count = action.payload.unconfirmed_shipments.length === action.meta.unconfirmed_count;
        const has_fallen = pollingIntervalLength($state.value) === (POLLING_INTERVALS.short);
        return (!same_unconfirmed_count && !has_fallen) || (same_unconfirmed_count && has_fallen);
      }),
      switchMap(action => {
        const same_unconfirmed_count = action.payload.unconfirmed_shipments.length === action.meta.unconfirmed_count;
        if (same_unconfirmed_count) short_interval_accurate_count += 1;
        else short_interval_accurate_count = 0;
        const medium_is_probably_fine = short_interval_accurate_count >= SHORT_INTERVAL_PING_COUNT_THRESHOLD;
        const interval_action$ = of(medium_is_probably_fine ? setPollingInterval(POLLING_INTERVALS.medium) : setPollingInterval(POLLING_INTERVALS.short));
        // const stale_action$ = Rx.Observable.of(order_actions.markListsStale()); // TODO: remove?
        return interval_action$;
      }));

  return fallback_response$;
};
