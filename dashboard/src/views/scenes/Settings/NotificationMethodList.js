//@flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as Ent from '@minibar/store-business/src/utils/ent';
import NotificationMethodListRow from './NotificationMethodListRow';
import NewNotificationMethodButton from './NewNotificationMethodButton';
import style_sheet from './Settings.module.css';
import MBTable from '../../elements/MBTable';
import MBLoader from '../../elements/MBLoader';
import type NotificationMethod from '../../../business/notification_method';
import {
  notification_method_actions,
  notification_method_selectors,
  notification_method_helpers
} from '../../../business/notification_method';
import I18n from '../../../localization';

const {NOTIFICATION_METHOD_COLUMN_ORDER} = notification_method_helpers;
const {allIds} = notification_method_selectors;

export class NotificationMethodList extends PureComponent {
  props: NotificationMethodListProps
  state: NotificationMethodListState

  componentWillMount() {
    this.props.fetchNotificationMethods();
  }

  renderTableHeader = (columns) => (
    <MBTable.Header>
      {columns.map(column_name => {
        if (column_name === 'mobile_summary') return null; // no header for mobile summary column
        return (
          <MBTable.HeaderCell mobile_hidden
                              key={`${column_name}header`}>{I18n.t(`ui.table.${column_name}`)}</MBTable.HeaderCell>
        );
      })}
    </MBTable.Header>
  )

  renderTableBody = (notification_methods) => {
    if (this.props.fetching) return <MBLoader/>;
    return (<MBTable.Body>{notification_methods.map(this.renderRow)}</MBTable.Body>);
  };

  renderRow = (notification_method: NotificationMethod) => (
    <NotificationMethodListRow
      columns={NOTIFICATION_METHOD_COLUMN_ORDER}
      key={notification_method.id}
      notification_method={notification_method}/>
  );

  render() {
    const {notification_methods, fetching} = this.props;
    return (
      <div className={style_sheet.tableWrapper}>
        <NewNotificationMethodButton/>
        {!_.isEmpty(notification_methods) &&
        <MBTable.Table>
          {this.renderTableHeader(NOTIFICATION_METHOD_COLUMN_ORDER)}
          {this.renderTableBody(notification_methods)}
        </MBTable.Table>
        }
        {fetching && _.isEmpty(notification_methods) && <MBLoader/>}
      </div>
    );
  }
}

const NotificationMethodListSTP = () => {
  const find_notification_methods = Ent.find('notification_method');
  return state => ({
    notification_methods: find_notification_methods(state, allIds(state)),
    fetching: notification_method_selectors.isFetching(state)
  });
};
const NotificationMethodListDTP = {
  fetchNotificationMethods: notification_method_actions.fetchNotificationMethods
};
const NotificationMethodListContainer = connect(NotificationMethodListSTP, NotificationMethodListDTP)(NotificationMethodList);

export default NotificationMethodListContainer;
