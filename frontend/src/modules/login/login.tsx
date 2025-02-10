import { ReactElement } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { TextInput } from '@/src/components/styledInput/input'
import { PasswordInput } from '@/src/components/passwordInput/password'
import { LoadingButton } from '@/src/components/loadingButton/loadingButton'
import Link from 'next/link'
import { useForm } from './hooks/useForm'
import { FieldKey } from './constants'

export const SignIn = (): ReactElement => {
  const { isSubmitting, handleChange, errors, values, handleSubmit } = useForm({
    initialValues: { email: '', password: '' }
  })
  const { email, password } = values
  return (
    <form autoComplete='off' noValidate onSubmit={handleSubmit}>
      <Grid container sx={{ height: '100vh' }}>
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                maxWidth: '550px',
                width: '550px',
                minWidth: '350px',
                flexDirection: 'column',
                border: `1px solid rgb(96, 122, 172);`,
                borderRadius: '10px',
                justifyContent: 'center',
                alignItems: 'center',
                p: '48px',
                m: '8px'
              }}
            >
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 'fontWeightBold',
                  mt: '5%',
                  mb: '5px'
                }}
              >
                {'Welcome Back! Login to Your Account'}
              </Typography>
              <Typography variant='body2' align='center' sx={{ mb: '20px' }}>
                {`Continue on your Learning by entering credentials for your account`}
              </Typography>
              <Box sx={{ width: '100%' }}>
                <TextInput
                  id={FieldKey.EMAIL}
                  name={FieldKey.EMAIL}
                  label={'Student Email'}
                  placeholder={'Enter your email'}
                  fullWidth
                  autoFocus
                  onChange={handleChange}
                  value={email}
                  error={!!errors[FieldKey.EMAIL]}
                  helperText={errors[FieldKey.EMAIL]}
                />
                <PasswordInput
                  id={FieldKey.PASSWORD}
                  name={FieldKey.PASSWORD}
                  label={'Student Password'}
                  placeholder={'Enter your password'}
                  fullWidth
                  autoFocus
                  onChange={handleChange}
                  value={password}
                  error={!!errors[FieldKey.PASSWORD]}
                  helperText={errors[FieldKey.PASSWORD]}
                />
              </Box>
              <LoadingButton
                variant='contained'
                type='submit'
                fullWidth
                label={'Login'}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
              />
              <Typography
                variant='caption'
                gutterBottom
                sx={{
                  fontSize: '14px',
                  marginTop: '2px',
                  color: 'rgb(96,122,172)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Don't have an account?
                <Link href='/auth/register'>
                  <Typography
                    // component='a'
                    sx={{
                      color: 'rgb(96,122,172)',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      '&:hover': { color: 'darkblue' }
                    }}
                  >
                    Register
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}
