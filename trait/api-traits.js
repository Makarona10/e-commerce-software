export const failureObj = function (statusCode, error, message) {
  return {
    statusCode,
    message,
    error,
  };
};

export const dataObj = function (statusCode, data, message) {
  return {
    statusCode,
    message,
    data,
  };
};

export const failureMsg = function (statusCode, message) {
  return {
    statusCode,
    message,
  };
};
