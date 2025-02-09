// Libraries
import { ReactElement } from 'react'
import { ButtonProps } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

//components
import { StyledButton } from '../styledButton/button'

type LoadingButtonProps = ButtonProps & {
  label: string
  isLoading: boolean
  isDisabled: boolean
}

export const LoadingButton = ({
  label,
  isLoading,
  isDisabled,
  ...buttonProps
}: LoadingButtonProps): ReactElement => {
  return (
    <StyledButton
      disabled={isLoading || isDisabled}
      endIcon={isLoading ? <CircularProgress size={16} thickness={6} /> : null}
      {...buttonProps}
      label={label}
    />
  )
}
