import React from 'react'
import * as yup from 'yup'
import { Formik, Field, Form } from 'formik'
import { Loader, Dropdown, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { withDeviceWidth } from '../DeviceWidth'
import 'react-datepicker/dist/react-datepicker.css'
import './EventCreate.css'

const CreateEventSchema = yup.object().shape({
  title: yup.string()
    .required('Campo obrigatório')
    .max(32, 'Tamanho máximo de 32 catacteres'),
  beginsAtDate: yup.string()
    .required('Campo obrigatório'),
  beginsAtTime: yup.string()
    .required('Campo obrigatório'),
  description: yup.string().nullable(),
  minParticipants: yup.number()
    .required('Campo obrigatório')
    .min(2, 'Valor mínimo de 2'),
  maxParticipants: yup.number().nullable()
    .min(2, 'Valor mínimo de 2'),
  location: yup.string().nullable()
    .max(64, 'Tamanho máximo de 64 catacteres'),
  categories: yup.array()
    .required('Campo obrigatório')
    .of(yup.string().max(32, 'Tag Inválida'))
})

const Required = () => (
  <span style={{ color: 'red', fontWeight: 'normal' }}>*</span>
)

const EventCreate = ({ isDesktop, events, notify, categories: { state: { categories } }, history }) => {
  if (categories === null || categories.data === null) {
    return (
      <Loader className='App-fixed-center' active>
        Carregando formulário...
      </Loader>
    )
  } else {
    return (
      <div className='EventCreate'>
        <h2>Criar um Evento</h2>
        <Formik
          initialValues={{
            title: '',
            beginsAtDate: moment().format(),
            beginsAtTime: moment().format(),
            description: '',
            minParticipants: 2,
            maxParticipants: '',
            location: '',
            categories: []
          }}
          validationSchema={CreateEventSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const event = { ...values }
            if (event.maxParticipants === '') {
              event.maxParticipants = null
            }

            event.beginsAt = (
              moment(event.beginsAtDate).format('YYYY-MM-DD') + ' ' +
              moment(event.beginsAtTime).format('HH:mm') + ':00'
            )
            delete event.beginsAtDate
            delete event.beginsAtTime

            try {
              await events.createEvent(event)
              history.push('/my-events')
            } catch (error) {
              notify.danger({ message: error.message })
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
                  <label htmlFor='title'>Título<Required /></label>
                  <Field name='title' placeholder='Título' type='text' />
                  {errors.title && touched.title && (
                    <div className='App-form-error'>{errors.title}</div>
                  )}
                </div>

                <div className='App-form-field'>
                  <label htmlFor='beginsAtDate'>Data<Required /></label>
                  <DatePicker
                      selected={moment(values.beginsAtDate)}
                      onChange={date => setFieldValue('beginsAtDate', date.format())}
                      dateFormat='DD/MM/YYYY'
                  />
                  {errors.beginsAtDate && touched.beginsAtDate && (
                    <div className='App-form-error'>{errors.beginsAtDate}</div>
                  )}
                </div>

                <div className='App-form-field'>
                  <label htmlFor='beginsAtTime'>Data<Required /></label>
                  <DatePicker
                    selected={moment(values.beginsAtTime)}
                    onChange={time => setFieldValue('beginsAtTime', time.format())}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat='LT'
                    timeCaption='Hora'
                  />
                  {errors.beginsAtTime && touched.beginsAtTime && (
                    <div className='App-form-error'>{errors.beginsAtTime}</div>
                  )}
                </div>

                <div className='App-form-field'>
                  <label htmlFor='description'>Descrição</label>
                  <textarea
                    name='description'
                    placeholder='Fale um pouco sobre o evento...'
                    rows={rows}
                    onBlur={handleBlur}
                    onChange={event => setFieldValue('description', event.target.value)}
                  />
                  {errors.description && touched.description && (
                    <div className='App-form-error'>{errors.description}</div>
                  )}
                </div>

                <div className='App-form-field'>
                  <label htmlFor='minParticipants'>Número Mínimo de Participantes<Required /></label>
                  <Field name='minParticipants' placeholder='Número Mínimo de Participantes' type='number' />
                  {errors.minParticipants && touched.minParticipants && (
                    <div className='App-form-error'>{errors.minParticipants}</div>
                  )}
                </div>

                <div className='App-form-field'>
                  <label htmlFor='maxParticipants'>Número Máximo de Participantes</label>
                  <Field name='maxParticipants' placeholder='Número Máximo de Participantes' type='number' />
                  {errors.maxParticipants && touched.maxParticipants && (
                    <div className='App-form-error'>{errors.maxParticipants}</div>
                  )}
                </div>

                <div className='App-form-field'>
                  <label htmlFor='location'>Local</label>
                  <Field name='location' placeholder='Local' type='text' />
                  {errors.location && touched.location && (
                    <div className='App-form-error'>{errors.location}</div>
                  )}
                </div>

                <div className='App-form-field'>
                  <label htmlFor='categories'>Tags<Required /></label>
                  <Dropdown
                    fluid multiple selection
                    placeholder='Tags'
                    options={(
                      categories && categories.data && categories.data.map(
                        c => ({ key: c, text: c, value: c })
                      )
                    )}
                    onChange={(e, { value }) => setFieldValue('categories', value)}
                  />
                  {errors.categories && touched.categories && (
                    <div className='App-form-error'>{errors.categories}</div>
                  )}
                </div>

                <div className='App-form-field'>
                  <Button type='submit' primary fluid size={`${isDesktop ? 'small' : 'big'}`}>
                    Criar Evento
                  </Button>
                </div>
              </Form>
            )
          }}
        />
      </div>
    )
  }
}

export default withRouter(withDeviceWidth(EventCreate))
