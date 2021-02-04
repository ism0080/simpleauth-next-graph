import React from 'react'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()

  return (
    <Flex width='full' align='center' justifyContent='center'>
      <Head>
        <title>Simple Auth</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box p={2}>
        <Box textAlign='center'>
          <Heading>Simple Auth</Heading>
        </Box>
        <Box my={4} p={8} maxWidth='500px' borderWidth={1} borderRadius={8} boxShadow='lg'>
          <Button width='full' mt={4} onClick={() => router.push('/login')}>
            Login
          </Button>
          <Button width='full' mt={4} onClick={() => router.push('/register')}>
            Register
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}

export default Home
