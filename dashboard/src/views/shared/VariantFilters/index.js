//@flow

import React, {PureComponent} from 'react';
import I18n from '../../../localization';
import MBButton from '../../elements/MBButton';
import style_sheet from './VariantFilters.module.css';

const STOCK_FILTER_OPTIONS = ['in_stock', 'out_of_stock'];

type VariantFiltersProps = { initial_filters: Object, applyFilters: (Object) => void };
type VariantFiltersState = {
  visible: boolean,
  focused_field: string,
  filters: {
    in_stock: boolean
  }
};

class VariantFilters extends PureComponent {
  props: VariantFiltersProps
  state: VariantFiltersState

  constructor(props) {
    super(props);
    this.state = {
      filters: {
        in_stock: null
      }
    };
  }

  resolveButtonState = (attribute, current_state) => {
    if (attribute === 'in_stock' && current_state === true) {
      return true;
    } else if (attribute === 'out_of_stock' && current_state === false) {
      return true;
    } else {
      return false;
    }
  };

  resolveInStockState = (attribute, current_state) => {
    if (attribute !== 'in_stock' && attribute !== 'out_of_stock') return null;
    if (attribute === 'in_stock' && current_state !== true) {
      return true;
    } else if (attribute === 'out_of_stock' && current_state !== false) {
      return false;
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className={style_sheet.row}>
        {STOCK_FILTER_OPTIONS.map(attribute => {
          const {filters} = this.state;
          return (
            <MBButton
              key={`${attribute}radio`}
              onClick={() => {
                const new_filters = {in_stock: this.resolveInStockState(attribute, filters.in_stock)};
                this.props.applyFilters(new_filters);
                this.setState({filters: new_filters});
              }}
              size="large"
              button_type={this.resolveButtonState(attribute, filters.in_stock) ? 'primary' : 'secondary'}>
              <p className={style_sheet.filterButtonContents}>{I18n.t(`ui.button.${attribute}`)}</p>
            </MBButton>
          );
        })}
      </div>
    );
  }
}

export default VariantFilters;
