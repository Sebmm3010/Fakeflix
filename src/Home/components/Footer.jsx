import React from 'react'
import { useHomeComponents } from '../hooks/useHomeComponents'

export const Footer = () => {
    const { location }= useHomeComponents();
    return (
        <footer className={location.pathname === '/user' ? 'absolute w-full footer text-center p-4 bg-base-300 text-base-content text-white bottom-0'
            : "w-full footer text-center p-4 bg-base-300 text-base-content text-white bottom-0"
        }>
            <div>
                <p>Copyright © 2022 - All right reserved by ACME Industries Ltd</p>
            </div>
        </footer>
    )
}
