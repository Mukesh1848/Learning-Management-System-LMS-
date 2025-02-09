import { ReactElement } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { TextInput } from '@/src/components/styledInput/input'
import { PasswordInput } from '@/src/components/passwordInput/password'
import { LoadingButton } from '@/src/components/loadingButton/loadingButton'
import Link from 'next/link'

export const SignUp = (): ReactElement => {
  return (
    <form autoComplete='off' noValidate>
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
                {'Unlock Knowledge, One Click Away!'}
              </Typography>
              <Typography variant='body2' align='center' sx={{ mb: '20px' }}>
                {`Join the Future of Learning - Create Your Account Today!`}
              </Typography>
              <Box sx={{ width: '100%' }}>
                <TextInput
                  name='name'
                  type='name'
                  id='name'
                  label={'Student Name'}
                  placeholder={'Enter your Name'}
                  fullWidth
                  autoFocus
                />
                <TextInput
                  name='email'
                  type='email'
                  id='email'
                  label={'Student Email'}
                  placeholder={'Enter your email'}
                  fullWidth
                  autoFocus
                />
                <PasswordInput
                  name='password'
                  type='password'
                  id='password'
                  label={'Password'}
                  placeholder={'Enter strong password'}
                  fullWidth
                />
              </Box>
              <LoadingButton
                variant='contained'
                type='submit'
                fullWidth
                label={'Register'}
                isLoading={false}
                isDisabled={false}
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
                Already have an account?
                <Link href='/auth/login' passHref>
                  <Typography
                    // component='a'
                    sx={{
                      color: 'rgb(96,122,172)',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      '&:hover': { color: 'darkblue' }
                    }}
                  >
                    Login
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
