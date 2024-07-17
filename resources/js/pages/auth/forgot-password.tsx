import { FormEventHandler } from 'react'

import { Button, Form, TextField } from '@/components/ui'
import GuestLayout from '@/layouts/guest-layout'
import { Head, useForm } from '@inertiajs/react'

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: ''
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('password.email'))
    }

    return (
        <>
            <Head title='Forgot Password' />

            <div className='mb-4 text-sm text-gray-600'>
                Forgot your password? No problem. Just let us know your email address and
                we will email you a password reset link that will allow you to choose a
                new one.
            </div>

            {status && (
                <div className='mb-4 font-medium text-sm text-success'>{status}</div>
            )}

            <Form validationErrors={errors} onSubmit={submit}>
                <TextField
                    aria-labelledby='Email'
                    id='email'
                    type='email'
                    name='email'
                    value={data.email}
                    autoFocus
                    onChange={(e) => setData('email', e)}
                    errorMessage={errors.email}
                />

                <div className='flex items-center justify-end mt-4'>
                    <Button isDisabled={processing}>Email Password Reset Link</Button>
                </div>
            </Form>
        </>
    )
}

ForgotPassword.layout = (page: any) => (
    <GuestLayout title='Forgot Password' children={page} />
)
