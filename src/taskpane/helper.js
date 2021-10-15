const networkCall = (method = "GET", url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.onload = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      }
    }
  };
  xhr.onerror = function () {};
  xhr.send(null);
};

export { networkCall };
