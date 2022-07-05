import { isObject } from 'lodash';

/**
 * Get the records to Grid - async action creators
 * @return object
 */
export function getGridRecords(actionDetails) {
  const { url, actionType, queryParams } = actionDetails;

  return {
    types: [
      `${actionType}_PENDING`,
      `${actionType}_FULFILLED`,
      `${actionType}_REJECTED`,
    ],
    method: 'GET',
    url,
    queryParams: { ...queryParams },
    payload: {},
  };
}

/**
 * Delete a record from Grid - async action creators
 * @return object
 */
export function deleteGridRecord(actionDetails) {
  let { url, actionType, deleteParams } = actionDetails;
  let params = {};

  if (deleteParams && isObject(deleteParams)) {
    params = deleteParams;
  }

  return {
    types: [
      `${actionType}_PENDING`,
      `${actionType}_FULFILLED`,
      `${actionType}_REJECTED`,
    ],
    method: 'DELETE',
    url,
    payload: {},
    data: params,
  };
}
