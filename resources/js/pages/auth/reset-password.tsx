import { FormEventHandler, useEffect } from 'react'

import { Button, Form, TextField } from '@/components/ui'
import GuestLayout from '@/layouts/guest-layout'
import { useForm } from '@inertiajs/react'

export default function ResetPassword({
    token,
    email
}: {
    token: string
    email: string
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: ''
    })

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation')
        }
    }, [])

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('password.store'))
    }

    return (
        <Form validationErrors={errors} onSubmit={submit} className='space-y-4'>
            <TextField
                label='Email'
                id='email'
                type='email'
                name='email'
                value={data.email}
                autoComplete='username'
                onChange={(e) => setData('email', e)}
                isRequired
                autoFocus
                errorMessage={errors.email}
            />

            <TextField
                label='Password'
                id='password'
                type='password'
                name='password'
                value={data.password}
                autoComplete='new-password'
                onChange={(e) => setData('password', e)}
                errorMessage={errors.password}
            />

            <TextField
                label='Confirm Password'
                type='password'
                name='password_confirmation'
                value={data.password_confirmation}
                autoComplete='new-password'
                onChange={(e) => setData('password_confirmation', e)}
                errorMessage={errors.password_confirmation}
            />

            <div className='flex items-center justify-end mt-4'>
                <Button type='submit' isDisabled={processing}>
                    Reset Password
                </Button>
            </div>
        </Form>
    )
}

ResetPassword.layout = (page: any) => (
    <GuestLayout title='Reset Password' children={page} />
)
