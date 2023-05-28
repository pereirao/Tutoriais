// @flow

import React from 'react';
import I18n from '../../../localization';
import MBLoader from '../MBLoader';
import MBButton from '../MBButton';
import style_sheet from './MBTable.module.css';

const Footer = ({is_fetching, is_empty, has_more, loadMore, empty_message}) => {
  if (is_empty) {
    return (
      <div className={style_sheet.loaderRow}>
        {is_fetching ? <MBLoader type="spinner" size="large"/> :
          <p className={style_sheet.zeroState}>{empty_message}</p>}
      </div>
    );
  } else if (!has_more) {
    return null;
  } else {
    return (
      <div className={style_sheet.loadMoreRow}>
        {is_fetching ? <MBLoader/> : <LoadMoreButton loadMore={loadMore}/>}
      </div>
    );
  }
};

const LoadMoreButton = ({loadMore}) => (
  <MBButton size="small" button_type="secondary" onClick={loadMore}>
    {I18n.t('ui.table.load_more')}
  </MBButton>
);

export default Footer;
