//@flow

import React, {PureComponent} from 'react';
import {Dropdown} from 'semantic-ui-react';
import I18n from '../../../localization';
import style_sheet from './form_fields.module.css';

const NOTIFICATION_TYPE_OPTIONS = [
  {value: 'phone', text: I18n.t('form.option.phone')},
  {value: 'sms', text: I18n.t('form.option.sms')},
  {value: 'fax', text: I18n.t('form.option.fax')},
  {value: 'email', text: I18n.t('form.option.email')}
];

type NotificationTypeFieldProps = { onChangeText: (string, Object) => void, options: Array<Object> };

class NotificationTypeField extends PureComponent {
  props: NotificationTypeFieldProps

  static defaultProps = {name: 'notification_type'}
  input: ReactClass<*>

  onChange = (_e, {value}) => {
    this.props.onChangeText(value, true);
  }

  render() {
    return (
      <Dropdown
        selection
        placeholder={I18n.t('form.placeholder.notification_type')}
        options={NOTIFICATION_TYPE_OPTIONS}
        className={style_sheet.textInput}
        onChange={this.onChange}/>
    );
  }
}

export default NotificationTypeField;
