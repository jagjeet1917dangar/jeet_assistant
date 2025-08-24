"use client"

import { Button } from '@/components/ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image'
import React, { useContext } from 'react'
import axios from 'axios';
import { get } from 'http';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

function SignIn() {

    const CreateUser = useMutation(api.users.CreateUser);
    const {user, setUser} = useContext(AuthContext);
    const router = useRouter()
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            if (typeof window !== undefined) {
                localStorage.setItem('user_token', tokenResponse.access_token);
            }

            const user = await GetAuthUserData(tokenResponse.access_token);
            
            const result = await CreateUser({
                name: user.name,
                email: user.email,
                picture: user.picture
            });
            setUser(result);
            router.replace('/ai-assistants');
        },
        onError: errorResponse => console.log(errorResponse),
    });
    return (
        <div className='flex items-center flex-col justify-center h-screen'>
            <div className='flex flex-col items-center gap-5 border rounded-2xl p-10 shadow-md'>
                <Image
                    src={'/logo.svg'}  // better to use absolute path in public folder
                    alt='logo'
                    width={50}
                    height={50}
                />
                <h2 className='text-2xl'>Sign-in to Jeet Assistant & Agent</h2>

                {/* Fix: restrict button size */}
                <Button onClick={() => googleLogin()} className="w-fit px-6 py-2">
                    Sign in with Gmail
                </Button>
            </div>
        </div>
    )
}

export default SignIn
