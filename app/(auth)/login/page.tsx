import React from 'react'
import LoginForm from "../../../components/(auth)/LoginForm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { FC } from "react"

interface ILoginPageProps {
    searchParams: {
        redirect?: string
    }
}


const LoginPage: FC<ILoginPageProps> = ({ searchParams }) => {
    if (cookies().get("accessToken")?.value) redirect(searchParams.redirect || "/")
    return (
        <div className='fixed m-0 p-0 top-0 bottom-0 left-0 bg-red-700 bg-gradient-to-b from-[#FFF700] to-[#14365F]'>
            <h1 className="text-2xl font-bold mb-3 text-center mt-48">
                Giriş Yap
            </h1>
            <div>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage