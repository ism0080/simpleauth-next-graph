import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { loginUser } from '../requests/user'
import useAuth from '../hooks/useAuth'
import { InfoBanner, InfoBannerInterface } from '../components/info-banner'

const Login = () => {
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm()
  const { mutate, authenticated } = useAuth()
  const [bannerMsg, setBannerMsg] = useState<InfoBannerInterface>()

  useEffect(() => {
    router.prefetch('/dashboard')
    if (authenticated) Router.replace('/dashboard')
  }, [authenticated])

  const onSubmit = async ({ email, password }: { email: string; password: string }) => {
    const { data, errors: formErrors } = await loginUser({ email, password })

    setBannerMsg({
      status: formErrors ? 'error' : 'success',
      title: formErrors ? 'Error' : 'Redirecting',
      desc: formErrors ? formErrors[0].message : 'Successfully logged in'
    })

    setTimeout(() => {
      setBannerMsg(null)
      mutate('is_auth')
    }, 3000)
  }

  return (
    <Flex width='full' align='center' justifyContent='center'>
      <Head>
        <title>Login - Simple Auth</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box p={2}>
        <Box textAlign='center'>
          <Heading>Login</Heading>
        </Box>
        {bannerMsg && <InfoBanner {...bannerMsg} />}
        <Box my={4} textAlign='left' p={8} maxWidth='500px' borderWidth={1} borderRadius={8} boxShadow='lg'>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
            <FormControl id='email' isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name='email'
                type='email'
                placeholder='test@test.com'
                ref={register({ required: { value: true, message: 'Please enter email' } })}
              />
              {errors.email && <Text color='red'>{errors.email.message}</Text>}
            </FormControl>
            <FormControl id='password' mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                name='password'
                type='password'
                placeholder='*******'
                ref={register({ minLength: { value: 6, message: 'Please enter password' } })}
              />
              {errors.password && <Text color='red'>{errors.password.message}</Text>}
            </FormControl>
            <Button width='full' mt={4} type='submit'>
              Sign In
            </Button>
          </form>
        </Box>
        <Button width='full' mt={4} onClick={() => router.push('/register')}>
          Register
        </Button>
      </Box>
    </Flex>
  )
}

export default Login
