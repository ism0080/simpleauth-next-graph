import React from 'react'
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

export interface InfoBannerInterface {
  status: 'error' | 'success' | 'warning' | 'info'
  title: string
  desc: string
}

export const InfoBanner = ({ status, title, desc }: InfoBannerInterface) => (
  <Alert status={status}>
    <AlertIcon />
    <AlertTitle mr={2}>{title}</AlertTitle>
    <AlertDescription>{desc}</AlertDescription>
  </Alert>
)
