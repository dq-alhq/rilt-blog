import { useState } from 'react'

import { CircleCheckBigIcon, ClipboardIcon } from 'lucide-react'

export default function CopyButton({ id }: { id: string }) {
    const [onCopy, setOnCopy] = useState(false)
    const [onSuccess, setSuccess] = useState(false)

    const handleCopy = async () => {
        let text = document.getElementById(id)!.textContent
        try {
            await navigator.clipboard.writeText(text!)
            setOnCopy(true)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }
    return (
        <div
            className='hover:scale-125 transition-all relative hover:bg-success/50 p-2 rounded-md cursor-pointer'
            onClick={handleCopy}
        >
            <CircleCheckBigIcon
                className={`cursor-pointer transition-all w-4 h-4 text-success ${onSuccess ? 'scale-100' : 'scale-0'}`}
                onTransitionEnd={() => {
                    setTimeout(() => {
                        setSuccess(false)
                        setOnCopy(false)
                    }, 1000)
                }}
            />
            <div className='h-full w-full absolute top-0 left-0 flex items-center justify-center'>
                <ClipboardIcon
                    className={`transition-all h-4 w-4 ${onCopy ? 'scale-0' : 'scale-100 '}`}
                    onTransitionEnd={() => {
                        if (onCopy) {
                            setSuccess(true)
                        }
                    }}
                />
            </div>
        </div>
    )
}
