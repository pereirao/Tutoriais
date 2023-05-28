// @flow

import React, {PureComponent} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import I18n from '../../../localization';
import style_sheet from './OrderListWrapper.module.css';
import NotificationFeed from './NotificationFeed';
import OrderList from '../../shared/OrderList';

const cx = classNames.bind(style_sheet);

const ORDERS_SCENE_TABS = ['active', 'completed', 'future', 'all'];

type OrderListWrapperProps = { pushRoute: (string) => void };

export class OrderListWrapper extends PureComponent {
  props: OrderListWrapperProps

  render() {
    const {location} = this.props;
    // default to active tab
    if (location.pathname === '/orders') return <Redirect to={{pathname: '/orders/active', state: {from: location}}}/>;
    return (
      <div className={style_sheet.sceneWrapper}>
        <NotificationFeed/>
        <div className={style_sheet.orderListsWrapper}>
          <div className={style_sheet.tabWrapper}>
            {ORDERS_SCENE_TABS.map((tab, index) => (
              <div
                role="link"
                tabIndex={index}
                title={I18n.t(`accessibility.title.${tab}_orders`)}
                className={cx({tab: true, activeTab: location.pathname.endsWith(tab)})}
                onClick={() => this.props.pushRoute(`/orders/${tab}`)}
                key={tab}>
                {I18n.t(`ui.tab.${tab}`)}
              </div>
            ))}
            <div className={style_sheet.tabBuffer}/>
          </div>
          <div className={style_sheet.tabContentWrapper}>
            <Switch>
              {ORDERS_SCENE_TABS.map((tab) => (
                <Route key={`${tab}_route`} exact path={`/orders/${tab}`} component={OrderList}/>
              ))}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const OrderListWrapperDTP = {pushRoute: push};
const OrderListWrapperContainer = connect(null, OrderListWrapperDTP)(OrderListWrapper);

export default OrderListWrapperContainer;
