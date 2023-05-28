// @flow

import React from 'react';
import InventoryListWrapper from './InventoryListWrapper';
import style_sheet from './Inventory.module.css';

const Inventory = () => {
  const {location} = this.props;
  return (
    <div className={style_sheet.sceneWrapper}>
      <InventoryListWrapper/>
    </div>
  );
};

export default Inventory;
