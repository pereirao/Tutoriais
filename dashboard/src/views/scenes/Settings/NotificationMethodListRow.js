// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditNotificationMethodForm from './EditNotificationMethodForm';
import style_sheet from './Settings.module.css';
import MBTable from '../../elements/MBTable';
import MBButton from '../../elements/MBButton';
import MBIcon from '../../elements/MBIcon';
import type {NotificationMethod} from '../../../business/notification_method';
import {notification_method_helpers, notification_method_selectors} from '../../../business/notification_method';
import I18n from '../../../localization';


const {notificationMethodTableRow, NOTIFICATION_METHOD_COLUMN_ORDER} = notification_method_helpers;

type NotificationMethodListRowProps = { notification_method: NotificationMethod, updating_id: number };
type NotificationMethodListRowState = { edit_mode: boolean };

export class NotificationMethodListRow extends Component {
  props: NotificationMethodListRowProps
  state: NotificationMethodListRowState

  constructor(props: NotificationMethodListRowProps) {
    super(props);
    this.state = {edit_mode: false};
  }

  toggleEditMode = () => {
    this.setState({edit_mode: !this.state.edit_mode});
  };

  onChange = (e: Object, field: string) => {
    this.setState({[field]: e.target.value});
  };

  // TODO: Use icons in mobile summary
  renderCells(col: string) {
    const row_data = notificationMethodTableRow(this.props.notification_method);
    if (this.props.updating_id === this.props.notification_method.id) return 'loading...'; // TODO: Use Loader
    switch (col) {
      case 'mobile_summary': {
        return (
          <table className={style_sheet.notificationTable}>
            <tbody>
            <tr>
              <td>Type:</td>
              <td>{row_data.notification_type}</td>
            </tr>
            <tr>
              <td>Label:</td>
              <td>{row_data.label}</td>
            </tr>
            <tr>
              <td>Value:</td>
              <td>{row_data.value}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>{row_data.active}</td>
            </tr>
            <tr>
              <td colSpan={2}>{this.renderButton(true)}</td>
            </tr>
            </tbody>
          </table>
        );
      }
      case 'edit':
        return (this.renderButton());
      default:
        return (row_data[col]);
    }
  }

  renderButton(isMobile = false) {
    if (this.props.updating_id === this.props.notification_method.id) {
      return (<td>Loading...</td>); // TODO: Use Loader
    } else {
      return (
        <MBButton button_type="link" onClick={this.toggleEditMode}>
          <div className={style_sheet.editIcon}>
            <MBIcon icon="edit" color="mb_red" size="small"/>
          </div>
          {isMobile ? I18n.t('ui.button.edit_notification_method_mobile') : I18n.t('ui.button.edit_notification_method')}
        </MBButton>
      );
    }
  }

  render() {
    if (this.state.edit_mode) {
      return (
        <EditNotificationMethodForm toggleEditMode={this.toggleEditMode}
                                    notification_method={this.props.notification_method}/>
      );
    } else {
      return (
        <MBTable.Row key={`${this.props.notification_method.id}row`}>
          {NOTIFICATION_METHOD_COLUMN_ORDER.map(col => {
            return (
              <MBTable.Cell
                key={`${this.props.notification_method.id}${col}`}
                mobile_only={col === 'mobile_summary'}
                mobile_hidden={col !== 'mobile_summary'}>
                {this.renderCells(col)}
              </MBTable.Cell>
            );
          })}
        </MBTable.Row>
      );
    }
  }
}

const NotificationMethodListRowSTP = (state) => ({
  updating_id: notification_method_selectors.updatingId(state)
});

const NotificationMethodListRowContainer = connect(NotificationMethodListRowSTP)(NotificationMethodListRow);

export default NotificationMethodListRowContainer;
