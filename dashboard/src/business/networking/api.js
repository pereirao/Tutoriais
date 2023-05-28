// @flow

import { normalize } from 'normalizr';
import { makeMBRequest, buildMBApiUrl } from './mb_api_helpers';
// import { buildExternalUrl } from './helpers';

import {
  adjustment_schema,
  comment_schema,
  order_schema,
  employee_schema,
  notification_method_schema,
  report_schema,
  variant_schema,
  product_schema
} from './schemas';

/*
This module provides promise based consumers of the minibar shopping API, and therefore,
any requests we make to it should be defined in and referenced from this file. It is responsible for
holding any knowledge specific to the configuration or setup of the API, for making requests, and for formatting
the responses in a way that is consumable by the rest of the application.

Each function represents a request to a specific endpoint on our API, and should have the following signature:

  (params: Object, ...other_args) => Promise<FormattedResponse>

Note that any params intended to go into the URL should be included in the params arg - other_args
should only be used for pre- or post-processing logic, which should be kept to a minimum.
Also note that the arguments (especially the params object) are typed with flow. This
1) lets us see what arguments the endpoints take without having to leave this codebase and
2) should raise errors if we're missing something required.

Finally, we normalize all of them (sometimes with an empty schema) to support a more consistent return type.
*/

/* --- order --- */

const handleOrdersResponse = (response) => {
  const total_pages = parseInt(response.headers.get('X-Total-Pages'));
  const total_count = parseInt(response.headers.get('X-Total'));
  return response.json().then(json => ({orders: json, total_pages, total_count}));
};

const fetch_orders_path = 'orders';
export const fetchAllOrders = options => {
  const url = buildMBApiUrl(fetch_orders_path, options);

  const request_prom = makeMBRequest(url, null, handleOrdersResponse)
    .then(response => normalize(response, {orders: [order_schema]}));

  return request_prom;
};

const fetch_active_orders_path = 'orders/today';
export const fetchActiveOrders = options => {
  const url = buildMBApiUrl(fetch_active_orders_path, options);
  const request_prom = makeMBRequest(url, null, handleOrdersResponse)
    .then(response => normalize(response, {orders: [order_schema]}));

  return request_prom;
};

const fetch_completed_orders_path = 'orders/completed';
export const fetchCompletedOrders = options => {
  const url = buildMBApiUrl(fetch_completed_orders_path, options);
  const request_prom = makeMBRequest(url, null, handleOrdersResponse)
    .then(response => normalize(response, {orders: [order_schema]}));

  return request_prom;
};

const fetch_future_orders_path = 'orders/scheduled';
export const fetchFutureOrders = options => {
  const url = buildMBApiUrl(fetch_future_orders_path, options);
  const request_prom = makeMBRequest(url, null, handleOrdersResponse)
    .then(response => normalize(response, {orders: [order_schema]}));

  return request_prom;
};

const order_path = 'order';
export const fetchOrder = (order_id) => {
  const url = buildMBApiUrl(`${order_path}/${order_id}`);
  const request_prom = makeMBRequest(url)
    .then(response => normalize(response, order_schema));


  return request_prom;
};

export const updateOrder = (order_id, params) => {
  const url = buildMBApiUrl(`${order_path}/${order_id}`, params);
  const request_prom = makeMBRequest(url, {method: 'PUT'})
    .then(response => normalize(response, order_schema));

  return request_prom;
};

const fetch_adjustment_path = 'adjustments';
export const fetchAdjustments = (order_id) => {
  const url = buildMBApiUrl(`${order_path}/${order_id}/${fetch_adjustment_path}`);
  // TODO: normalize bare response after adjustments endpoint is updated
  const request_prom = makeMBRequest(url)
    .then(response => normalize(response.adjustments, [adjustment_schema]));

  return request_prom;
};

const fetch_comments_path = 'comments';
export const fetchComments = (order_id) => {
  const url = buildMBApiUrl(`${order_path}/${order_id}/${fetch_comments_path}`);
  // TODO: normalize bare response after comments endpoint is updated
  const request_prom = makeMBRequest(url)
    .then(response => normalize(response, [comment_schema]));

  return request_prom;
};

const fetch_pdf_html_path = 'pdf_html';
export const fetchPDFHTML = (order_id) => {
  const url = buildMBApiUrl(`${order_path}/${order_id}/${fetch_pdf_html_path}`);
  // TODO: normalize bare response after PDF HTML endpoint is updated
  const request_prom = makeMBRequest(url)
      .then(response => ({pdf_html: response}));

  return request_prom;
};

const add_comment_path = 'comments';
export const addComment = (order_id, body) => {
  const url = buildMBApiUrl(`${order_path}/${order_id}/${add_comment_path}`, { body });
  // TODO: normalize bare response after commentss endpoint is updated
  const request_prom = makeMBRequest(url, {method: 'POST'})
    .then(response => normalize(response, comment_schema));


  return request_prom;
};

const add_extras_path = 'extras';
export const addExtras = (order_id, body) => {
  const url = buildMBApiUrl(`${order_path}/${order_id}/${add_extras_path}`);
  // TODO: normalize bare response after commentss endpoint is updated
  const request_prom = makeMBRequest(url, {method: 'PUT', body: JSON.stringify({body})})
    .then(response => normalize(response, comment_schema));


  return request_prom;
};

/* --- inventory --- */

const handleVariantsResponse = (response) => {
  const total_pages = parseInt(response.headers.get('X-Total-Pages'));
  const total_count = parseInt(response.headers.get('X-Total'));
  return response.json().then(json => ({variants: json, total_pages, total_count}));
};

const fetch_variants_path = 'products';
export const fetchVariants = (params) => {
  const url = buildMBApiUrl(fetch_variants_path, params);
  const request_prom = makeMBRequest(url, null, handleVariantsResponse)
    .then(response => normalize(response, {variants: [variant_schema]}));
  return request_prom;
};

const update_variant_path = 'product/:variant_id';
export const updateVariant = (params) => {
  const url = buildMBApiUrl(update_variant_path, params);
  const request_prom = makeMBRequest(url, { method: 'PUT' })
    .then(response => normalize(response, variant_schema));


  return request_prom;
};

/* --- session --- */

const fetch_me_path = 'me';
export const fetchMe = () => {
  const url = buildMBApiUrl(fetch_me_path);
  const request_prom = makeMBRequest(url);
  // don't normalize me singleton
  return request_prom;
};

const send_for_help_path = 'supplier/messages';
export const sendForHelp = ({type, body}) => {
  const url = buildMBApiUrl(send_for_help_path, {type: type});
  const request_prom = makeMBRequest(url, { method: 'POST', body: JSON.stringify({body}) });

  return request_prom;
};

const ping_path = 'supplier/actions/ping';
export const ping = () => {
  const url = buildMBApiUrl(ping_path);
  const request_prom = makeMBRequest(url);

  return request_prom;
};

const takeBreak_path = 'supplier/actions/break';
export const takeBreak = (period) => {
  const url = buildMBApiUrl(takeBreak_path);
  const request_prom = makeMBRequest(url, { method: 'POST', body: JSON.stringify(period) });

  return request_prom;
};

const resumeWork_path = 'supplier/actions/resume';
export const resumeWork = () => {
  const url = buildMBApiUrl(resumeWork_path);
  const request_prom = makeMBRequest(url, { method: 'POST' });

  return request_prom;
};

const changeDeliveryExpectation_path = 'supplier/actions/late';
export const changeDeliveryExpectation = (data) => {
  const url = buildMBApiUrl(changeDeliveryExpectation_path);
  const request_prom = makeMBRequest(url, { method: 'POST', body: JSON.stringify(data) });

  return request_prom;
};

/* --- settings --- */

// EMPLOYEE SETTINGS
const create_employee_path = 'supplier/employee';
export const createEmployee = (params) => {
  const url = buildMBApiUrl(create_employee_path, params);
  const request_prom = makeMBRequest(url, { method: 'POST' })
    .then(response => normalize(response, employee_schema));


  return request_prom;
};

const destroy_employee_path = 'supplier/employee/:employee_id';
export const destroyEmployee = (params) => {
  const url = buildMBApiUrl(destroy_employee_path, params);
  const request_prom = makeMBRequest(url, { method: 'DELETE' })
    .then(response => normalize(response, [employee_schema]));


  return request_prom;
};

const fetch_employees_path = 'supplier/employees';
export const fetchEmployees = () => {
  const url = buildMBApiUrl(fetch_employees_path);
  const request_prom = makeMBRequest(url)
    .then(response => normalize(response, [employee_schema]));


  return request_prom;
};

const update_employee_path = 'supplier/employee/:id';
export const updateEmployee = (params) => {
  const url = buildMBApiUrl(update_employee_path, params);
  const request_prom = makeMBRequest(url, { method: 'PUT' })
    .then(response => normalize(response, employee_schema));


  return request_prom;
};

// NOTIFICATION METHOD SETTINGS
const create_notification_method_path = 'supplier/notification_method';
export const createNotificationMethod = (params) => {
  const url = buildMBApiUrl(create_notification_method_path, params);
  const request_prom = makeMBRequest(url, { method: 'POST' })
    .then(response => normalize(response, notification_method_schema));


  return request_prom;
};

const destroy_notification_method_path = 'supplier/notification_method/:notification_method_id';
export const destroyNotificationMethod = (params) => {
  const url = buildMBApiUrl(destroy_notification_method_path, params);
  const request_prom = makeMBRequest(url, { method: 'DELETE' })
    .then(response => normalize(response, notification_method_schema));


  return request_prom;
};

const fetch_notification_methods_path = 'supplier/notification_methods';
export const fetchNotificationMethods = () => {
  const url = buildMBApiUrl(fetch_notification_methods_path);
  const request_prom = makeMBRequest(url)
    .then(response => normalize(response, [notification_method_schema]));


  return request_prom;
};

const update_notification_method_path = 'supplier/notification_method/:id';
export const updateNotificationMethod = (params) => {
  const url = buildMBApiUrl(update_notification_method_path, params);
  const request_prom = makeMBRequest(url, { method: 'PUT' })
    .then(response => normalize(response, notification_method_schema));


  return request_prom;
};

/* --- reports --- */

const create_report_path = 'reports';
export const createReport = (params) => {
  const url = buildMBApiUrl(create_report_path, params);
  const request_prom = makeMBRequest(url, { method: 'POST' })
    .then(response => normalize(response, report_schema));


  return request_prom;
};

const fetch_reports_path = 'reports';
export const fetchReports = () => {
  const url = buildMBApiUrl(fetch_reports_path);
  const request_prom = makeMBRequest(url)
    .then(response => normalize(response, [report_schema]));

  return request_prom;
};

const fetch_settings_path = 'settings';
export const fetchSettings = () => {
  const url = buildMBApiUrl(fetch_settings_path);
  const request_prom = makeMBRequest(url);

  return request_prom;
};

/*** substitutes */

export const fetchSubstitutes = ({ shipmentId, sku, ...params }) => {
  const url = buildMBApiUrl(`${order_path}/${shipmentId}/substitutes/${sku}`, params);
  const request_prom = makeMBRequest(url)
    .then(response => normalize(response, { substitutes: [variant_schema]}));

  return request_prom;
};

export const createSubstitution = ({ shipmentId, orderItemId, sku, quantity, quantity_to_replace, ...params }) => {
  const url = buildMBApiUrl(`${order_path}/${shipmentId}/substitutes`, params);
  const request_prom = makeMBRequest(url, {
    method: 'PUT',
    body: JSON.stringify({
      orderItemId,
      quantity,
      sku,
      quantity_to_replace
    })
  })
    .then(response => normalize(response, order_schema));

  return request_prom;
};

/*** products */

const fetch_products_path = 'products/search';
export const fetchProducts = ({ ...params }) => {
  const url = buildMBApiUrl(fetch_products_path, params);
  const request_prom = makeMBRequest(url)
    .then(response => normalize(response, { products: [product_schema]}));

  return request_prom;
};

const merge_path = 'product/:variant_id/merge';
export const mergeProduct = ({ target, ...params }) => {
  const url = buildMBApiUrl(merge_path, params);
  const request_prom = makeMBRequest(url, {
    method: 'PUT',
    body: JSON.stringify({
      target
    })
  })
    .then(response => normalize(response, order_schema));

  return request_prom;
};
