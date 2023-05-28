// @flow

import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import I18n from '../../../localization';
import type {DeliveryMethodType, OrderState} from '../../../business/order';
import {order_actions, order_selectors} from '../../../business/order';
import style_sheet from './OrderStateModal.module.css';
import {MBForm, MBFormSubmitButton} from '../../elements/MBForm';
import {
  DeliveryEstimateField,
  DriverField,
  MissingNameCheckbox,
  NameField,
  ShippingProviderField,
  TrackingNumberField,
  UseDspCheckbox
} from '../form_fields';

const FieldLabel = ({children}) => <p className={style_sheet.fieldLabel}>{children}</p>;
const FormMessage = ({children}) => <p className={style_sheet.formMessage}>{children}</p>;

const form_validator_map = {
  on_demand: {
    confirmed: fields => _.some(fields, 'value'),
    delivered: fields => _.some(fields, 'value')
  },
  pickup: {
    delivered: fields => _.some(fields, 'value')
  }
};

type OrderStateFormProps = {
  order_id: string,
  show_dsp_flipper: boolean,
  delivery_method_type: DeliveryMethodType,
  proposed_state: OrderState,
  is_gift: boolean,
  is_updating: boolean,
  updateOrder: (string, Object) => void,
  hasPendingSubstitutions: boolean
};
export const OrderStateForm = ({
                                 order_id,
                                 show_dsp_flipper,
                                 delivery_method_type,
                                 proposed_state,
                                 is_gift,
                                 is_updating,
                                 updateOrder
                               }: OrderStateFormProps) => {
  let state_scope = proposed_state;
  if (delivery_method_type === 'on_demand' && proposed_state === 'delivered' && is_gift) state_scope = 'gift_delivered';
  const form_validator = _.get(form_validator_map, `${delivery_method_type}.${state_scope}`);
  const updateOrderState = (values) => {
    let params = {state: proposed_state};

    // Omits other values when using DSP switch [TECH-1948]
    if (values.use_delivery_service) {
      params = {...params, use_delivery_service: true};
    } else {
      params = {...params, ...values};
    }
    updateOrder(order_id, params);
  };

  const form_content_map = {
    on_demand: {
      scheduled: [
        show_dsp_flipper ?
          <FormMessage key="message">{I18n.t('ui.modal.on_demand.scheduled.dsp_notice')}</FormMessage> : <div/>,
        <FormMessage key="message">{I18n.t('ui.modal.on_demand.scheduled.message')}</FormMessage>,
        <MBFormSubmitButton is_loading={is_updating} key="submit" text={I18n.t('ui.modal.on_demand.scheduled.button')}/>
      ],
      confirmed: [
        <UseDspCheckbox show={show_dsp_flipper}/>,
        <FieldLabel key="when_label">{I18n.t('ui.modal.on_demand.confirmed.label.when')}</FieldLabel>,
        <DeliveryEstimateField key="delivery_estimate_field" order_id={order_id} pass_form_state/>,
        <MBFormSubmitButton
          is_loading={is_updating}
          key="submit"
          text={I18n.t('ui.modal.on_demand.confirmed.button')}
          title={I18n.t('ui.modal.on_demand.confirmed.title')}/>
      ],
      en_route: [
        <FieldLabel key="driver_label">{I18n.t('ui.modal.on_demand.en_route.label.assign_driver')}</FieldLabel>,
        <DriverField key="driver_field"/>,
        <MBFormSubmitButton is_loading={is_updating} key="submit" text={I18n.t('ui.modal.on_demand.en_route.button')}/>
      ],
      delivered: [
        <FieldLabel key="who_signed_label">{I18n.t('ui.modal.on_demand.delivered.label.who_signed')}</FieldLabel>,
        <NameField name="signed_by_name" key="name_field" is_required={false}/>,
        <MissingNameCheckbox key="checkbox" label={I18n.t('ui.modal.on_demand.delivered.label.no_name')}/>,
        <MBFormSubmitButton is_loading={is_updating} key="submit" text={I18n.t('ui.modal.on_demand.delivered.button')}/>
      ],
      gift_delivered: [
        <FieldLabel key="who_signed_label">{I18n.t('ui.modal.on_demand.delivered.label.who_signed')}</FieldLabel>,
        <NameField name="signed_by_name" key="name_field"/>,
        <FormMessage key="message">{I18n.t('ui.modal.on_demand.delivered.message')}</FormMessage>,
        <MBFormSubmitButton is_loading={is_updating} key="submit" text={I18n.t('ui.modal.on_demand.delivered.button')}/>
      ]
    },
    pickup: {
      scheduled: [<MBFormSubmitButton is_loading={is_updating} key="submit"
                                      text={I18n.t('ui.modal.pickup.scheduled.button')}/>],
      confirmed: [<MBFormSubmitButton is_loading={is_updating} key="submit"
                                      text={I18n.t('ui.modal.pickup.confirmed.button')}/>],
      en_route: [<MBFormSubmitButton is_loading={is_updating} key="submit"
                                     text={I18n.t('ui.modal.pickup.en_route.button')}/>],
      delivered: [
        <FieldLabel key="who_picked_up_label">{I18n.t('ui.modal.pickup.delivered.label.who_picked_up')}</FieldLabel>,
        <NameField name="signed_by_name" key="name_field" is_required={false}/>,
        <MissingNameCheckbox key="checkbox" label={I18n.t('ui.modal.pickup.delivered.label.no_name')}/>,
        <MBFormSubmitButton is_loading={is_updating} key="submit" text={I18n.t('ui.modal.pickup.delivered.button')}/>
      ]
    },
    shipped: {
      scheduled: [<MBFormSubmitButton is_loading={is_updating} key="submit"
                                      text={I18n.t('ui.modal.pickup.scheduled.button')}/>],
      confirmed: [
        <MBFormSubmitButton is_loading={is_updating} key="submit" text={I18n.t('ui.modal.shipped.confirmed.button')}/>
      ],
      delivered: [
        <FieldLabel key="provider_label">{I18n.t('ui.modal.shipped.delivered.label.provider')}</FieldLabel>,
        <ShippingProviderField key="provider_field"/>,
        <FieldLabel
          key="tracking_number_label">{I18n.t('ui.modal.shipped.delivered.label.tracking_number')}</FieldLabel>,
        <TrackingNumberField key="tracking_number_field"/>,
        <MBFormSubmitButton is_loading={is_updating} key="submit" text={I18n.t('ui.modal.shipped.delivered.button')}/>
      ]
    }
  };

  return (
    <MBForm
      onSubmit={updateOrderState}
      validateSubmittable={fields => (form_validator ? form_validator(fields) : true)}
      className={style_sheet.modalFormWrapper}>
      {form_content_map[delivery_method_type][state_scope]}
    </MBForm>
  );
};

const OrderStateFormSTP = (state) => ({
  is_updating: order_selectors.isUpdating(state)
});
const OrderStateFormDTP = {updateOrder: order_actions.updateOrder};
const OrderStateFormContainer = connect(OrderStateFormSTP, OrderStateFormDTP)(OrderStateForm);

export default OrderStateFormContainer;
