import Authorization from './Authorization';
import { isObject, isEmpty } from 'lodash';
import axios from 'axios';
import { API_BASE_URL } from '../configs/AppConfig';

class RequestFactory {
  /**
   * static class property to hold various service avaliable
   *
   * @var array
   */
  static BASE_API = 'rVodApi';

  /**
   * static class property to hold various request body types avaliable
   *
   * @var string
   */
  static REQUEST_BODY_TYPE_FORM_DATA = 'FormData';
  static REQUEST_BODY_TYPE_RAW = 'Raw';
  static REQUEST_BODY_TYPE_JSON = 'Json';
  /**
   * static class property to hold the request body type available
   *
   * @var array
   */

  static requestBodyTypes = ['FormData', 'Raw', 'Json'];
  /**
   * static class property to hold the available for the application
   *
   * @var object
   */

  static services = {
    rVodApi: API_BASE_URL,
  };

  /**
   * static class property to hold the unallowed request params
   *
   * @var array
   */
  static unallowedRequestParamKeys = ['inputErrors'];

  constructor() {
    this.headers = {
      Accept: 'application/json',
      // 'Access-Control-Allow-Origin': '*',
    };
    this.resetFactory();
  }

  /**
   * set this service current request made with
   *
   * @param service
   * @return this
   */
  withService(service) {
    this.service = service;
    return this;
  }

  /**
   * check request is failed due to network connection
   *
   * @param responseMessage
   * @return boolean
   */
  isFetchFailure(responseMessage) {
    return responseMessage === 'Failed to fetch';
  }

  /**
   * set headers for current request
   *
   * @param key
   * @param value
   * @return this
   */
  setHeaders(key, value) {
    this.headers[key] = value;
    return this;
  }

  /**
   * remove headers from existing for current request
   *
   * @param key
   * @return this
   */
  removeHeaders(key) {
    if (this.headers.hasOwnProperty(key)) {
      delete this.headers[key];
    }
    return this;
  }

  /**
   * set this service current request made with
   *
   * @param service
   * @return this
   */
  withRequestBodyType(requestBodyType) {
    this.requestBodyType = requestBodyType;
    return this;
  }

  /**
   * reset this property default for request
   *
   * @return void
   */
  resetFactory(service = 'rVodApi') {
    this.service = service;
    this.requestBodyType = RequestFactory.REQUEST_BODY_TYPE_FORM_DATA;
  }

  /**
   * get available headers
   *
   * @return headers
   */
  // getHeaders() {
  //   let accessToken = Authorization.getAccessToken();
  //   if (accessToken) {
  //     this.headers['Authorization'] = accessToken;
  //   } else {
  //     delete this.headers['Authorization'];
  //   }
  //   return this.headers;
  // }

  /**
   * get base api url
   *
   * @return string
   */
  getBaseApiUrl() {
    return RequestFactory.services[this.service];
  }

  /**
   * convert the object to raw data(string) by
   * Serialize the object with url encode
   * used when form data is not prepared for request body
   *
   * @param object
   * @return object
   */
  convertObjectToRawData(obj) {
    return Object.entries(obj)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
  }

  /**
   * filter the request paran
   * remove the unallowed request params
   *
   * @param object
   * @return object
   */
  filterRequestParam(data) {
    if (typeof data === 'object' && Object.keys(data).length > 0) {
      RequestFactory.unallowedRequestParamKeys.forEach((key) => {
        if (data.hasOwnProperty(key)) {
          delete data[key];
        }
      });
    }

    return data;
  }
  /**
   * get base api url
   *
   * @param object
   * @return object
   */

  getRequestBody(data) {
    var body;
    data = this.filterRequestParam(data);
    const formToJSON = (elements) =>
      [].reduce.call(
        elements,
        (data, element) => {
          data[element.name] = element.value;
          return data;
        },
        {}
      );

    switch (this.requestBodyType) {
      case RequestFactory.REQUEST_BODY_TYPE_RAW:
        body = this.convertObjectToRawData(formToJSON(data));
        break;
      case RequestFactory.REQUEST_BODY_TYPE_JSON:
        body = JSON.stringify(data);
        break;
      case RequestFactory.REQUEST_BODY_TYPE_FORM_DATA:
        body = data;
        break;
      default:
        body = this.convertObjectToRawData(data);
    }
    return body;
  }

  /**
   * call request
   * @param url
   * @param data
   * @param successCallback
   * @param errorCallback
   * @param queryParams
   * @return void
   */
  call(type, url, data, successCallback, errorCallback, queryParams) {
    if (type === 'GET') {
      // let headers = this.getHeaders();
      this.request(
        {
          url: this.getUrl(url, queryParams),
          method: 'GET',
          // headers,
          // mode: 'cors',
        },
        successCallback,
        errorCallback
      );
    } else {
      if (this.requestBodyType !== RequestFactory.REQUEST_BODY_TYPE_FORM_DATA) {
        this.headers['Content-Type'] = 'application/json';
      } else {
        this.removeHeaders('Content-Type');
      }
      this.request(
        {
          url: this.getUrl(url, queryParams),
          method: type,
          headers: this.getHeaders(),
          data: this.getRequestBody(data),
        },
        successCallback,
        errorCallback
      );
    }
  }

  /**
   * get request
   * @param url
   * @param successCallback
   * @param errorCallback
   * @param queryParams
   * @return void
   */

  get(url, successCallback, errorCallback, queryParams) {
    // let headers = this.getHeaders();
    this.request(
      {
        url: this.getUrl(url, queryParams),
        method: 'GET',
        // headers: headers,
        mode: 'cors',
      },
      successCallback,
      errorCallback
    );
  }

  /**
   * post request
   * @param url
   * @param data
   * @param successCallback
   * @param errorCallback
   * @param queryParams
   * @return void
   */
  post(url, data, successCallback, errorCallback, queryParams) {
    this.request(
      {
        url: this.getUrl(url, queryParams),
        method: 'POST',
        headers: this.getHeaders(),
        data: this.getRequestBody(data),
      },
      successCallback,
      errorCallback
    );
  }

  /**
   * put request
   * @param url
   * @param data
   * @param successCallback
   * @param errorCallback
   * @param queryParams
   * @return void
   */
  put(url, data, successCallback, errorCallback, queryParams) {
    this.request(
      {
        url: this.getUrl(url, queryParams),
        method: 'PUT',
        headers: this.getHeaders(),
        data: this.getRequestBody(data),
      },
      successCallback,
      errorCallback
    );
  }

  /**
   * patch request
   * @param url
   * @param data
   * @param successCallback
   * @param errorCallback
   * @param queryParams
   * @return void
   */
  patch(url, data, successCallback, errorCallback, queryParams) {
    this.request(
      {
        url: this.getUrl(url, queryParams),
        method: 'PATCH',
        headers: this.getHeaders(),
        data: this.getRequestBody(data),
      },
      successCallback,
      errorCallback
    );
  }
  /**
   * delete request
   * @param url
   * @param data
   * @param successCallback
   * @param errorCallback
   * @param queryParams
   * @return void
   */
  delete(url, data, successCallback, errorCallback, queryParams) {
    this.request(
      {
        url: this.getUrl(url, queryParams),
        method: 'DELETE',
        headers: this.getHeaders(),
        data: this.getRequestBody(data),
      },
      successCallback,
      errorCallback
    );
  }

  /**
   * request
   *
   * @param url
   * @param config
   * @param successCallback
   * @param errorCallback
   * @return void
   */
  request(config, successCallback, errorCallback) {
    axios(JSON.parse(JSON.stringify(config)))
      .then(this.successCallback(successCallback, errorCallback))
      .catch(this.errorCallback(errorCallback));

    this.resetFactory();
  }

  /**
   * response parser
   *
   * @return string
   */
  responseParser() {
    return (response) => {
      // empty body status codes
      const emptyBodyCodes = [204, 401];
      return emptyBodyCodes.indexOf(response.status) === -1
        ? response
            .json()
            .then((data) => ({ status: response.status, body: data }))
        : { status: response.status, body: response.statusText };
    };
  }

  /**
   * callback the sucess method
   * @param callback
   * @param errorCallback
   * @return string
   */
  successCallback(callback, errorCallback) {
    return (json) => {
      if (
        isObject(json) &&
        json.hasOwnProperty('body') &&
        json.body.hasOwnProperty('error')
      ) {
        errorCallback(json);
      } else if (json.hasOwnProperty('body') && json.body === 'Unauthorized') {
        // Authorization.logout();
        // window.location.href = "/";
      } else if (typeof callback === 'function') {
        callback(json);
      }
    };
  }

  /**
   * callback the error method
   *
   * @param callback
   * @return string
   */
  errorCallback(callback) {
    return (response) => {
      if (
        this.isFetchFailure(response.message) ||
        (response.response && response.response.status === 401)
      ) {
        // Authorization.logout();
        window.location.href = '/';
      }

      if (typeof callback === 'function') {
        callback(response);
      }
    };
  }

  /**
   * build the query
   *
   * @param queryParams
   * @return string
   */
  buildQueryParams(queryObj, nesting = '') {
    const pairs = Object.entries(queryObj).map(([key, val]) => {
      if (typeof val === 'object') {
        return this.buildQueryParams(val, nesting + `[${key}]`);
      } else {
        return [`${key}`, val].map(escape).join('=');
      }
    });
    return pairs.join('&');
  }

  /**
   * get the url
   *
   * @param path
   * @param queryParams
   * @return string
   */
  getUrl(path, queryParams) {
    var url = this.getBaseApiUrl() + '/' + path;
    return !isEmpty(queryParams)
      ? url + '?' + this.buildQueryParams(queryParams)
      : url;
  }
}

export default new RequestFactory();
