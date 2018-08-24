import fetch from 'dva/fetch';
import { localCache } from 'utils/cache';
import { HEADER_TOKEN_NAME } from 'utils/constants';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  // 获取 token
  let token;
  const transientToken = localCache.get('userCert');
  if(transientToken && Object.keys(transientToken).length > 0 && transientToken.userCert.jwt.eatojoy.token) {
    token = transientToken.userCert.jwt.eatojoy.token;
  }

  // 配置默认headers
  const headers = Object.assign({
    'Content-Type': 'application/json;charset=UTF-8',
  }, options && options.headers);
  if (options && options.body && (options.body instanceof FormData)) {
    delete headers['Content-Type'];
  }
  if (token) {
    headers[HEADER_TOKEN_NAME] = token;
  }

  // 配置默认设置
  const settings = Object.assign({
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  }, options, { headers });
  // 修复url中多余的斜杠
  const fixUrl = url.replace(/\/\//g, '/').replace(/:\/([^/])/, '://$1');
  // 非GET方式不允许缓存
  if (settings.method.toUpperCase() !== 'GET') {
    settings['Cache-Control'] = 'no-cache';
  }


  const response = await fetch(fixUrl, settings);

  checkStatus(response);

  const data = await response.json();

  const ret = {
    data,
    headers: {},
  };

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }

  return ret;
}
