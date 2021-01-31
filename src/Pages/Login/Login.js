import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useAuth} from "../../context/auth";


function Login(props) {

  const {setAuthTokens} = useAuth();

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
    <div className='container'>
      <div className='row mb-5'>
        <div className='col-lg-12 text-center'>
          <h1 className='mt-5'>Login Form</h1>
        </div>
      </div>
      <div className='row w-50 m-auto'>
        <div className='col-lg-12'>
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
            {({touched, errors, isSubmitting}) => (
              <Form>
                <div className='form-group'>
                  <Field type="login" name="login" placeholder='type your login' className={`form-control ${
                    touched.login && errors.login ? "is-invalid" : ""
                  }`}/>
                  <ErrorMessage name="login" component="div" className='invalid-feedback'/>
                </div>
                <div className='form-group'>
                  <Field type="password" name="password" placeholder='enter password' className={`form-control ${
                    touched.password && errors.password ? "is-invalid" : ""
                  }`}/>
                  <ErrorMessage name="password" component="div" className='invalid-feedback'/>
                </div>
                  <button type="submit" disabled={isSubmitting} className='btn btn-primary btn-block'>
                    Submit
                  </button>


              </Form>
            )}
          </Formik>
        </div>
      </div>

    </div>
  );
}

export default Login;