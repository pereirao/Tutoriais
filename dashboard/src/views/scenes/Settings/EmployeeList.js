//@flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as Ent from '@minibar/store-business/src/utils/ent';
import EmployeeListRow from './EmployeeListRow';
import NewEmployeeButton from './NewEmployeeButton';
import style_sheet from './Settings.module.css';
import MBTable from '../../elements/MBTable';
import MBLoader from '../../elements/MBLoader';
import type Employee from '../../../business/employee';
import {employee_actions, employee_selectors, employee_helpers} from '../../../business/employee';
import I18n from '../../../localization';

const {EMPLOYEE_COLUMN_ORDER} = employee_helpers;
const {allIds} = employee_selectors;

export class EmployeeList extends PureComponent {
  props: EmployeeListProps
  state: EmployeeListState

  componentWillMount() {
    this.props.fetchEmployees();
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
  );

  renderTableBody = (employees) => {
    if (this.props.fetching) return <MBLoader/>;
    return (<MBTable.Body>{employees.map(this.renderRow)}</MBTable.Body>);
  };

  renderRow = (employee: Employee) => (
    <EmployeeListRow
      key={employee.id}
      employee={employee}/>
  );

  render() {
    const {employees, fetching} = this.props;
    return (
      <div className={style_sheet.tableWrapper}>
        <NewEmployeeButton/>
        {!_.isEmpty(employees) &&
        <MBTable.Table>
          {this.renderTableHeader(EMPLOYEE_COLUMN_ORDER)}
          {this.renderTableBody(employees)}
        </MBTable.Table>
        }
        {fetching && _.isEmpty(employees) && <MBLoader/>}
      </div>
    );
  }
}

const EmployeeListSTP = () => {
  const find_employees = Ent.find('employee');
  return state => ({
    employees: find_employees(state, allIds(state)),
    fetching: employee_selectors.isFetching(state)
  });
};
const EmployeeListDTP = {
  fetchEmployees: employee_actions.fetchEmployees
};
const EmployeeListContainer = connect(EmployeeListSTP, EmployeeListDTP)(EmployeeList);

export default EmployeeListContainer;
