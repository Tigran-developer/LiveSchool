export const Patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  phone: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/
};
