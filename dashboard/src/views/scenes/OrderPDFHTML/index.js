// @flow

import React, {Component} from 'react';
import {fetchPDFHTML} from "../../../business/networking/api";
import './index.css';
import MBButton from "../../elements/MBButton";
import MBIcon from "../../elements/MBIcon";
import I18n from "../../../localization";
import style_sheet from "../OrderDetail/OrderDetail.module.css";
import MBLoader from "../../elements/MBLoader";

export class OrderPDFHTML extends Component {

  constructor() {
    super();

    this.state = {
      pdf_html: ''
    }
  }

  componentWillMount() {
    this.getPDFHTML().then(result => this.setState({
      pdf_html: result
    }));
  }

  getPDFHTML() {
    return fetchPDFHTML(this.props.match.params.number);
  }

  render() {
    const pdf_html = this.state.pdf_html.pdf_html;
    if (!pdf_html) return <div className={style_sheet.loaderWrapper}><MBLoader size="large" type="spinner"/></div>;
    return (
      <div>
        <MBButton
          button_type="tertiary"
          size="large"
          disabled={!pdf_html}
          onClick={() => {window.print();}}>
            <MBIcon icon="print" color='mb_black'/>
            {I18n.t('ui.button.print')}
        </MBButton>
        <div className="pdf_print" dangerouslySetInnerHTML={{__html: pdf_html}}/>
      </div>
    );
  }
}

export default OrderPDFHTML;
