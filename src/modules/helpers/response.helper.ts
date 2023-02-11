export const responseFormat = (httpStatus, message, data = null) => {
  return {
    code: httpStatus,
    message,
    data,
  };
};
