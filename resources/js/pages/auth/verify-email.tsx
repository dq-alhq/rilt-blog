import { FormEventHandler } from 'react'

import { Button, Form } from '@/components/ui'
import GuestLayout from '@/layouts/guest-layout'
import { router, useForm } from '@inertiajs/react'
import { LogOutIcon } from 'lucide-react'

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({})

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('verification.send'))
    }

    return (
        <>
            <div className='mb-4 text-sm text-muted-foreground'>
                Thanks for signing up! Before getting started, could you verify your email
                address by clicking on the link we just emailed to you? If you didn't
                receive the email, we will gladly send you another.
            </div>

            {status === 'verification-link-sent' && (
                <div className='mb-4 font-medium text-sm text-success'>
                    A new verification link has been sent to the email address you
                    provided during registration.
                </div>
            )}

            <div className='mt-4 flex items-center justify-between'>
                <Form onSubmit={submit}>
                    <Button type='submit' isDisabled={processing}>
                        Resend Verification Email
                    </Button>
                </Form>

                <Button onPress={() => router.post(route('logout'))} variant='danger'>
                    <LogOutIcon /> Log Out
                </Button>
            </div>
        </>
    )
}

VerifyEmail.layout = (page: any) => <GuestLayout title='Verify Email' children={page} />
