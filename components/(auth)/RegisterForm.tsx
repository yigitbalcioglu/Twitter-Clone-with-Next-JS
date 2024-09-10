"use client"

import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';

import { useRouter } from 'next/navigation';
import { signup } from '@/lib/auth';

interface Values {
    username: string;
    email: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Kullanıcı adı gereklidir'),
    email: Yup.string().email('Geçersiz email formatı').required('Email gereklidir'),
    password: Yup.string().required('Şifre gereklidir'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
        .required('Şifre onayı gereklidir'),
});

const RegisterForm = () => {
    const router = useRouter();

    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    await signup(values); // Call the signup function
                    router.push("/login");
                } catch (error) {
                    console.error("Kayıt sırasında hata oluştu.", error);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, touched }) => (
                <Form className="grid gap-12 rounded-3xl bg-[#FF0000] p-16 border-4 mx-[48rem]">
                    <label htmlFor="username">
                        <p className="text-white text-lg">Kullanıcı Adı</p>
                        <Field
                            type="text"
                            name="username"
                            placeholder="Kullanıcı Adınızı Giriniz:"
                            className="input border-2 border-blue-700 w-full max-w-xs"
                        />
                        {errors.username && touched.username && <p>{errors.username}</p>}
                    </label>
                    <label htmlFor="email">
                        <p className="text-white text-lg">Email</p>
                        <Field
                            type="email"
                            name="email"
                            placeholder="Emailinizi Giriniz:"
                            className="input border-2 border-blue-700 w-full max-w-xs"
                        />
                        {errors.email && touched.email && <p>{errors.email}</p>}
                    </label>
                    <label htmlFor="password">
                        <p className="text-white text-lg">Şifre</p>
                        <Field
                            type="password"
                            name="password"
                            placeholder="Şifrenizi Giriniz:"
                            className="input border-2 border-blue-700 w-full max-w-xs"
                        />
                        {errors.password && touched.password && <p>{errors.password}</p>}
                    </label>
                    <label htmlFor="confirmPassword">
                        <p className="text-white text-lg">Şifre Onayı</p>
                        <Field
                            type="password"
                            name="confirmPassword"
                            placeholder="Şifrenizi Onaylayınız:"
                            className="input border-2 border-blue-700 w-full max-w-xs"
                        />
                        {errors.confirmPassword && touched.confirmPassword && <p>{errors.confirmPassword}</p>}
                    </label>
                    <button
                        className="btn btn-primary border-2 rounded-md bg-slate-600 text-white"

                        type="submit"
                    >
                        Kayıt Ol
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;