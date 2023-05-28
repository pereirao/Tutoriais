// @flow

import React from 'react';
import I18n from '../../../localization';
import style_sheet from './SearchInput.module.css';
import MBIcon from '../../elements/MBIcon';

type SearchInputProps = { query: string, onChange: (string) => void, submit: (string) => void };
const SearchInput = ({query, onChange, submit, ...input_props}: SearchInputProps) => {
  const handleKeyPress = target => {
    if (target.charCode === 13) submit(); // if 'enter' key is pressed
  };

  return (
    <div className={style_sheet.searchInputWrapper}>
      <div className={style_sheet.searchIcon}>
        <MBIcon icon="search" size="small"/>
      </div>
      <input
        type="text"
        className={style_sheet.searchInput}
        value={query}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        {...input_props} />
      <div onClick={submit} className={style_sheet.searchButton}>
        {I18n.t('ui.button.search')}
      </div>
    </div>
  );
};


export default SearchInput;
