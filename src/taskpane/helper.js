/* global process */
const networkCall = (method = "GET", url, body = null, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  if (body) {
    xhr.setRequestHeader("Authorization", `Bearer ${process.env.TOKEN}`);
    xhr.setRequestHeader("Content-type", "application/json");
  }
  xhr.onload = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      }
    }
  };
  xhr.onerror = function () {};
  xhr.send(body);
};

const getBody = (content) => ({
  temperature: 0.5,
  frequency_penalty: 0.5,
  presence_penalty: 0.5,
  n: 3,
  max_tokens: 100,
  top_p: 1,
  stop: [`"""`],
  prompt: `Write  a formal reply to following email thread.
      """
      ${content}
      """`,
});

export { networkCall, getBody };
