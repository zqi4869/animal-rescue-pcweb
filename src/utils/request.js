import GlobalStorage from "./store";
import { message } from 'antd';

const baseUrl = 'http://192.168.1.169:8080';

const getImageUri = (imageName) => {
  return baseUrl + '/' + imageName
};

function fetchPost(routeName, dataJson, success) {
  fetch(baseUrl + routeName, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GlobalStorage('token')
    },
    body: JSON.stringify(dataJson)
  })
    .then(response => response.json())
    .then(data => {
      if (data.code === 0) {
        success(data.data);
      } else {
        console.error(data)
        message.error(data.msg);
      }
    })
    .catch(error => {
      message.error(error);
    })
}

function simplePost(routeName, dataJson, success) {
  fetch(baseUrl + routeName, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataJson)
  })
    .then(response => response.json())
    .then(data => {
      if (data.code === 0) {
        success(data.data);
      } else {
        console.error(data)
        message.error(data.msg);
      }
    })
    .catch(error => {
      message.error(error);
    })
}

function fetchPut(routeName, dataJson, success) {
  fetch(baseUrl + routeName, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataJson)
  })
    .then(response => response.json())
    .then(data => {
      if (data.code === 0) {
        success(data.data);
      } else {
        console.error(data)
        message.error(data.msg);
      }
    })
    .catch(error => {
      message.error(error);
    });
}


function fetchGet(routeName, success) {
  fetch(baseUrl + routeName)
    .then(response => response.json())
    .then(data => {
      if (data.code === 0) {
        success(data.data);
      } else {
        message.error(data.msg);
      }
    }).catch(error => {
      message.error(error);
    })
}

export { fetchPost, fetchGet, fetchPut, getImageUri, simplePost }
