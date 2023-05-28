// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import style_sheet from './Settings.module.css';
import MBTable from '../../elements/MBTable';
import MBButton from '../../elements/MBButton';
import MBIcon from '../../elements/MBIcon';
import {employee_actions, employee_helpers} from '../../../business/employee';
import I18n from '../../../localization';


const {EMPLOYEE_COLUMN_ORDER} = employee_helpers;

export class EditEmployeeForm extends PureComponent {
  constructor(props: Object) {
    super(props);
    const {employee} = this.props;
    this.state = {
      id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      roles: employee.roles.includes('driver') ? 'Yes' : 'No',
      active: employee.active
    };
  }

  deleteEmployee = () => {
    if (window.confirm(I18n.t('ui.alert.confirm_delete_employee'))) {
      this.props.destroyEmployee(this.state.id);
      this.props.toggleEditMode();
    }
  }

  onChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  }

  submitEmployee = () => {
    this.props.toggleEditMode();
    this.props.updateEmployee({...this.state});
  }

  employeeEditButton = () => (
    <div className={style_sheet.editOptionsWrapper}>
      <div className={style_sheet.actionsWrapper}>
        <MBButton button_type="link" onClick={() => {
          this.submitEmployee();
        }}>{I18n.t('ui.table.submit')}</MBButton>
        <div className={style_sheet.deleteIcon}>
          <MBIcon icon="delete" color="mb_red" onClick={() => {
            this.deleteEmployee();
          }}/>
        </div>
      </div>
      <div className={style_sheet.cancelWrapper}>
        <MBIcon icon="cancel" color="mb_red" onClick={() => {
          this.props.toggleEditMode();
        }}/>
      </div>
    </div>
  )

  employeeActiveInput = (key, employee) => (
    <select
      onChange={(e) => this.onChange(e, key)}
      className={`employee_${employee.id}`}
      id={`${employee.id}${key}`}
      value={this.state[key]}>
      <option value>Active</option>
      <option value={false}>Inactive</option>
    </select>
  )

  employeeEmailInput = (key, employee) => (
    <input
      onChange={(e) => this.onChange(e, key)}
      className={`employee_${employee.id}`}
      id={`${employee.id}${key}`}
      value={this.state[key]}
      type="text"/>
  )

  employeeNameInput = (key, employee) => (
    <input
      onChange={(e) => this.onChange(e, key)}
      className={`employee_${employee.id}`}
      id={`${employee.id}${key}`}
      value={this.state[key]}
      type="text"/>
  )

  formatCellDatum = (key, employee) => {
    switch (key) {
      case 'full_name':
        return (
          <span>
            {this.employeeNameInput('first_name', employee)}
            {this.employeeNameInput('last_name', employee)}
          </span>
        );
      case 'email':
        return this.employeeEmailInput(key, employee);
      case 'active':
        return this.employeeActiveInput(key, employee);
      case 'edit':
        return this.employeeEditButton();

      case 'mobile_summary': {
        return (
          <table className={style_sheet.notificationTable}>
            <tbody>
            <tr>
              <td>First Name:</td>
              <td>
                {this.employeeNameInput('first_name', employee)}
              </td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>
                {this.employeeNameInput('last_name', employee)}
              </td>
            </tr>
            <tr>
              <td>Driver:</td>
              <td>{employee.roles.includes('driver') ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>
                {this.employeeEmailInput('email', employee)}
              </td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>{this.employeeActiveInput('active', employee)}</td>
            </tr>
            <tr>
              <td colSpan={2}>{this.employeeEditButton()}</td>
            </tr>
            </tbody>
          </table>
        );
      }
      default:
        return <p>{this.state[key]}</p>;
    }
  }

  render() {
    const {employee} = this.props;
    return (
      <MBTable.Row key={`${employee.id}row`}>
        {EMPLOYEE_COLUMN_ORDER.map(col => {
          return (
            <MBTable.Cell
              key={`${employee.id}${col}`}
              mobile_only={col === 'mobile_summary'}
              mobile_hidden={col !== 'mobile_summary'}>
              {this.formatCellDatum(col, employee)}
            </MBTable.Cell>
          );
        })}
      </MBTable.Row>
    );
  }
}

const EditEmployeeFormDTP = {
  updateEmployee: employee_actions.updateEmployee,
  destroyEmployee: employee_actions.destroyEmployee
};
const EditEmployeeFormContainer = connect(null, EditEmployeeFormDTP)(EditEmployeeForm);

export default EditEmployeeFormContainer;
