import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { registerUser } from '../requests/user'
import { InfoBanner, InfoBannerInterface } from '../components/info-banner'

const Register = () => {
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm()
  const [bannerMsg, setBannerMsg] = useState<InfoBannerInterface>()

  useEffect(() => {
    router.prefetch('/login')
  }, [])

  const onSubmit = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const { data, errors: formErrors } = await registerUser({ email, name, password })

    setBannerMsg({
      status: formErrors ? 'error' : 'success',
      title: formErrors ? 'Error' : 'Account Created',
      desc: formErrors ? formErrors[0].message : 'Successfully created account'
    })

    setTimeout(() => {
      setBannerMsg(null)
      if (!formErrors) router.push('/login')
    }, 3000)
  }

  return (
    <Flex width='full' align='center' justifyContent='center'>
      <Head>
        <title>Register - Simple Auth</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box p={2}>
        <Box textAlign='center'>
          <Heading>Register</Heading>
        </Box>
        {bannerMsg && <InfoBanner {...bannerMsg} />}
        <Box my={4} textAlign='left' p={8} maxWidth='500px' borderWidth={1} borderRadius={8} boxShadow='lg'>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
            <FormControl id='name' isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name='name'
                type='text'
                placeholder='John Smith'
                ref={register({ required: { value: true, message: 'Please enter name' } })}
              />
              {errors.name && <Text color='red'>{errors.name.message}</Text>}
            </FormControl>
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
                ref={register({ minLength: { value: 6, message: 'Password must 6+ characters' } })}
              />
              {errors.password && <Text color='red'>{errors.password.message}</Text>}
            </FormControl>
            <Button width='full' mt={4} type='submit'>
              Sign In
            </Button>
          </form>
        </Box>
        <Button width='full' mt={4} onClick={() => router.push('/login')}>
          Login
        </Button>
      </Box>
    </Flex>
  )
}

export default Register
