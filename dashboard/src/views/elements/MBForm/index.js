// @flow

import React, {PureComponent} from 'react';
import classNames from 'classnames/bind';
import _ from 'lodash';
import I18n from '../../../localization';
import MBLoader from '../MBLoader';
import style_sheet from './MBForm.module.css';

const cx = classNames.bind(style_sheet);
type MBFormField = { value: string, validity: Object, is_pristine: boolean };

const fieldRefToInitialState = field_ref => ({
  [field_ref.props.name]: {
    value: field_ref.props.initial_value || '',
    validity: null,
    is_pristine: true
  }
});

export const formIsValid = fields => (
  _.reduce(fields, (is_valid, field_state) => (
    (is_valid && field_state.validity && _.every(field_state.validity))
    || (is_valid && !field_state.validity) // accounts for fields without validators
  ), true)
);

type MBFormProps = {
  onSubmit: Object => void,
  validateSubmittable: Object => boolean,
  field_spacer_width: number,
  submit_from_last: boolean,
  style: Object
};
type MBFormState = { focused_field: string, fields: { [string]: MBFormField } };

export class MBForm extends PureComponent {
  props: MBFormProps
  state: MBFormState

  static defaultProps = {
    field_spacer_width: 16,
    submit_from_last: true,
    validateSubmittable: () => true
  }

  field_refs: Array<ReactClass<*>>

  constructor(props) {
    super(props);
    this.field_refs = [];
    this.state = {focused_field: null, fields: {}};
  }

  componentWillMount = () => {
    // initialize state by parsing child fields
    let fields = {};
    React.Children.forEach(this.props.children, child => {
      if (child.props.name) {
        fields = {...fields, ...fieldRefToInitialState(child)};
      }
    });
    this.setState({fields});
  }
  componentDidMount = () => {
    this.initializeFields();
  }

  formIsSubmittable = () => formIsValid(this.state.fields) && this.props.validateSubmittable(this.state.fields)

  submitForm = () => this.props.onSubmit(_.mapValues(this.state.fields, field => field.value))

  /* mutators */

  reset = () => {
    let fields = {};
    this.field_refs.forEach(field_ref => {
      fields = {...fields, ...fieldRefToInitialState(field_ref)};
    });
    this.setState({fields});
  }

  initializeFields = () => {
    const initial_fields = this.field_refs.reduce((fields_acc, field_ref) => {
      let field_state = this.state.fields[field_ref.props.name];
      if (field_ref.maskValue) field_state = {...field_state, value: field_ref.maskValue(field_state.value)};
      if (field_ref.getValidity) field_state = {...field_state, validity: field_ref.getValidity(field_state.value)};
      return {...fields_acc, [field_ref.props.name]: field_state};
    }, {});
    this.setState({fields: initial_fields});
  }

  focusField = field_ref => {
    if (!field_ref || !field_ref.input) return;
    field_ref.input.focus();
    this.setState({focused_field: field_ref.props.name});
  }

  /* handlers */

  handleChange = (field_name, value, validity) => {
    // NOTE: using setState's updater parameter so that quick sequential setFieldValues aggregate correctly
    this.setState(prev_state => ({
      fields: {
        ...prev_state.fields,
        [field_name]: {value, validity, is_pristine: false}
      }
    }));
  }

  handleKeyPress = target => {
    if (target.charCode === 13 && this.formIsSubmittable()) this.submitForm(); // if 'enter' key is pressed
  };


  /* renderers */

  renderField = input_el => {
    const field_name = input_el.props.name;
    if (!field_name) return input_el;
    const field_state = this.state.fields[field_name];
    if (!field_state) return null;
    const is_valid = _.every(field_state.validity); // empty if successfully fulfilled all validators
    const is_focused = this.state.focused_field === field_name;
    return React.cloneElement(input_el, {
      ...field_state,
      key: field_name,
      ref: el => {
        const field_index = this.field_refs.findIndex(ref => _.get(ref, 'props.name') === field_name);
        if (field_index === -1) { // if field_ref doesn't already exist append it to field_ref array
          this.field_refs = [...this.field_refs, el];
        } else if (el) { // if field_ref exists then update ref at index
          this.field_refs[field_index] = el;
        }
      },
      input_state: field_name === this.state.focused_field ? 'focus' : 'blur',
      onChangeText: (value, validity) => this.handleChange(field_name, value, validity),
      onFocus: () => this.setState({focused_field: field_name}),
      onBlur: () => this.setState({focused_field: null}), // only in web version
      onSubmitEditing: this.handleSubmitField,
      should_display_error: !is_valid && !is_focused && !field_state.is_pristine,
      onKeyPress: input_el.props.submit_on_enter ? this.handleKeyPress : null,
      formFields: input_el.props.pass_form_state && this.state.fields
    });
  }

  renderSubmitButton = (button_el, index) => {
    if (!this.state.fields) return null;
    return React.cloneElement(button_el, {
      key: `submit_button${index}`,
      button_type: this.formIsSubmittable() ? 'action' : 'disabled',
      onClick: () => {
        if (button_el.props.onClick) button_el.props.onClick();
        this.submitForm();
      }
    });
  }

  renderChildren = (child, index) => {
    if (child.type && child.type.displayName === 'MBFormSubmitButton') return this.renderSubmitButton(child, index);
    else if (child.props.name) return this.renderField(child);
    else return child;
  }

  render() {
    const container_props = _.omit(this.props, ['onSubmit', 'validateSubmittable', 'field_spacer_width', 'submit_from_last']);
    return (
      <div {...container_props}>
        {React.Children.map(this.props.children, this.renderChildren)}
      </div>
    );
  }
}

type MBFormSubmitButtonProps = {
  text: string,
  button_type: string,
  onClick: () => void,
  is_loading: boolean,
  inverted: boolean
};

export class MBFormSubmitButton extends PureComponent {
  props: MBFormSubmitButtonProps

  static defaultProps = {is_loading: false, inverted: false, title: I18n.t('form.title.submit_default')}
  static displayName = 'MBFormSubmitButton' // must set displayName to persist through uglification

  handleClick = () => (
    (this.props.button_type === 'disabled' || this.props.is_loading) ? null : this.props.onClick()
  )

  render() {
    const {text, button_type, title, is_loading = false, inverted = false} = this.props;
    const class_name = cx('submitButton', button_type, {inverted});
    return (
      <div className={class_name} onClick={this.handleClick} title={title}>
        {is_loading ? <MBLoader type="spinner"/> : <p className={style_sheet.submitButtonText}>{text}</p>}
      </div>
    );
  }
}
