import { FormikProps, useFormik } from 'formik'
import { useState } from 'react'
import { FieldKey, VALIDATE_FIELD_KEY_MAP } from '../constants'

const INITIAL_VALUE = {
  [FieldKey.EMAIL]: '',
  [FieldKey.PASSWORD]: '',
  [FieldKey.NAME]: ''
}

type Params = {
  initialValues?: {
    email: string
    password: string
    name: string
  }
}

type Values = Record<FieldKey, string>

type Errors = Record<FieldKey, string | undefined>

type ReturnType = FormikProps<Values> & { isSubmitting: boolean }

export const useForm = ({
  initialValues = INITIAL_VALUE
}: Params): ReturnType => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validateOnChange, setValidateOnChange] = useState(false)

  const onSubmit = () => {
    setIsSubmitting(true)
    try {
    } catch (error) {}
  }

  const validate = (values: Values): Errors | undefined => {
    const errors = (Object.entries(values) as Array<[FieldKey, string]>).reduce(
      (accum, [fieldKey, fieldValue]) => {
        const fieldValidator = VALIDATE_FIELD_KEY_MAP[fieldKey]
        const fieldError = fieldValidator?.(fieldValue)

        if (fieldError) {
          accum[fieldKey] = fieldError
        }

        return accum
      },
      {} as Errors
    )

    return Object.keys(errors).length === 0 ? undefined : errors
  }

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange,
    validate,
    onSubmit
  })

  const { submitCount } = formik
  const [prevSubmitCount, setPrevSubmitCount] = useState(submitCount)

  if (submitCount !== prevSubmitCount) {
    if (submitCount > 0) {
      setValidateOnChange(true)
    }
    setPrevSubmitCount(submitCount)
  }

  return {
    ...formik,
    isSubmitting
  }
}
