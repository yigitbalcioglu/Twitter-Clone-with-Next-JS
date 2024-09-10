"use client"

import { Formik, Form, Field, ErrorMessage } from 'formik';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation"

interface Values {
    email: string;
    password: string;
}

const validationSchema = Yup.object().shape({

    email: Yup.string().email('Geçersiz email formatı').required('Email gereklidir'),
    password: Yup.string().required('Şifre gereklidir'),
});

const LoginForm = () => {
    const router = useRouter()

    return (
        <Formik
            initialValues={{

                email: '',
                password: '',

            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {

                try {

                    // Örneğin, Strapi API'ye POST isteği:
                    const response = await fetch(`http://localhost:1337/api/all-users?filters[email][$eq]=${values.email}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    const data = await response.json();

                    if (!data || data.data.length === 0) {
                        throw new Error('Kullanıcı bulunamadı.');
                    }

                    const user = data.data[0].attributes;

                    // Şifre karşılaştırması yap
                    const isPasswordMatch = await bcrypt.compare(values.password, user.password);

                    if (isPasswordMatch) {
                        toast.success('Giriş başarılı!');
                        // Burada true döndürebilir veya kullanıcıyı yönlendirebilirsiniz
                        // Call the server-side API to create the session
                        const sessionResponse = await fetch('/api/createsession', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ userId: user.userId }),
                        });
                        if (!sessionResponse.ok) {
                            throw new Error('Session creation failed.');
                        }
                        else {
                            router.push("/")
                        }

                    } else {
                        throw new Error('Şifre hatalı.');
                    }

                } catch (error) {
                    throw error
                }
            }}
        >
            {({
                isSubmitting }) => (
                <Form className="grid gap-12 rounded-3xl bg-[#FF0000] p-16 border-4 mx-[48rem]">

                    <label htmlFor="email">
                        <p className="text-white text-lg">Email</p>
                        <Field
                            type="email"
                            name="email"
                            placeholder="Emailinizi Giriniz:"
                            className="input border-2 border-blue-700 w-full max-w-xs"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                    </label>
                    <label htmlFor="password">
                        <p className="text-white text-lg">Şifre</p>
                        <Field
                            type="password"
                            name="password"
                            placeholder="Şifrenizi Giriniz:"
                            className="input border-2 border-blue-700 w-full max-w-xs"
                        />
                        <ErrorMessage name="password1" component="div" className="text-red-500" />
                    </label>

                    <button type="submit"
                        disabled={isSubmitting} className="btn btn-primary border-2 rounded-md bg-slate-600 text-white">
                        Giriş Yap
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;