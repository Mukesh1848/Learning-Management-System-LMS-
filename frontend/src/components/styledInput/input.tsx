import {
  Box,
  FormControl,
  FormHelperText,
  TextField,
  Typography
} from '@mui/material'
import { memo } from 'react'

// types
import type { SxProps, TextFieldProps } from '@mui/material'
import type { ChangeEvent, ReactElement } from 'react'

type Props = TextFieldProps & {
  containerStyles?: SxProps
  icon?: React.JSX.Element
  formStyles?: SxProps
  helperText?: string
}

const TextInput = (props: Props): ReactElement => {
  const {
    label,
    icon,
    helperText,
    containerStyles,
    formStyles,
    onChange,
    ...inputProps
  } = props

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (!value?.trim()?.length) {
      e.target.value = value?.trim()
    }

    onChange?.(e)
  }

  return (
    <Box sx={containerStyles}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {icon ? icon : <></>}
        {label ? <Typography variant='body2'>{label}</Typography> : null}
      </Box>
      <FormControl
        fullWidth
        sx={formStyles ? formStyles : { margin: '8px 0px 16px 0px' }}
      >
        <TextField {...inputProps} onChange={handleInputChange} />
        <FormHelperText sx={{ ml: 0 }} error>
          {helperText}
        </FormHelperText>
      </FormControl>
    </Box>
  )
}

const MemoizedTextInput = memo(TextInput)

export { MemoizedTextInput as TextInput }
