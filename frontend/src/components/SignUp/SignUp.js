import React from 'react'
import * as yup from 'yup'
import { Formik, Field, Form } from 'formik'
import { Button } from 'semantic-ui-react'
import ImageInput from './ImageInput'
import { withDeviceWidth } from '../DeviceWidth'
import './SignUp.css'

const SignUpSchema = yup.object().shape({
  name: yup.string()
    .required('Campo obrigatório')
    .max(64, 'Tamanho máximo de 64 catacteres'),
  picture: yup.string().nullable(),
  description: yup.string().nullable(),
  email: yup.string()
  .required('Campo obrigatório')
  .email('Endereço de email inválido')
  .max(64, 'Tamanho máximo de 64 catacteres'),
  password: yup.string()
    .required('Campo obrigatório')
    .max(60, 'Tamanho máximo de 60 catacteres')
})

const Required = () => (
  <span style={{ color: 'red', fontWeight: 'normal' }}>*</span>
)

const SignUp = ({ isDesktop, auth, history }) => (
  <div className='SignUp'>
    <h2>Criar uma Conta</h2>
    <Formik
      initialValues={{
        name: '',
        picture: '',
        description: '',
        email: '',
        password: ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={async (values, { setSubmitting }) => {
        if (typeof values.picture === 'undefined' || values.picture === '') {
          values.picture = null
        }

        if (typeof values.description === 'undefined' || values.description === '') {
          values.description = null
        }

        try {
          await auth.signUp(values)
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
      }) => {
        let rows = values.description && values.description.split('\n').length
        if (rows < 3) {
          rows = 3
        }
        return (
          <Form className={`ui form${isSubmitting ? ' loading' : ''}${isDesktop ? ' small' : ' big'}`}>
            <div className='App-form-field'>
              <label htmlFor='name'>Nome<Required /></label>
              <Field name='name' placeholder='Nome' type='text' />
              {errors.name && touched.name && (
                <div className='App-form-error'>{errors.name}</div>
              )}
            </div>

            <div className='App-form-field'>
              <label htmlFor='picture'>Foto</label>
              {values.picture && (
                <img src={values.picture} alt='Foto do Perfil do Usuário' />
              )}
              <ImageInput
                name='picture'
                onBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              {errors.picture && touched.picture && (
                <div className='App-form-error'>{errors.picture}</div>
              )}
            </div>

            <div className='App-form-field'>
              <label htmlFor='description'>Descrição</label>
              <textarea
                name='description'
                placeholder='Fale um pouco sobre você...'
                rows={rows}
                onBlur={handleBlur}
                onChange={event => setFieldValue('description', event.target.value)}
              />
              {errors.description && touched.description && (
                <div className='App-form-error'>{errors.description}</div>
              )}
            </div>

            <div className='App-form-field'>
              <label htmlFor='email'>Email<Required /></label>
              <Field name='email' placeholder='Email' type='email' />
              {errors.email && touched.email && (
                <div className='App-form-error'>{errors.email}</div>
              )}
            </div>

            <div className='App-form-field'>
              <label htmlFor='password'>Senha<Required /></label>
              <Field name='password' placeholder='Senha' type='password' />
              {errors.password && touched.password && (
                <div className='App-form-error'>{errors.password}</div>
              )}
            </div>

            <div className='App-form-field'>
              <Button type='submit' primary fluid size={`${isDesktop ? 'small' : 'big'}`}>
                Criar Conta
              </Button>
            </div>
          </Form>
        )
      }}
    />
  </div>
)

export default withDeviceWidth(SignUp)
