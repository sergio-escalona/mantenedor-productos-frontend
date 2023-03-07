const newPasswordValidator = password => {
  let result = false;
  if (password === '') {
    return result;
  }
  const mediumPassword = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$&+,:;=?@#|<>.^*()%!-]).{8,}$'
  );
  if (mediumPassword.test(password)) {
    result = true;
  }
  return result;
};

export default newPasswordValidator;
