// @flow

import React, {PureComponent} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {session_actions, session_selectors} from '../../../business/session';
import {settings_actions} from '../../../business/settings';
import {ui_selectors} from '../../../business/ui';
import MainNav from '../MainNav';
import MBLoader from '../../elements/MBLoader';
import OrderListWrapper from '../../scenes/OrderListWrapper';
import OrderDetail from '../../scenes/OrderDetail';
import Reports from '../../scenes/Reports';
import InventoryListWrapper from '../../scenes/Inventory/InventoryListWrapper';
import Settings from '../../scenes/Settings';
import OrderStateModal from '../../shared/OrderStateModal';
import style_sheet from './Home.module.css';
import ForceRefreshModal from './ForceRefreshModal';

type HomeProps = {
  logged_in: boolean,
  fetching_me: boolean,
  force_refresh: boolean,
  location: Object,
  fetchMe: () => void,
  fetchSettings: () => void
};

export class Home extends PureComponent {
  props: HomeProps

  componentWillMount() {
    this.props.fetchMe();
    this.props.fetchSettings();
  }

  render() {
    const {logged_in, fetching_me, force_refresh, location} = this.props;
    if (!logged_in || fetching_me) return <div className={style_sheet.loaderRow}><MBLoader type="spinner" size="large"/>
    </div>;
    if (location.pathname === '/') return <Redirect to={{pathname: '/orders/active', state: {from: location}}}/>;
    return (
      <div className={style_sheet.container}>
        <MainNav location={location}/>
        <Switch>
          <Route path="/orders" component={OrderListWrapper}/>
          <Route exact path="/order/:number" component={OrderDetail}/>
          <Route exact path="/reports" component={Reports}/>
          <Route path="/inventory" component={InventoryListWrapper}/>
          <Route exact path="/settings" component={Settings}/>
        </Switch>
        <OrderStateModal/>
        <ForceRefreshModal hidden={!force_refresh}/>
      </div>
    );
  }
}

const HomeSTP = state => ({
  logged_in: session_selectors.userIsLoggedIn(state),
  fetching_me: session_selectors.isFetchingMe(state),
  force_refresh: ui_selectors.isForceRefreshModalOpen(state)
});
const HomeDTP = {fetchMe: session_actions.fetchMe, fetchSettings: settings_actions.fetchSettings};
const HomeContainer = withRouter(connect(HomeSTP, HomeDTP)(Home));

export default HomeContainer;
