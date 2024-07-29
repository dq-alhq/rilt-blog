import { FormEventHandler } from 'react'

import { Button, Card, Form, Modal, TextField } from '@/components/ui'
import UserLayout from '@/layouts/user-layout'
import { Head, useForm } from '@inertiajs/react'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function DangerArea() {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors
    } = useForm({
        password: ''
    })

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault()
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => reset(),
            onSuccess: () => toast.success('Your account deleted successfully')
        })
    }

    return (
        <>
            <Head title='Danger Area' />
            <Card>
                <Card.Header>
                    <Card.Title>Delete Account</Card.Title>
                    <Card.Description>
                        Once your account is deleted, all of its resources and data will
                        be permanently deleted. Before deleting your account, please
                        download any data or information that you wish to retain.
                    </Card.Description>
                </Card.Header>

                <Card.Content>
                    <Modal>
                        <Button variant='danger'>Delete Account</Button>
                        <Modal.Content
                            size='xl'
                            isDismissable={false}
                            closeButton={false}
                        >
                            <Modal.Header>
                                <Modal.Title>
                                    Are you sure you want to delete your account?
                                </Modal.Title>
                                <Modal.Description>
                                    Once your account is deleted, all of its resources and
                                    data will be permanently deleted. Please enter your
                                    password to confirm you would like to permanently
                                    delete your account.
                                </Modal.Description>
                            </Modal.Header>

                            <Form validationErrors={errors} onSubmit={deleteUser}>
                                <TextField
                                    aria-labelledby='Password'
                                    id='password'
                                    type='password'
                                    name='password'
                                    value={data.password}
                                    onChange={(e) => setData('password', e)}
                                    autoFocus
                                    isRequired
                                    placeholder='Password'
                                    errorMessage={errors.password}
                                />

                                <Modal.Footer className='mt-6'>
                                    <Modal.Close>Cancel</Modal.Close>
                                    <Button
                                        type='submit'
                                        variant='danger'
                                        isDisabled={processing}
                                    >
                                        <TrashIcon />
                                        Delete Account
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Content>
                    </Modal>
                </Card.Content>
            </Card>
        </>
    )
}

DangerArea.layout = (page: any) => <UserLayout children={page} />
