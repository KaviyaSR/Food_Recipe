import moment from 'moment';
import parsePhoneNumber from 'libphonenumber-js';

export const formatPhoneNumber = (mobileNo = '') => {
  if (mobileNo) {
    const isPlusIncludes = mobileNo?.includes('+');
    const parsedNum = parsePhoneNumber(
      `${!isPlusIncludes ? '+' : ''}${mobileNo}`
    );
    return parsedNum ? parsedNum.formatInternational() : '-';
  }
  return '-';
};

export const toHHMMSS = (secs) => {
  return secs
    ? moment().startOf('day').seconds(secs).format('HH:mm:ss')
    : '00:00:00';
};

export const numberFormatter = (num, digits) => {
  var si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};
