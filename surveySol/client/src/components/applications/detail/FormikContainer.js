import React from 'react'
import { Formik, Form } from 'formik'
import CheckboxGroup from './CheckboxGroup'

function FormikControl (props) {
  const { control, ...rest } = props
  switch (control) {
 
    case 'checkbox':
      return <CheckboxGroup {...rest} />
    default:
      return null
  }
}
function FormikContainer () {

  const checkboxOptions = [
    { key: 'Option 1', value: 'cOption1' },
    { key: 'Option 2', value: 'cOption2' },
    { key: 'Option 3', value: 'cOption3' }
  ]
  const initialValues = {
    selectOption: '',
    radioOption: '',
    checkboxOption: [],
    birthDate: null
  }
 
  const onSubmit = values => {
    console.log('Form data', values)
    console.log('Saved data', JSON.parse(JSON.stringify(values)))
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
    
        <Form>
       
          <FormikControl
            control='checkbox'
            label='Checkbox topics'
            name='checkboxOption'
            options={checkboxOptions}
          />
       
          <button type='submit'>Submit</button>
        </Form>
    
    </Formik>
  )
}

export default FormikContainer;
