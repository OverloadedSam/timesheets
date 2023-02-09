import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2)
    .max(64)
    .trim()
    .matches(/^[a-zA-Z ]{2,32}$/, {
      message:
        'Please provide valid name. Avoid numbers and special characters',
    })
    .required()
    .label('Name'),
  email: yup.string().email().trim().required().label('E-mail'),
  role: yup.mixed().oneOf([0, 1, 2]).required().label('Role'),
  reportsTo: yup.string().label('Reporting Manager ID'),
  password: yup.string().required().label('Password'),
});

export default schema;
