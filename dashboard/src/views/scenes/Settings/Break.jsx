import { connect } from 'react-redux';
import moment from 'moment';
import React from 'react';

import I18n from '../../../localization';
import MBButton from '../../elements/MBButton';
import { session_actions, session_selectors, session_helpers } from '../../../business/session';

const Break = ({ supplierBreak = null, resumeWork = () => {} }) => {
  const onBreak = session_helpers.onBreak(supplierBreak);

  if (onBreak){
    return (
      <section>
        <div>You are on a break until {moment.parseZone(supplierBreak.end_time).format('lll')}.</div>
        <MBButton title={I18n.t('accessibility.title.return_to_work')} button_type="link" size="large" onClick={resumeWork}>
          <div>{I18n.t('ui.button.return_to_work')}</div>
        </MBButton>
      </section>
    );
  } else {
    return (
      <section>
        <div>You are not on a break.</div>
      </section>
    );
  }
};
const BreakContainer = connect(
  (state) => ({ supplierBreak: session_selectors.supplierBreak(state) }),
  (dispatch) => ({
    resumeWork: () => dispatch(session_actions.resumeWork())
  })
)(Break);

export default BreakContainer;
