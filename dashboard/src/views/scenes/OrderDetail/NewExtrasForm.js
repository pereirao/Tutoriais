// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import I18n from '../../../localization';
import {MBForm, MBFormSubmitButton} from '../../elements/MBForm';
import {NumberField} from '../../shared/form_fields';
import style_sheet from './OrderDetail.module.css';
import {SetExtrasRoutine} from '../../../business/extras/extras.dux';
import {session_selectors} from '../../../business/session';

const {currentSupplier} = session_selectors;

const FieldLabel = ({children}) => <p className={style_sheet.fieldLabel}>{children}</p>;

export class NewExtrasModal extends PureComponent {
  form: ReactClass<*>

  handleSubmit = () => {
    const {shipment_id} = this.props;
    this.props.setExtras({order_id: shipment_id, data: this.state});
  }

  componentWillMount() {
    this.setDefaultState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setDefaultState(nextProps);
  }

  setDefaultState(nextProps) {
    const {shipment} = nextProps;
    if (!shipment.extras) {
      return;
    }
    const state = {};
    for (let i = 0; i < shipment.extras.length; i += 1) {
      const extra = shipment.extras[i];
      state[extra.field_id] = extra.value;
    }
    this.setState(state);
  }

  render() {
    const {supplier} = this.props;
    return (
      <MBForm
        onSubmit={this.handleSubmit.bind(this)}
        ref={el => {
          this.form = el;
        }}
        className={style_sheet.newExtrasForm}>

        {getFields(supplier).map((extra) => {
          if (extra.type === 'number') {
            return [
              <FieldLabel>{extra.label || extra.placeholder}</FieldLabel>,
              <NumberField
                prefix={extra.prefix}
                placeholder={extra.placeholder}
                key={extra.name}
                mask={extra.mask}
                format={extra.format}
                value={this.state[extra.name]}
                onChangeText={() => {
                }}
                onValueChange={(values => {
                  this.setState({
                    [extra.name]: values.value
                  });
                })}/>
            ];
          }
          return (null);
        })}
        <MBFormSubmitButton text={I18n.t('ui.button.submit_extras')}/>
      </MBForm>
    );
  }
}

function hasExtras(supplier) {
  return supplier.partner_config &&
    supplier.partner_config.extrasForm &&
    supplier.partner_config.extrasForm.fields &&
    supplier.partner_config.extrasForm.fields.length > 0;
}

function getFields(supplier) {
  if (hasExtras(supplier)) {
    return supplier.partner_config.extrasForm.fields;
  }
  return [];
}

const NewExtrasFormSTP = state => {
  return ({
    supplier: currentSupplier(state)
  });
};

const NewExtrasFormDTP = {
  setExtras: SetExtrasRoutine.trigger
};

export const NewExtrasForm = connect(NewExtrasFormSTP, NewExtrasFormDTP)(NewExtrasModal);
