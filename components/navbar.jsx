import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import Image from 'next/image'

export default async function Navbar() {
  const session = await auth()
  const user = session?.user

  return (
    <header className="flex justify-between items-center px-5 py-3 bg-gray-800 text-white shadow-md">
      <Link href='/' className='flex items-center gap-3'>
      
        <h1 className="text-2xl font-bold">FlashCard</h1>
      </Link>

      <nav className="flex items-center gap-5">
       {user && <Link href='/cards' className="hover:text-gray-300">Cards</Link>}
        {user?.type === 'admin' && <Link href='/admin' className="hover:text-gray-300">Admin</Link>}
        {user ? (
          <Link href='/api/auth/signout' className="hover:text-gray-300">Sign Out</Link>
        ) : (
          <Link href='/api/auth/signin' className="hover:text-gray-300">Sign In</Link>
        )}
        {user && (
          <Image src={user.image} alt={user.name} width={40} height={40} className="rounded-full border-2 border-white" />
        )}
      </nav>
    </header>
  )
}