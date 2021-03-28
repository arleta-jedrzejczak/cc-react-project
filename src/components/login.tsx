import * as React from 'react';
import {Button} from '@material-ui/core';
import {Formik, Form, Field} from 'formik';
import { MyField } from './MyField';

interface Values {
   email: string;
   password: string;
}

interface Props {
   onSubmit: (values: Values) => void;
}

const validateEmail = (value) => {
   let error;
   if (!value) {
     error = '';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
     error = 'Invalid email address';
   }
   return error;
}

const validatePassword = (value) => {
   let error;
   if (!value) {
     error = 'Required!';
   }
   return error;
}

export const Login: React.FC<Props> = ({onSubmit}) => {
   return (
      <Formik 
         initialValues={{email: '', password: ''}} 
         onSubmit={(values) => {
            onSubmit(values);
         }}
      >
         {({errors, touched, values}) => (
            <div style={{textAlign: 'center'}}>
               <Form>
                  <div>
                     <Field type='email' placeholder='Email' name='email'  component={MyField} validate={validateEmail}/> 
                     {errors.email && touched.email && <div>{errors.email}</div>} 
                  </div>
                  <div>
                     <Field type="password" placeholder='Password' name='password' component={MyField} validate={validatePassword}/>
                     {errors.password && touched.password && <div>{errors.password}</div>} 
                  </div>
                  <Button variant="contained" type='submit'>Submit</Button> 
                  <pre>
                     {JSON.stringify(values, null, 2)}
                  </pre> 
               </Form>
            </div>
         )}
      </Formik>
   );
};