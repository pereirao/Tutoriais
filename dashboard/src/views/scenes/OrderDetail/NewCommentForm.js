// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import I18n from '../../../localization';
import {comment_actions} from '../../../business/comment';
import {MBForm, MBFormSubmitButton} from '../../elements/MBForm';
import {FreeResponseField} from '../../shared/form_fields';
import style_sheet from './OrderDetail.module.css';

type NewCommentFormProps = {
  order_id: string,
  isMinibarClosed: () => void,
  is_fetching: boolean, // TODO: do we need this here?
  addComment: (Object) => void
};

export class NewCommentForm extends PureComponent {
  props: NewCommentFormProps

  form: ReactClass<*>

  handleSubmit = data => {
    this.form.reset();
    this.props.addComment(this.props.order_id, data.body);
    this.props.isMinibarClosed();
  };

  render() {
    // const { is_fetching } = this.props;
    return (
      <MBForm
        onSubmit={this.handleSubmit}
        ref={el => {
          this.form = el;
        }}
        className={style_sheet.newCommentForm}>
        <p className={style_sheet.commentDirections}>{I18n.t('ui.body.order_comment_directions')}</p>
        <FreeResponseField name="body"/>
        <MBFormSubmitButton text={I18n.t('ui.button.add_note')}/>
      </MBForm>
    );
  }
}

const NewCommentFormDTP = {addComment: comment_actions.addComment};
const NewCommentFormContainer = connect(null, NewCommentFormDTP)(NewCommentForm);

export default NewCommentFormContainer;
