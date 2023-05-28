// @flow

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';
import style_sheet from './Settings.module.css';
import NewFormError from './NewFormError';
import I18n from '../../../localization';
import {notification_method_selectors, notification_method_actions} from '../../../business/notification_method';
import {MBForm, MBFormSubmitButton} from '../../elements/MBForm';
import {
  NameField,
  NotificationTypeField
} from '../../shared/form_fields';

const cx = classNames.bind(style_sheet);

type NewNotificationMethodFormProps = {
  createNotificationMethod: (Object) => void,
  close: () => void,
  resetForm: () => void,
  create_notification_method_errors: Array<string>,
  is_loading: boolean,
  successfully_created: boolean
};
export const NewNotificationMethodForm = ({
                                            createNotificationMethod,
                                            close,
                                            resetForm,
                                            create_notification_method_errors,
                                            is_loading,
                                            successfully_created
                                          }: NewNotificationMethodFormProps) => {
  if (successfully_created) {
    close();
  }
  return (
    <MBForm
      onSubmit={(values) => {
        resetForm();
        createNotificationMethod(values);
      }}
      className={cx('newForm', {shake: !_.isEmpty(create_notification_method_errors)})}>
      <NotificationTypeField/>
      <div className={style_sheet.fieldLabel}>{I18n.t('form.label.value')}</div>
      <NameField name="value" placeholder={I18n.t('form.placeholder.notification_method_value')}/>
      <div className={style_sheet.fieldLabel}>{I18n.t('form.label.label')}</div>
      <NameField name="label" placeholder={I18n.t('form.placeholder.notification_method_label')} is_required={false}/>
      <MBFormSubmitButton is_loading={is_loading} text={I18n.t('ui.modal.new_notification_method.submit')}/>
      <NewFormError error_messages={create_notification_method_errors}/>
    </MBForm>
  );
};

const NewNotificationMethodFormSTP = state => ({
  create_notification_method_errors: notification_method_selectors.createNotificationMethodErrors(state),
  is_loading: notification_method_selectors.isCreating(state),
  successfully_created: notification_method_selectors.successfullyCreated(state)
});
const NewNotificationMethodFormDTP = {
  createNotificationMethod: notification_method_actions.createNotificationMethod,
  resetForm: notification_method_actions.resetNewNotificationMethodForm
};
const NewNotificationMethodFormContainer = connect(NewNotificationMethodFormSTP, NewNotificationMethodFormDTP)(NewNotificationMethodForm);

export default NewNotificationMethodFormContainer;
