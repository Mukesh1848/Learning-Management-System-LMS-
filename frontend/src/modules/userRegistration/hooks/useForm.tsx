import { FormikProps, useFormik } from 'formik'
import { useState } from 'react'
import { FieldKey, VALIDATE_FIELD_KEY_MAP } from '../constants'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { AxiosError } from 'axios'
import { defaultSnackBarData, useSnackBar } from '@/src/contexts/snackbar'
import { useRouter } from 'next/router'

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
  const [validateOnChange, setValidateOnChange] = useState(false)
  const { setSnackBarData } = useSnackBar()
  const router = useRouter()

  const isAxiosError = (error: unknown): error is AxiosError => {
    return (error as AxiosError)?.response !== undefined
  }

  const mutation = useMutation({
    mutationFn: values => {
      return axios.post(`http://localhost:8080/api/v1/user/register`, values)
    },
    onSuccess: data => {
      router.push('/auth/login')
      setSnackBarData({
        snackBarProps: {
          verity: 'success',
          vertical: 'top',
          horizontal: 'right'
        },
        message: data?.data.message
      })
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        const errorData = error.response?.data as { message?: string }
        const errorMessage =
          errorData?.message || 'An unexpected error occurred'

        setSnackBarData({
          snackBarProps: defaultSnackBarData.snackBarProps,
          message: errorMessage
        })
      } else {
        setSnackBarData({
          snackBarProps: defaultSnackBarData.snackBarProps,
          message: 'Opps Something went wrong'
        })
      }
    }
  })

  const onSubmit = async (values: any) => {
    try {
      await mutation.mutate(values)
    } catch (error) {
      setSnackBarData({
        snackBarProps: defaultSnackBarData.snackBarProps,
        message: 'Something went wrong'
      })
    }
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
    isSubmitting: mutation.isPending
  }
}
