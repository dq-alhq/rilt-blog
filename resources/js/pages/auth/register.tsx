import { FormEventHandler, useEffect } from 'react'

import { Button, Form, Link, TextField } from '@/components/ui'
import GuestLayout from '@/layouts/guest-layout'
import { useForm } from '@inertiajs/react'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
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

        post(route('register'))
    }

    return (
        <Form validationErrors={errors} onSubmit={submit} className='space-y-4'>
            <TextField
                label='Name'
                id='name'
                name='name'
                value={data.name}
                autoComplete='name'
                autoFocus
                onChange={(e) => setData('name', e)}
                isRequired
                errorMessage={errors.name}
            />

            <TextField
                label='Email'
                id='email'
                type='email'
                name='email'
                value={data.email}
                autoComplete='username'
                onChange={(e) => setData('email', e)}
                isRequired
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
                isRequired
                errorMessage={errors.password}
            />

            <TextField
                label='Confirm Password'
                id='password_confirmation'
                type='password'
                name='password_confirmation'
                value={data.password_confirmation}
                autoComplete='new-password'
                onChange={(e) => setData('password_confirmation', e)}
                isRequired
                errorMessage={errors.password_confirmation}
            />

            <div className='flex items-center justify-end mt-4 gap-4'>
                <Link
                    href={route('login')}
                    className='text-sm text-muted-foreground hover:text-foreground'
                >
                    Already registered?
                </Link>

                <Button type='submit' isDisabled={processing}>
                    Register
                </Button>
            </div>
        </Form>
    )
}

Register.layout = (page: any) => <GuestLayout title='Register' children={page} />
