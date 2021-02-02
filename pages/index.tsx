import { Box, Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import Head from 'next/head'

const Home = () => {
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
        <Box my={4} textAlign='left' p={8} maxWidth='500px' borderWidth={1} borderRadius={8} boxShadow='lg'>
          <form>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type='email' placeholder='test@test.com' />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type='password' placeholder='*******' />
            </FormControl>
            <Button width='full' mt={4} type='submit' variantColor='teal' variant='outline'>
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  )
}

export default Home
