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

export const Login: React.FC<Props> = ({onSubmit}) => {
   return (
      <Formik 
         initialValues={{email: '', password: ''}} 
         onSubmit={(values) => {
            onSubmit(values);
         }}
      >
         {({values}) => (
            <Form>
               <div>
                  <Field placeholder='Email' name='email' component={MyField} />  
               </div>
               <div>
                  <Field placeholder='Password' name='password' component={MyField} />   
               </div>
               <Button variant="contained" type='submit'>Submit</Button>
               <pre>
                  {JSON.stringify(values, null, 2)}
               </pre>
            </Form>
         )}
      </Formik>
   );
};