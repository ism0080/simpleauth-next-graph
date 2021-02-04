import React, { useEffect } from 'react'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import useAuth from '../hooks/useAuth'
import { logoutUser } from '../requests/user'

const Dashboard = () => {
  const router = useRouter()
  const { authenticated, mutate } = useAuth()

  useEffect(() => {
    if (authenticated === false) router.push('/login')
  }, [authenticated])

  const onLogout = async () => {
    await logoutUser()
    mutate('is_auth')
  }

  return (
    <>
      {authenticated && (
        <Flex width='full' align='center' justifyContent='center'>
          <Head>
            <title>Dashboard - Simple Auth</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Box p={2}>
            <Box textAlign='center'>
              <Heading>Dashboard</Heading>
            </Box>
            <Button width='full' mt={4} onClick={onLogout}>
              Logout
            </Button>
          </Box>
        </Flex>
      )}
    </>
  )
}

export default Dashboard
