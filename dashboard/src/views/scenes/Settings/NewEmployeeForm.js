// @flow

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';
import style_sheet from './Settings.module.css';
import NewFormError from './NewFormError';
import I18n from '../../../localization';
import {employee_actions, employee_selectors} from '../../../business/employee';
import {MBForm, MBFormSubmitButton} from '../../elements/MBForm';
import {
  NameField,
  EmailField,
  IsDriverCheckbox,
  PasswordField
} from '../../shared/form_fields';

const cx = classNames.bind(style_sheet);

type NewEmployeeFormProps = {
  createEmployee: (Object) => void,
  close: () => void,
  resetForm: () => void,
  create_employee_errors: Array<string>,
  is_loading: boolean,
  successfully_created: boolean
};
export const NewEmployeeForm = ({
                                  createEmployee,
                                  close,
                                  resetForm,
                                  create_employee_errors,
                                  is_loading,
                                  successfully_created
                                }: NewEmployeeFormProps) => {
  if (successfully_created) {
    close();
  }
  return (
    <MBForm
      onSubmit={(values) => {
        resetForm();
        createEmployee(values);
      }}
      className={cx('newForm', {shake: !_.isEmpty(create_employee_errors)})}>
      <NameField name="first_name"/>
      <NameField name="last_name"/>
      <EmailField/>
      <PasswordField name="password"/>
      <PasswordField name="password_confirmation"/>
      <IsDriverCheckbox/>
      <MBFormSubmitButton
        is_loading={is_loading}
        text={I18n.t('ui.modal.new_employee.submit')}/>
      <NewFormError error_messages={create_employee_errors}/>
    </MBForm>
  );
};

const NewEmployeeFormSTP = state => ({
  create_employee_errors: employee_selectors.createEmployeeErrors(state),
  is_loading: employee_selectors.isCreating(state),
  successfully_created: employee_selectors.successfullyCreated(state)
});
const NewEmployeeFormDTP = {
  createEmployee: employee_actions.createEmployee,
  resetForm: employee_actions.resetNewEmployeeForm
};
const NewEmployeeFormContainer = connect(NewEmployeeFormSTP, NewEmployeeFormDTP)(NewEmployeeForm);

export default NewEmployeeFormContainer;
