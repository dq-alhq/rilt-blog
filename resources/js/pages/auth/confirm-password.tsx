import { FormEventHandler, useEffect } from 'react'

import { Button, Form, TextField } from '@/components/ui'
import GuestLayout from '@/layouts/guest-layout'
import { useForm } from '@inertiajs/react'

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: ''
    })

    useEffect(() => {
        return () => {
            reset('password')
        }
    }, [])

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('password.confirm'))
    }

    return (
        <>
            <div className='mb-4 text-sm text-muted-foreground'>
                This is a secure area of the application. Please confirm your password
                before continuing.
            </div>

            <Form validationErrors={errors} onSubmit={submit}>
                <TextField
                    label='Password'
                    id='password'
                    type='password'
                    name='password'
                    value={data.password}
                    autoFocus
                    isRequired
                    onChange={(e) => setData('password', e)}
                />

                <div className='flex items-center justify-end mt-4'>
                    <Button type='submit' isDisabled={processing}>
                        Confirm
                    </Button>
                </div>
            </Form>
        </>
    )
}

ConfirmPassword.layout = (page: any) => (
    <GuestLayout title='Confirm Password' children={page} />
)
