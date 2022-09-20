import _ from 'lodash';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

export const handleImage = (values, URL) => {
  const arr = _.without(_.split(values, '##'), '');
  let res = [];
  arr.forEach((i) => {
    res.push(!(i.includes('https://') || i.includes('http://')) ? URL + i : i);
  });
  return res;
};
