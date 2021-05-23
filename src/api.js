import axios from "axios";

const isFunction = (func) =>
  func &&
  (Object.prototype.toString.call(func) === "[object Function]" ||
    "function" === typeof func ||
    func instanceof Function);

export default async function request(
  method,
  url,
  successHandler,
  errorHandlers = {},
  data
) {
  try {
    const res = await axios({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      method: method.toLowerCase(),
      url: url,
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });

    if (isFunction(successHandler)) {
      successHandler(res);
    }
  } catch (e) {
    // Handling work to do when encountering all kinds of errors, e.g turn off the loading icon.
    if (isFunction(errorHandlers["onError"])) {
      errorHandlers["onError"](e);
    }

    if (e.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx.
      switch (e.response.status) {
        // case 401:
        //   if (isFunction(errorHandlers[401])) {
        //     errorHandlers[401](e);
        //   } else {
        //     history.push({ pathname: "/" });
        //   }
        //   break;
        // case 403:
        //   if (isFunction(errorHandlers[403])) {
        //     errorHandlers[403](e);
        //   } else {
        //     // infoNoti("Bạn cần được cấp quyền để thực hiện hành động này.");
        //   }
        //   break;
        default:
          const status = e.response.status;
          if (isFunction(errorHandlers[status])) {
            errorHandlers[status](e);
          } else if (isFunction(errorHandlers["rest"])) {
            errorHandlers["rest"](e);
          } else {
            // errorNoti("Rất tiếc! Đã có lỗi xảy ra.");
          }
      }
    } else if (e.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(
        "The request was made but no response was received",
        e.request
      );

      if (isFunction(errorHandlers["noResponse"])) {
        errorHandlers["noResponse"](e);
      }

      // errorNoti("Không thể kết nối tới máy chủ.");
    } else {
      // Something happened in setting up the request that triggered an Error.
      console.log(
        "Something happened in setting up the request that triggered an Error",
        e.message
      );
    }
    console.log("Request config", e.config);
  }
}

export async function paralelRequest(requests, successHandler) {
  try {
    Promise.all(requests).then((responses) => {
      if (isFunction(successHandler)) {
        successHandler(responses);
      }
    });
  } catch (e) {
    if (e.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx.
      console.log(
        "The request was made and the server responded with a status code that falls out of the range of 2xx",
        e
      );
    } else if (e.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(
        "The request was made but no response was received",
        e.request
      );
    } else {
      // Something happened in setting up the request that triggered an Error.
      console.log(
        "Something happened in setting up the request that triggered an Error",
        e.message
      );
    }

    console.log("Request config", e.config);
  }
}
