const name = /^[^-\s][a-zA-Z_\s-]+$/;
const phone = /^[3]\d{9}$/ || /^[0][3]\d{9}$/;

export const regularExpression = {
  name,
  phone,
};
