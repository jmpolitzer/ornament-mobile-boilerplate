import * as Constants from './constants';

export function createMailApiToken(user) {
  console.log('we getting here?', user);

  return {
    type: 'CREATE_MAIL_API_TOKEN'
  }
}
