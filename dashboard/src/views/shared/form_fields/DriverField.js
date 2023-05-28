// @flow

import React, {PureComponent} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Dropdown} from 'semantic-ui-react';
// import Select from 'react-select';
import {Link} from 'react-router-dom';
import * as Ent from '@minibar/store-business/src/utils/ent';
import I18n from '../../../localization';
import {ui_actions} from '../../../business/ui';
import {employee_helpers, employee_selectors, employee_actions} from '../../../business/employee';
import MBLoader from '../../elements/MBLoader';
import style_sheet from './form_fields.module.css';

const {driverOptions} = employee_helpers;
const {allIds} = employee_selectors;

//TODO: figure out positioning issues on modal for alignment

type DriverFieldProps = { onChangeText: (string, Object) => void, options: Array<Object> };

class DriverField extends PureComponent {
  props: DriverFieldProps

  static defaultProps = {name: 'driver_id'}
  input: ReactClass<*>

  onChange = (_e, option) => {
    this.props.onChangeText(_.get(option, 'value'), true);
  }

  render() {
    return (
      <DriverDropdownContainer onChange={this.onChange} {...this.props} />
    );
  }
}

type DriverDropdownProps = {
  options: Array<Object>,
  onChange: (Object, Object) => void,
  close: () => void,
  fetching_employees: boolean,
  fetchEmployees: () => void
}

class DriverDropdown extends PureComponent {
  props: DriverDropdownProps

  constructor(props) {
    super(props);
    props.fetchEmployees();
  }

  render() {
    const {options, onChange, close, fetching_employees, ...dropdown_props} = this.props;
    if (_.isEmpty(options)) {
      return (
        <div className={style_sheet.noDrivers}>
          {fetching_employees && <MBLoader type="spinner"/>}
          {!fetching_employees && [
            <p>{I18n.t('ui.body.no_drivers')}</p>,
            <Link onClick={close} to="/settings">{I18n.t('ui.link.add_driver')}</Link>
          ]}
        </div>
      );
    } else {
      return (
        <Dropdown
          selection
          options={options}
          onChange={onChange}
          {...dropdown_props} />
      );
    }
  }
}

const DriverDropdownSTP = () => {
  const findEmployees = Ent.find('employee');
  return state => ({
    fetching_employees: employee_selectors.isFetching(state),
    options: driverOptions(findEmployees(state, allIds(state)))
  });
};
const DriverDropdownDTP = {
  close: ui_actions.closeOrderStateModal,
  fetchEmployees: employee_actions.fetchEmployees
};
const DriverDropdownContainer = connect(DriverDropdownSTP, DriverDropdownDTP)(DriverDropdown);

export default DriverField;
