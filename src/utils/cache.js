/**
 * spa页面缓存
 */

let cacheObj = {};

/**
 * normal cache
 */
export const normalCache = {
  set: function (key, val) {
    cacheObj[key] = JSON.stringify(val);
  },
  get: function (key) {
    let value = cacheObj[key];

    if (typeof value !== 'string') {
      return undefined;
    }

    try {
      return JSON.parse(value);
    } catch (e) {
      return value || undefined;
    }
  },
  getAll: function () {
    let obj = {};
    for (let key in cacheObj) {
      obj[key] = this.get(key);
    }

    return obj;
  },
  size: function () {
    return Object.keys(cacheObj).length;
  },

  remove: function (key) {
    delete cacheObj[key];
  },

  removeAll: function () {
    cacheObj = {};
  }
};

/**
 * localstrorage
 */

export const localCache = {
  storage: localStorage,
  set: function (key, val) {
    this.storage.setItem(key, JSON.stringify(val));
  },
  get: function (key) {
    let value = this.storage.getItem(key);

    if (typeof value !== 'string') {
      return undefined;
    }

    try {
      return JSON.parse(value);
    } catch (e) {
      return value || undefined;
    }
  },

  getAll: function () {
    let obj = {};
    let len = this.storage.length;

    for (let i = 0; i < len; i++) {
      let key = this.storage.key(i);
      obj[key] = this.get(key);
    }

    return obj;
  },

  size: function () {
    return this.storage.length;
  },

  remove: function (key) {
    this.storage.removeItem(key);
  },

  removeAll: function () {
    this.storage.clear();
  }
};

/**
 * cookiecache
 */
export const cookieCache = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
        default:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
}



