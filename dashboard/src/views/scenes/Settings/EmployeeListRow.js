// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditEmployeeForm from './EditEmployeeForm';
import style_sheet from './Settings.module.css';
import MBTable from '../../elements/MBTable';
import MBButton from '../../elements/MBButton';
import MBIcon from '../../elements/MBIcon';
import type {Employee} from '../../../business/employee';
import {employee_helpers, employee_selectors} from '../../../business/employee';
import I18n from '../../../localization';


const {employeeTableRow, EMPLOYEE_COLUMN_ORDER} = employee_helpers;

type EmployeeListRowProps = { employee: Employee, updating_id: number };
type EmployeeListRowState = { edit_mode: boolean };

export class EmployeeListRow extends Component {
  props: EmployeeListRowProps
  state: EmployeeListRowState

  constructor(props: EmployeeListRowProps) {
    super(props);
    this.state = {
      edit_mode: false
    };
  }

  toggleEditMode = () => {
    this.setState({edit_mode: !this.state.edit_mode});
  };

  onChange = (e: Object, field: string) => {
    this.setState({[field]: e.target.value});
  };

  // TODO: Use icons in mobile summary
  renderCells(col: string) {
    const row_data = employeeTableRow(this.props.employee);
    if (this.props.updating_id === this.props.employee.id) return 'loading...'; // TODO: Use Loader
    switch (col) {
      case 'mobile_summary': {
        return (
          <table className={style_sheet.notificationTable}>
            <tbody>
            <tr>
              <td>Name:</td>
              <td>{row_data.full_name}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{row_data.email}</td>
            </tr>
            <tr>
              <td>Driver:</td>
              <td>{row_data.roles}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>{row_data.active}</td>
            </tr>
            <tr>
              <td colSpan={2}>{this.renderButton()}</td>
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

  renderButton() {
    if (this.props.updating_id === this.props.employee.id) {
      return (<td>Loading...</td>); // TODO: Use Loader
    } else {
      return (
        <MBButton button_type="link" onClick={this.toggleEditMode}>
          <div className={style_sheet.editIcon}>
            <MBIcon icon="edit" color="mb_red" size="small"/>
          </div>
          {I18n.t('ui.button.edit_employee')}
        </MBButton>
      );
    }
  }

  render() {
    if (this.state.edit_mode) {
      return (
        <EditEmployeeForm toggleEditMode={this.toggleEditMode} employee={this.props.employee}/>
      );
    } else {
      return (
        <MBTable.Row key={`${this.props.employee.id}row`}>
          {EMPLOYEE_COLUMN_ORDER.map(col => {
            return (
              <MBTable.Cell
                key={`${this.props.employee.id}${col}`}
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

const EmployeeListRowSTP = (state) => ({
  updating_id: employee_selectors.updatingId(state)
});

const EmployeeListRowContainer = connect(EmployeeListRowSTP)(EmployeeListRow);

export default EmployeeListRowContainer;
