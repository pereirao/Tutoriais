// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import style_sheet from './Settings.module.css';
import MBTable from '../../elements/MBTable';
import MBButton from '../../elements/MBButton';
import MBIcon from '../../elements/MBIcon';
import {notification_method_actions, notification_method_helpers} from '../../../business/notification_method';
import I18n from '../../../localization';


const {NOTIFICATION_METHOD_COLUMN_ORDER} = notification_method_helpers;

export class EditNotificationMethodForm extends PureComponent {
  constructor(props: Object) {
    super(props);
    const {notification_method} = this.props;
    this.state = {
      id: notification_method.id,
      notification_type: notification_method.notification_type,
      value: notification_method.value,
      label: notification_method.label || '',
      active: notification_method.active
    };
  }

  deleteNotificationMethod = () => {
    if (window.confirm(I18n.t('ui.alert.confirm_delete_notification_method'))) {
      this.props.destroyNotificationMethod(this.state.id);
      this.props.toggleEditMode();
    }
  }

  onChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  }

  submitNotificationMethod = () => {
    this.props.toggleEditMode();
    this.props.updateNotificationMethod({...this.state});
  };

  notificationTypeInput = (key, notification_method) => (
    <select
      onChange={(e) => this.onChange(e, key)}
      className={`notification_method_${notification_method.id}`}
      id={`${notification_method.id}${key}`}
      value={this.state[key]}>
      <option value="phone">Phone</option>
      <option value="sms">SMS</option>
      <option value="fax">Fax</option>
      <option value="email">Email</option>
    </select>)

  notificationValueInput = (key, notification_method) => {
    return (
      <input
        onChange={(e) => this.onChange(e, key)}
        className={`notification_method_${notification_method.id}`}
        id={`${notification_method.id}${key}`}
        value={this.state[key]}
        type="text"/>
    );
  }

  notificationActiveInput = (key, notification_method) => (
    <select
      onChange={(e) => this.onChange(e, key)}
      className={`notification_method_${notification_method.id}`}
      id={`${notification_method.id}${key}`}
      value={this.state[key]}>
      <option value>Active</option>
      <option value={false}>Inactive</option>
    </select>
  )

  notificationEditButton = (isMobile) => (
    <div className={style_sheet.editOptionsWrapper}>
      <div className={style_sheet.actionsWrapper}>
        <MBButton button_type="link" onClick={() => {
          this.submitNotificationMethod();
        }}>
          {I18n.t('ui.table.submit')}
        </MBButton>
        <div className={style_sheet.deleteIcon}>
          <MBButton button_type="link" onClick={() => {
            this.deleteNotificationMethod();
          }}>
            <MBIcon icon="delete" color="mb_red"/>
          </MBButton>
        </div>
      </div>
      <div className={isMobile ? style_sheet.mobileCancelWrapper : style_sheet.cancelWrapper}>
        <MBIcon icon="cancel" color="mb_red" onClick={() => {
          this.props.toggleEditMode();
        }}/>
      </div>
    </div>
  )

  // Value should be more specific to notification type and have validations
  formatCellDatum = (key, notification_method) => {
    switch (key) {
      case 'notification_type':
        return this.notificationTypeInput(key, notification_method);
      case 'value':
      case 'label':
        return this.notificationValueInput(key, notification_method);
      case 'active':
        return this.notificationActiveInput(key, notification_method);
      case 'edit':
        return this.notificationEditButton();
      case 'mobile_summary': {
        return (
          <table className={style_sheet.notificationTable}>
            <tbody>
            <tr>
              <td>Type:</td>
              <td>
                {this.notificationTypeInput('notification_type', notification_method)}
              </td>
            </tr>
            <tr>
              <td>Label:</td>
              <td>{this.notificationValueInput('label', notification_method)}</td>
            </tr>
            <tr>
              <td>Value:</td>
              <td>{this.notificationValueInput('value', notification_method)}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>{this.notificationActiveInput('active', notification_method)}</td>
            </tr>
            <tr>
              <td colSpan={2}>{this.notificationEditButton(true)}</td>
            </tr>
            </tbody>
          </table>
        );
      }
      default:
        return <p>{this.state[key]}</p>;
    }
  };

  render() {
    const {notification_method} = this.props;
    return (
      <MBTable.Row key={`${notification_method.id}row`}>
        {NOTIFICATION_METHOD_COLUMN_ORDER.map(col => {
          return (
            <MBTable.Cell
              key={`${notification_method.id}${col}`}
              mobile_only={col === 'mobile_summary'}
              mobile_hidden={col !== 'mobile_summary'}>
              {this.formatCellDatum(col, notification_method)}
            </MBTable.Cell>
          );
        })}
      </MBTable.Row>
    );
  }
}

const EditNotificationMethodFormDTP = {
  updateNotificationMethod: notification_method_actions.updateNotificationMethod,
  destroyNotificationMethod: notification_method_actions.destroyNotificationMethod
};
const EditNotificationMethodFormContainer = connect(null, EditNotificationMethodFormDTP)(EditNotificationMethodForm);

export default EditNotificationMethodFormContainer;
