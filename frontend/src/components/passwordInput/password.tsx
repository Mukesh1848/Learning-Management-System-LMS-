import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import { memo, useCallback, useState } from 'react'

// types
import type { SxProps, TextFieldProps } from '@mui/material'
import type { ReactElement } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

type Props = TextFieldProps & {
  containerStyles?: SxProps
  helperText?: string
}

const PasswordInput = (props: Props): ReactElement => {
  const { label, helperText, containerStyles, ...inputProps } = props

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prevState => !prevState)
  }, [])

  return (
    <Box sx={containerStyles}>
      <Typography variant='body2'>{label}</Typography>
      <FormControl fullWidth sx={{ margin: '8px 0px 16px 0px' }}>
        <TextField
          {...inputProps}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position='start'
                sx={{ cursor: 'pointer' }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            )
          }}
        />
        <FormHelperText sx={{ ml: 0 }} error>
          {helperText}
        </FormHelperText>
      </FormControl>
    </Box>
  )
}

const MemoisedPasswordInput = memo(PasswordInput)

export { MemoisedPasswordInput as PasswordInput }
