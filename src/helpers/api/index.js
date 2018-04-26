import { getFirebaseToken } from '../../redux/auth/actions';

const url = 'http://localhost:8080';

module.exports = {
  async create(path, body) {
    const headers = await getHeaders();

    return fetch(url + path, {
      method: 'POST',
      headers: headers,
      body: body
    }).then(res => res.json())
    .catch(err => handleError(err));
  },

  async get(path) {
    const headers = await getHeaders();

    return fetch(url + path, {
      method: 'GET',
      headers: headers
    }).then(res => res.json())
    .catch(err => handleError(err));
  },

  async update(path, body) {
    const headers = await getHeaders();

    return fetch(url + path, {
      method: 'PUT',
      headers: headers,
      body: body
    }).then(res => res.json())
    .catch(err => handleError(err));
  },

  async delete(path) {
    const headers = await getHeaders();

    return fetch(url + path, {
      method: 'DELETE',
      headers: headers
    }).then(res => res.json())
    .catch(err => handleError(err));
  }
}

async function getHeaders() {
  const token = await getFirebaseToken();
  const httpHeaders = { 'Content-Type': 'application/json', 'Authorization': token };

  return new Headers(httpHeaders);
}

function handleError(err) {
  console.log('we have an error:', err);
}
