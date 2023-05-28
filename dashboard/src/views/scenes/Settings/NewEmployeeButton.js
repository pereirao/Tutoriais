// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import I18n from '../../../localization';
import NewEmployeeModal from './NewEmployeeModal';
import MBButton from '../../elements/MBButton';
import MBIcon from '../../elements/MBIcon';
import { employee_actions } from '../../../business/employee';

type NewEmployeeButtonState = {is_modal_open: boolean};
export class NewEmployeeButton extends PureComponent {
  state: NewEmployeeButtonState

  constructor(props){
    super(props);
    this.state = { is_modal_open: false };
  }

  toggleModalVisibility = () => {
    this.props.resetForm();
    this.setState({ is_modal_open: !this.state.is_modal_open });
  }

  render(){
    return (
      <div>
        <MBButton
          title={I18n.t('accessibility.title.add_employee')}
          button_type="link"
          size="large"
          onClick={this.toggleModalVisibility}>
          <MBIcon icon="add" color="mb_red" size="small" />
          <div>{I18n.t('ui.button.new_employee')}</div>
        </MBButton>
        <NewEmployeeModal hidden={!this.state.is_modal_open} close={this.toggleModalVisibility} />
      </div>
    );
  }
}

const NewEmployeeFormDTP = {
  resetForm: employee_actions.resetNewEmployeeForm
};
const NewEmployeeButtonContainer = connect(null, NewEmployeeFormDTP)(NewEmployeeButton);

export default NewEmployeeButtonContainer;
