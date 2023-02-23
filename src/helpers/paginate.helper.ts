export const pickRegex = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = { $regex: object[key], $options: 'i' };
    }
    return obj;
  }, {});
};
