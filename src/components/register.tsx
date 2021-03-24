import * as React from 'react';
import {Button} from '@material-ui/core';
import {Formik, Form, Field} from 'formik';
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

export const Register: React.FC<Props> = ({onSubmit}) => {
   return (
      <Formik 
         initialValues={{nick: '', email: '', password: '', repeatPassword: ''}} 
         onSubmit={(values) => {
            onSubmit(values);
         }}
      >
         {({values}) => (
            <Form>
               <div>
                  <Field placeholder='Nick' name='nick' component={MyField} />
               </div>
               <div>
                  <Field placeholder='Email' name='email' component={MyField} />  
               </div>
               <div>
                  <Field placeholder='Password' name='password' component={MyField} />   
               </div>
               <div>
                  <Field placeholder='Repeat password' name='repeatPassword' component={MyField} />   
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