"use client"

import React, { useState } from 'react'

export const FollowButton = () => {
    const [followState, setFollowState] = useState<boolean>(false)


    return (
        <button
            onSubmit={async () => {

                try {



                } catch (error) {
                    throw error
                }
            }}

            onClick={() => {
                setFollowState(!followState)
            }} className={`bg-[#009CFF] rounded-3xl w-24 h-9`}
            type="submit">{followState ? "Takipten Çık" : "Takip Et"}</button>
    )
}
