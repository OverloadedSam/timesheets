import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().trim().required().label('E-mail'),
  password: yup.string().required().label('Password'),
});

export default schema;
