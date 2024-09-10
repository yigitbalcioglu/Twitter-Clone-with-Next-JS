import React from 'react'
import RegisterForm from "../../../components/(auth)/RegisterForm"
import { signIn } from '@/lib/auth'

const page = () => {
    return (
        <div className='fixed m-0 p-0 top-0 bottom-0 left-0 bg-red-700 bg-gradient-to-b from-[#FFF700] to-[#14365F]'>
            <h1 className="text-2xl font-bold mb-3 text-center mt-48">
                Kayıt Ol
            </h1>
            <div>
                <RegisterForm />
            </div>
            <form
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
            >
                <button type="submit">
                    Signin with Google
                </button>
            </form>
        </div>

    )
}

export default page