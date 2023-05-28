// @flow

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import * as Ent from '@minibar/store-business/src/utils/ent';
import type Order from '../../../business/order';
import {order_actions, order_helpers} from '../../../business/order';
import I18n from '../../../localization';
import style_sheet from './UpdateStateButton.module.css';
import {ui_actions} from '../../../business/ui';

const cx = classNames.bind(style_sheet);
const {nextState, deliveryMethodType, isUnconfirmed} = order_helpers;

type UpdateStateButtonProps = { order: Order, updateOrder: (string, Object) => void, openModal: (string) => void, inline: boolean };
export const UpdateStateButton = ({order, updateOrder, openModal, inline = false}: UpdateStateButtonProps) => {
  const renderContents = () => {
    const mark_as = I18n.t('ui.button.update_state.mark_as');
    const next_state = I18n.t(`ui.button.update_state.${deliveryMethodType(order)}.${nextState(order)}`);
    if (inline) {
      return ([
        <p key="mark_as" className={style_sheet.inlineMarkAs}>{mark_as}</p>,
        <p key="main_text" className={style_sheet.inlineNextState}>{next_state}</p>
      ]);
    } else if (isUnconfirmed(order)) {
      return <p className={style_sheet.mainText}>{next_state}</p>;
    } else {
      return <p className={style_sheet.mainText}>{`${mark_as} ${next_state}`}</p>;
    }
  };

  const handleOnCLick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // NOTE: Former code (no modal when DSP)
    if (!order.show_dsp_flipper && order.using_delivery_service) {
      updateOrder(order.id, {state: nextState(order)});
    } else {
      openModal(order.id);
    }
  };

  const class_name = cx({updateStateButton: true, inlineButton: inline});
  return (
    <div
      className={class_name}
      onClick={handleOnCLick}>
      {renderContents()}
    </div>
  );
};

// TODO: consider alternative given that the button and the modal are both connected
const UpdateStateButtonSTP = () => {
  const finder = Ent.find('order');
  return (state, {order_id}) => ({
    order: finder(state, order_id)
  });
};
const UpdateStateButtonDTP = {openModal: ui_actions.openOrderStateModal, updateOrder: order_actions.updateOrder};
const UpdateStateButtonContainer = connect(UpdateStateButtonSTP, UpdateStateButtonDTP)(UpdateStateButton);

export default UpdateStateButtonContainer;
