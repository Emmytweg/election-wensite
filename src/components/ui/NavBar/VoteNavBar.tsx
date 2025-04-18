'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { NavbarButton } from '../resizable-navbar';
import Link from 'next/link';
import john from '../../../images/john.png';

interface User {
  fullName: string;
  matricNumber: string;
  department: string;
}

export default function VoteNavBar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className='flex justify-between items-center p-6'>
      <div className='flex gap-4'>
        <Image
          src={john}
          alt='User Image'
          
          className='rounded-full w-10 h-10   '
        />
        <div>
          <strong>{user?.fullName || 'Loading...'}</strong>
          <p className='text-sm text-neutral-500'>{user?.department}</p>
          <p className='text-sm text-neutral-500'>{user?.matricNumber}</p>
        </div>
      </div>
      <Link href='/'>
        <NavbarButton
          className=''
          href='/'
          variant='primary'
          onClick={() => localStorage.removeItem("user")}
        >
          Sign Out
        </NavbarButton>
      </Link>
    </div>
  );
}
