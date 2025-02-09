// Libraries
import { Button, ButtonProps } from '@mui/material'
import { ReactElement } from 'react'

type StyledButtonProps = ButtonProps & {
  label: string
}

export const StyledButton = ({
  label,
  ...props
}: StyledButtonProps): ReactElement => {
  return (
    <Button
      {...props}
      sx={{
        flex: 1,
        marginRight: '8px',
        textTransform: 'capitalize',
        boxShadow: 'none',
        lineHeight: 1.75,
        fontSize: '0.875rem'
      }}
    >
      {label}
    </Button>
  )
}
