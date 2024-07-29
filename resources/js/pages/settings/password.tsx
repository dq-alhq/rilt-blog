import { FormEventHandler } from 'react'

import { Button, Card, Form, TextField } from '@/components/ui'
import UserLayout from '@/layouts/user-layout'
import { Head, useForm } from '@inertiajs/react'
import { toast } from 'sonner'

export default function Password() {
    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: ''
    })

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault()

        put(route('password.update'), {
            preserveScroll: true,
            onFinish: () => reset(),
            onSuccess: () => toast.success('Password updated successfully'),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation')
                }

                if (errors.current_password) {
                    reset('current_password')
                }
            }
        })
    }

    return (
        <>
            <Head title='Password' />
            <Card>
                <Card.Header>
                    <Card.Title>Update Password</Card.Title>
                    <Card.Description>
                        Ensure your account is using a long, random password to stay
                        secure.
                    </Card.Description>
                </Card.Header>

                <Card.Content>
                    <Form
                        validationErrors={errors}
                        onSubmit={updatePassword}
                        className='space-y-4'
                    >
                        <TextField
                            label='Current Password'
                            id='current_password'
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e)}
                            autoFocus
                            isRequired
                            type='password'
                            autoComplete='current-password'
                            errorMessage={errors.current_password}
                        />

                        <TextField
                            label='New Password'
                            id='password'
                            value={data.password}
                            onChange={(e) => setData('password', e)}
                            type='password'
                            isRequired
                            autoComplete='new-password'
                            errorMessage={errors.password}
                        />

                        <TextField
                            label='Confirm Password'
                            id='password_confirmation'
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e)}
                            type='password'
                            isRequired
                            autoComplete='new-password'
                            errorMessage={errors.password_confirmation}
                        />

                        <div className='flex items-center gap-4'>
                            <Button type='submit' isDisabled={processing}>
                                Save
                            </Button>
                        </div>
                    </Form>
                </Card.Content>
            </Card>
        </>
    )
}
Password.layout = (page: any) => <UserLayout children={page} />
