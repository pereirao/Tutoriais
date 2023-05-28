// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import I18n from '../../../localization';
import NewNotificationMethodModal from './NewNotificationMethodModal';
import MBButton from '../../elements/MBButton';
import MBIcon from '../../elements/MBIcon';
import { notification_method_actions } from '../../../business/notification_method';

type NewNotificationMethodButtonState = {is_modal_open: boolean};
export class NewNotificationMethodButton extends PureComponent {
  state: NewNotificationMethodButtonState

  constructor(props){
    super(props);
    this.state = {is_modal_open: false};
  }

  toggleModalVisibility = () => {
    this.props.resetForm();
    this.setState({ is_modal_open: !this.state.is_modal_open });
  }

  render(){
    return (
      <div>
        <MBButton
          title={I18n.t('accessibility.title.add_notification_method')}
          button_type="link"
          size="large"
          onClick={this.toggleModalVisibility}>
          <MBIcon icon="add" size="small" color="mb_red" />{I18n.t('ui.button.new_notification_method')}
        </MBButton>
        <NewNotificationMethodModal hidden={!this.state.is_modal_open} close={this.toggleModalVisibility} />
      </div>
    );
  }
}


const NewNotificationMethodFormDTP = {
  resetForm: notification_method_actions.resetNewNotificationMethodForm
};
const NewNotificationMethodButtonContainer = connect(null, NewNotificationMethodFormDTP)(NewNotificationMethodButton);

export default NewNotificationMethodButtonContainer;
