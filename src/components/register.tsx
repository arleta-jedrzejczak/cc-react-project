import * as React from 'react';
import {Button} from '@material-ui/core';
import { Formik, Form, Field} from 'formik';
import { MyField } from './MyField';

interface Values {
   nick: string;
   email: string;
   password: string;
   repeatPassword: string;
}

interface Props {
   onSubmit: (values: Values) => void;
}

const validateNick = (value: string): string => {
  let error: string;
  if (!value) {
   error = 'Required!';
  }
  else if (value === 'admin') {
    error = 'Nice try!';
  }
  return error;
}

const validateEmail = (value: string): string => {
   let error: string;
   if (!value) {
     error = 'Required!';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
     error = 'Invalid email address';
   }
   return error;
}

const validatePassword = (value: string): string => {
   let error: string;
   if (!value) {
     error = 'Required!';
   }
   return error;
}

const validateRepeatPassword = (pass: string, value: string): string => {
   let error: string;
   if (!value) {
      error = 'Required!';
    }
   else if (pass && value) {
     if (pass !== value) {
       error = 'Password not matched';
     }
   }
   return error;
};

export const Register: React.FC<Props> = ({onSubmit}) => {
   return (
      <Formik 
         validateOnChange={true}
         initialValues={{nick: '', email: '', password: '', repeatPassword: ''}} 
         onSubmit={(values) => {
            onSubmit(values);
         }}
      >
         {({errors, touched, values}) => (
            <div style={{textAlign: 'center'}}>
               <Form>
                  <div>
                     <Field placeholder='Nick' name='nick'  component={MyField} validate={validateNick}/>
                     {errors.nick && touched.nick&& <div>{errors.nick}</div>}
                  </div>
                  <div>
                     <Field type='email' placeholder='Email' name='email'  component={MyField} validate={validateEmail}/> 
                     {errors.email && touched.email && <div>{errors.email}</div>} 
                  </div>
                  <div>
                     <Field type='password' placeholder='Password' name='password' component={MyField} validate={validatePassword}/>
                     {errors.password && touched.password && <div>{errors.password}</div>} 
                  </div>
                  <div>
                     <Field type="password" placeholder='Repeat password' name='repeatPassword' component={MyField} validate={value => validateRepeatPassword(values.password, value)} />
                     {errors.repeatPassword && touched.repeatPassword && <div>{errors.repeatPassword}</div>}    
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