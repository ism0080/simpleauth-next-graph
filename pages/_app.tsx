import type { AppProps } from 'next/app'
import { ChakraProvider, CSSReset, theme } from '@chakra-ui/react'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
