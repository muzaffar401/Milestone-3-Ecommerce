"use client";

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useState } from 'react';
import Form from 'next/form';
import { PackageIcon, TrolleyIcon } from '@sanity/icons';
import useBasketStore from '@/store/store';

const Header = () => {
    const { user } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const itemCount = useBasketStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    );

    const createClerkPasskey = async () => {
        try {
            const response = await user?.createPasskey();
            console.log(response);
        } catch (err) {
            console.error("Error:", JSON.stringify(err, null, 2));
        }
    };

    return (
        <header className=' px-4 py-2'>
            <div className='flex w-full justify-between items-center'>
                <Link href={'/'} className='flex sm:hidden text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer'>
                    Shopr
                </Link>

                <button
                    className='sm:hidden text-blue-500 focus:outline-none text-xl'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>
            </div>

            <div
                className={`transition-all justify-between items-center duration-300 ease-in-out w-full sm:w-auto sm:flex sm:items-center ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 sm:max-h-full sm:opacity-100'
                    } overflow-hidden sm:overflow-visible`}
            >

                <div>
                    <Link href={'/'} className='text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer'>
                        Shopr
                    </Link>
                </div>
                <Form
                    action='/search'
                    className='w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0'
                >
                    <input type="text" name='query' placeholder='Search for products' className='bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl' />
                </Form>

                <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0'>
                    <Link
                        href={'/basket'}
                        className='relative flex justify-center items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        <TrolleyIcon className='w-6 h-6' />
                        <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                            {itemCount}
                        </span>
                        <span>My Basket</span>
                    </Link>

                    <ClerkLoaded>
                        <SignedIn>
                            <Link
                                href={'/orders'}
                                className='relative flex justify-center items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            >
                                <PackageIcon className='w-6 h-6' />
                                <span>My Orders</span>
                            </Link>
                        </SignedIn>

                        {user ? (
                            <div className='flex items-center space-x-2'>
                                <UserButton />

                                <div className='hidden sm:block text-xs'>
                                    <p className='text-gray-400'>Welcome Back</p>
                                    <p className='font-bold'>{user.fullName}!</p>
                                </div>
                            </div>
                        ) : (
                            <SignInButton mode='modal' />
                        )}

                        {user?.passkeys.length === 0 && (
                            <button
                                onClick={createClerkPasskey}
                                className='bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border'
                            >
                                Create Passkey
                            </button>
                        )}
                    </ClerkLoaded>
                </div>
            </div>
        </header>
    );
};

export default Header;
