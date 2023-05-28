// @flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import MBIcon from '../../elements/MBIcon';
import {session_helpers, session_selectors} from '../../../business/session';
import StoreRatingModal from './StoreRatingModal';

import style_sheet from './MainNav.module.css';

const cx = classNames.bind(style_sheet);

const {storeRating} = session_selectors;
const {ratingClass} = session_helpers;

// TODO: add real modal to state boolean
type StoreRatingState = { is_rating_modal_open: boolean };
type StoreRatingProps = { rating: number };

export class StoreRating extends PureComponent {
  props: StoreRatingProps
  state: StoreRatingState

  constructor(props) {
    super(props);
    this.state = {is_rating_modal_open: false};
  }

  toggleStoreRatingModal = () => {
    this.setState({is_rating_modal_open: !this.state.is_rating_modal_open});
  }

  render() {
    const {rating} = this.props;
    const {is_rating_modal_open} = this.state;
    return (
      <div className={style_sheet.storeRatingWrapper}>
        <p className={style_sheet.storeRatingLabel}>Store Rating:</p>
        <span className={cx('storeRating', ratingClass(rating))}>{rating}</span>
        <MBIcon inline mobileHidden onClick={this.toggleStoreRatingModal} icon="info" color="mb_medium_grey"/>
        <StoreRatingModal rating={rating} close={this.toggleStoreRatingModal} hidden={!is_rating_modal_open}/>
      </div>
    );
  }
}

const StoreRatingSTP = state => ({rating: storeRating(state)});
const StoreRatingContainer = connect(StoreRatingSTP)(StoreRating);

export default StoreRatingContainer;
