import { getFirebaseToken } from '../../redux/auth/actions';
import { handleError } from '../errors';

const url = 'http://localhost:8080';

module.exports = {
  async create(path, body) {
    const headers = await getHeaders();

    return fetch(url + path, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    }).then(res => res.json())
    .catch(err => handleError('CREATE', err));
  },

  async get(path) {
    const headers = await getHeaders();

    return fetch(url + path, {
      method: 'GET',
      headers: headers
    }).then(res => res.json())
    .catch(err => handleError('GET', err));
  },

  async update(path, body) {
    const headers = await getHeaders();

    return fetch(url + path, {
      method: 'PUT',
      headers: headers,
      body: body
    }).then(res => res.json())
    .catch(err => handleError('UPDATE', err));
  },

  async delete(path) {
    const headers = await getHeaders();

    return fetch(url + path, {
      method: 'DELETE',
      headers: headers
    }).then(res => res.json())
    .catch(err => handleError('DELETE', err));
  }
}

async function getHeaders() {
  try {
    const token = await getFirebaseToken();
    const httpHeaders = { 'Content-Type': 'application/json', 'Authorization': token };

    return new Headers(httpHeaders);
  } catch(e) {
    handleError('getHeaders()', e);
  }
}
