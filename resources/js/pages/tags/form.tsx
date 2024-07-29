import React, { FormEventHandler } from 'react'

import { Button, Form, Modal, TextField } from '@/components/ui'
import { wait } from '@/lib/utils'
import { FormSetting, Tag } from '@/types'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { Tags } from 'lucide-react'

export function TagForm({
    open,
    setOpen
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const { form_setting, tag } = usePage<{ form_setting: FormSetting; tag: Tag }>().props
    const { data, setData, post, errors, setError, processing } = useForm({
        name: tag?.name || '',
        _method: form_setting.method
    })
    const submit: FormEventHandler = (e) => {
        e.preventDefault()
        post(form_setting.action, {
            onSuccess: () => closeForm()
        })
    }

    const closeForm = () => {
        setOpen(false)
        wait(200).then(() => router.get(route('tags.index')))
    }
    return (
        <Modal isOpen={open} onOpenChange={closeForm}>
            <Head title={form_setting.title} />
            <Modal.Trigger className='sr-only'>Open</Modal.Trigger>
            <Modal.Content size='xl' isDismissable={true} closeButton={true}>
                <Modal.Header>
                    <Modal.Title>{form_setting.title}</Modal.Title>
                    <Modal.Description>
                        Harap perhatikan bahwa tidak semua tag memiliki icon, tunggu admin
                        untuk menambahkan secara manual jika dirasa tag cukup relevan
                    </Modal.Description>
                </Modal.Header>

                <Form validationErrors={errors} onSubmit={submit}>
                    <TextField
                        aria-labelledby='Name'
                        id='name'
                        name='name'
                        value={data.name}
                        onChange={(e) => setData('name', e)}
                        autoFocus
                        isRequired
                        placeholder='Name'
                        errorMessage={errors.name}
                    />

                    <Modal.Footer className='mt-6'>
                        <Modal.Close>Cancel</Modal.Close>
                        <Button type='submit' variant='primary' isDisabled={processing}>
                            <Tags />
                            Simpan
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Content>
        </Modal>
    )
}
