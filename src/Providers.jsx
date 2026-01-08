import React from 'react'
import { ClerkProvider } from '@clerk/clerk-react'
import { AppContextProvider } from './context/AppContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

const Providers = ({ children }) => {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <BrowserRouter>
                <AppContextProvider>
                    {children}
                    <Toaster />
                </AppContextProvider>
            </BrowserRouter>
        </ClerkProvider>
    )
}

export default Providers
