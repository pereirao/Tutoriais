// @flow

import React from 'react';
import {isIOS} from 'react-device-detect';
import style_sheet from './OrderDetail.module.css';

const mobileLocationLink = (locationLink, text) => {
  return <a href={locationLink}>{text}</a>;
};

type LocationProps = { latitude: float, longitude: float };
const MapLinks = ({coords}: LocationProps) => {
  // Native maps app
  const mapTag = isIOS ? 'maps://?q=' : 'geo:';
  const mapLink = `${mapTag}${coords.latitude},${coords.longitude}`;
  const mapLinkContent = coords ? mobileLocationLink(mapLink, 'Open Map') : null;
  // Google Maps
  const gmapsLink = `https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`;
  const gmapsLinkContent = coords ? mobileLocationLink(gmapsLink, 'Google Maps') : null;
  // Waze
  const wazeLink = `https://waze.com/ul?ll=${coords.latitude},${coords.longitude}&navigate=yes&z=10`;
  const wazeLinkContent = coords ? mobileLocationLink(wazeLink, 'Waze') : null;
  return <div className={style_sheet.mobileOnly}>{mapLinkContent} | {gmapsLinkContent} | {wazeLinkContent}</div>;
};

const OrderDetailInfoMapLinks = ({coords}: LocationProps) => {
  return <MapLinks coords={coords}/>;
};
export default OrderDetailInfoMapLinks;
