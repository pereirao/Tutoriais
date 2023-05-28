// @flow

import React from 'react';
import _ from 'lodash';
import style_sheet from './Settings.module.css';

type NewFormErrorProps = { error_messages: Array<string> };
const NewFormError = ({error_messages}: NewFormErrorProps) => {
  if (_.isEmpty(error_messages)) return null;
  return (
    <div className={style_sheet.errorWrapper}>
      {error_messages.map((e, i) => <p key={`form_error${i}`}>{e}</p>)}
    </div>
  );
};

export default NewFormError;
