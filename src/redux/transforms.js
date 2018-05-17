import { createTransform } from 'redux-persist';

export const mailTransform = createTransform(
  (inboundState, key) => {
    return { ...inboundState };
  },
  (outboundState, key) => {
    return {
      ...outboundState,
      showEditListMode: false
     };
  },
  { whitelist: ['mail'] }
);
