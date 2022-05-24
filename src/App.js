import './App.css';
import { useEffect, useRef } from 'react';
import { Formik, ErrorMessage, Field } from "formik";
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import * as yup from "yup";
import "./App.css"

function App() {
  var myfocus = useRef(null)
  
  const handleSubmit = (values) => {
    console.log(values)
  };


  useEffect(()=>{
    myfocus.current.focus()
  },[])


  return (
    <Formik
      validationSchema={CreatePasswordSchema}
      onSubmit={handleSubmit}
      initialValues={{
        email: '',
        password: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        handleBlur
      }) => (

        <Form noValidate onSubmit={handleSubmit}>
          <div  className="form-input-wrap">
            <Form.Label >Email</Form.Label>
            <input
              type="email"
              name="email"
              ref={myfocus}
              placeholder="Enter Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              ref={myfocus}
              isInvalid={!!errors.email && !!touched.email} />
            {/* <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback> */}
            <ErrorMessage
              component="div"
              name="email"
              className="error"
            />
          </div>
          <div className="form-input-wrap">
            <Form.Label>Password</Form.Label>
            {/* <Form.Control type="password" placeholder="Your Password" className="input-item" /> */}
            <Field
              type="password"
              name="password"
              placeholder="enter password"
              value={values.password}
              className=""
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={!!errors.password && !!touched.password} />
            {/* <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback> */}
            <ErrorMessage
              component="div"
              name="password"
              className="error"
            />
          </div>

          <div className="button-wrap">
            <Button type="submit" className="w-100">Continue</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

const CreatePasswordSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('email required'),
  password:yup.string().required('password required')
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, 'Password must include one upper case, and at least one number.'),
});

export default App;
