// @flow

import React, {PureComponent} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import I18n from '../../../localization';
import style_sheet from './InventoryListWrapper.module.css';
import VariantList from './VariantList';

const cx = classNames.bind(style_sheet);

const INVENTORY_SCENE_TABS = ['active', 'pending'];

type InvetoryListWrapperProps = { pushRoute: (string) => void };

export class InventoryListWrapper extends PureComponent {
  props: InvetoryListWrapperProps

  render() {
    const {location} = this.props;
    // default to active tab
    if (location.pathname === '/inventory') return <Redirect
      to={{pathname: '/inventory/active', state: {from: location}}}/>;
    return (
      <div className={style_sheet.sceneWrapper}>
        <div className={style_sheet.inventoryListsWrapper}>
          <div className={style_sheet.tabWrapper}>
            {INVENTORY_SCENE_TABS.map((tab, index) => (
              <div
                role="link"
                tabIndex={index}
                title={I18n.t(`accessibility.title.${tab}_inventories`)}
                className={cx({
                  tab: true,
                  activeTab: location.pathname.endsWith(tab) || (location.pathname.endsWith('inventory') && tab === 'active')
                })}
                onClick={() => this.props.pushRoute(`/inventory/${tab}`)}
                key={tab}>
                {I18n.t(`ui.tab.inventory-${tab}`)}
              </div>
            ))}
            <div className={style_sheet.tabBuffer}/>
          </div>
          <div className={style_sheet.tabContentWrapper}>
            <Switch>
              {INVENTORY_SCENE_TABS.map((tab) => (
                <Route key={`inventory_${tab}_route`} exact path={`/inventory/${tab}`} component={VariantList}/>
              ))}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const InventoryListWrapperDTP = {pushRoute: push};
const InventoryListWrapperContainer = connect(null, InventoryListWrapperDTP)(InventoryListWrapper);

export default InventoryListWrapperContainer;
