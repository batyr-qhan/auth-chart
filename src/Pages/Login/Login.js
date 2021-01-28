import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useAuth} from "../../context/auth";

function Login(props) {

  const { setAuthTokens } = useAuth();

  const handleSubmit = (values) => {
    return fetch('http://ideadeploy.space/test/login.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    }).then(response => response.json())
      .then(data => {
        setAuthTokens(data)
        props.history.push('/');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <Formik
        initialValues={{login: '', password: ''}}
        validate={values => {
          const errors = {};
          if (!values.login) {
            errors.login = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required'
          }
          if (values.password.length < 5) {
            errors.password = 'The length must be 5 symbols or more'
          }
          if (values.login.length < 3) {
            errors.login = 'The length must be 3 symbols or more'
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({isSubmitting}) => (
          <Form>
            <Field type="login" name="login"/>
            <ErrorMessage name="login" component="div"/>
            <Field type="password" name="password"/>
            <ErrorMessage name="password" component="div"/>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;