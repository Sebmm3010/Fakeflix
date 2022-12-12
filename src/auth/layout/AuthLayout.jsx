import React from 'react'
import { Footer, NavbarAuth } from '../components'

export const AuthLayout = ({children}) => {
  return (
    <>
        <NavbarAuth/>
        {
            children
        }
        <Footer/>
    </>
  )
}
