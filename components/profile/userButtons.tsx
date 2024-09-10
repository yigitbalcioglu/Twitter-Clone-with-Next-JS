import React from 'react'

export const UserButtons = () => {
    return (
        <div className='text-white text-2 font-semibold grid grid-cols-3 col-span-3 mt-6 border-b-[0.1px] border-gray-600 pb-3'>
            <button className='hover:bg-slate-700'>Gönderiler</button>
            <button>Yanıtlar</button>
            <button>Medya</button>
        </div>
    )
}
