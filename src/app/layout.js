"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from './context/authContext'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Authentication',
  description: 'Next js & Firebase Authentication ( Huaduf Task )',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
      </body>
    </html>
  )
}
