import { BASE_API_PATH } from 'utils/constants';
import request from 'utils/request';
import qs from 'qs';
/**
 * 获取优惠券列表
 * @param {json Object} data 
 * @returns {promise} function
 */
export function fetchCoupon(data) {
  const querystring = qs.stringify(data);
  return request(`${BASE_API_PATH}/coupon/my?${querystring}`);
}

/**
 * 添加优惠券
 * @param {data} data 
 */
export function addCoupon(data) {
  return request(`${BASE_API_PATH}/coupon/code/add`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * 获取历史优惠券
 * @param {json Object} data 
 */
export function fetchHistoryCoupon(data) {
  const querystring = qs.stringify(data);
  return request(`${BASE_API_PATH}/coupon/my/history?${querystring}`);
}
