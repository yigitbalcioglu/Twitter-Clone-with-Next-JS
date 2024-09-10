"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

export const SendMessageButton = () => {

    const router = useRouter()
    return (
        <button className={`bg-[#009CFF] rounded-3xl w-24 h-9`}
            type="submit" onClick={() => {
                router.push("/messages")
            }}>Mesaj At</button>
    )
}
