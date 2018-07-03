import React from 'react'
import * as yup from 'yup'
import { Formik, Field, Form } from 'formik'
import { Button } from 'semantic-ui-react'
import { withDeviceWidth } from '../DeviceWidth'
import './SignIn.css'

const SignInSchema = yup.object().shape({
  email: yup.string()
  .required('Campo obrigatório')
  .email('Endereço de email inválido')
  .max(64, 'Tamanho máximo de 64 catacteres'),
  password: yup.string()
    .required('Campo obrigatório')
    .max(60, 'Tamanho máximo de 60 catacteres')
})

const SignIn = ({ isDesktop, auth, viewer }) => (
  <div className='SignIn'>
    <h2>Acessar Conta</h2>
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={SignInSchema}
      onSubmit={async ({ email, password }, { setSubmitting }) => {
        try {
          await auth.signIn(email, password)
          viewer.poll()
        } catch (error) {
          setSubmitting(false)
        }
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <Form className={`ui form${isSubmitting ? ' loading' : ''}${isDesktop ? ' small' : ' big'}`}>
          <div className='App-form-field'>
            <label htmlFor='email'>Email</label>
            <Field name='email' placeholder='Email' type='email' />
            {errors.email && touched.email && (
              <div className='App-form-error'>{errors.email}</div>
            )}
          </div>

          <div className='App-form-field'>
            <label htmlFor='password'>Senha</label>
            <Field name='password' placeholder='Senha' type='password' />
            {errors.password && touched.password && (
              <div className='App-form-error'>{errors.password}</div>
            )}
          </div>

          <div className='App-form-field'>
            <Button
              type='submit' primary fluid
              size={`${isDesktop ? 'small' : 'big'}`}
            >
              Acessar
            </Button>
          </div>
        </Form>
      )}
    />
  </div>
)

export default withDeviceWidth(SignIn)
