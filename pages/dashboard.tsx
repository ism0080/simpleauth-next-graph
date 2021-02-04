import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import Head from 'next/head'

const Dashboard = () => (
  <Flex width='full' align='center' justifyContent='center'>
    <Head>
      <title>Dashboard - Simple Auth</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Box p={2}>
      <Box textAlign='center'>
        <Heading>Dashboard</Heading>
      </Box>
    </Box>
  </Flex>
)

export default Dashboard
