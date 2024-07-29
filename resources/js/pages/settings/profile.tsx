import { Button, Card, Form, Link, TextField } from '@/components/ui'
import UserLayout from '@/layouts/user-layout'
import { PageProps } from '@/types'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { toast } from 'sonner'

interface Props {
    mustVerifyEmail: boolean
    status?: string
}

export default function Profile({ mustVerifyEmail, status }: Props) {
    const user = usePage<PageProps>().props.auth.user

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        username: user.username,
        email: user.email
    })

    function submit() {
        patch(route('profile.update'), { onSuccess: () => toast('Saved') })
    }

    function onChange(e: any) {
        setData(e.target.name, e.target.value)
    }

    return (
        <>
            <Head title='Profile' />
            <Card>
                <Card.Header>
                    <Card.Title>Profile Information</Card.Title>
                    <Card.Description>
                        Update your account's profile information and email address.
                    </Card.Description>
                </Card.Header>

                <Card.Content>
                    <Form
                        validationErrors={errors}
                        onSubmit={submit}
                        className='space-y-4'
                    >
                        <TextField
                            label='Name'
                            id='name'
                            name='name'
                            value={data.name}
                            onChange={onChange}
                            autoFocus
                            autoComplete='name'
                        />
                        <TextField
                            label='Username'
                            id='username'
                            name='username'
                            value={data.username}
                            onChange={onChange}
                            autoComplete='username'
                        />
                        <TextField
                            label='Email'
                            id='email'
                            name='email'
                            type='email'
                            value={data.email}
                            onChange={onChange}
                            autoComplete='email'
                        />

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className='text-sm mt-2 text-danger'>
                                    Your email address is unverified.
                                    <Link
                                        onPress={() =>
                                            router.post(route('verification.send'))
                                        }
                                        className='text-sm text-foreground hover:text-primary ml-2 cursor-pointer'
                                    >
                                        Click here to re-send the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className='mt-2 font-medium text-sm text-success'>
                                        A new verification link has been sent to your
                                        email address.
                                    </div>
                                )}
                            </div>
                        )}

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

Profile.layout = (page: any) => <UserLayout children={page} />
