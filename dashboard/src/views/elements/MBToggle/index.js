import React from 'react';
import style_sheet from './MBToggle.module.css';

const MBToggle = ({active, onClick}) => (

  <div className={style_sheet.toggleContainer}>
    <div className={active ? style_sheet.active : style_sheet.inactive} onClick={onClick}/>
  </div>
);

export default MBToggle;
