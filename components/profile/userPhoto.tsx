"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Image from 'next/image'
import GetUser from '@/hooks/getUser';
import getPhoto from '@/hooks/getPhoto';


interface UserPhotoProps {
    userId: string; // Define the type of profileId as string
}

export const UserPhoto: React.FC<UserPhotoProps> = ({ userId }) => {
    const [photo, setPhoto] = useState<string>()
    const [header, setHeader] = useState<string>()

    useEffect(() => {
        const fetchPhotos = async () => {
            try {

                // Kullanıcı adını ve email'i kontrol et
                const checkResponse = await fetch(`http://localhost:1337/api/all-users?filters[userId][$eq]=${userId}&populate=*`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await checkResponse.json();
                setPhoto(await getPhoto(userId))

                setHeader(data.data[0].attributes.Header.data[0].attributes.url)

            } catch (error) {
                throw (error)
            }
        }

        fetchPhotos();
    }, [userId]);

    return (
        <div className="text-white w-full h-full">
            <div className="relative w-full h-40 bg-slate-50">
                {header && (
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('http://localhost:1337${header}')` }}
                    />
                )}
                <div className="absolute bottom-[-60px] left-[10%] transform -translate-x-1/2 w-[7.5rem] h-[7.5rem] bg-white rounded-full border-4 border-black overflow-hidden">
                    {photo && (
                        <Image
                            alt="photo"
                            src={`http://localhost:1337${photo}`}
                            width={128}
                            height={128}
                            className="object-fill w-full h-full"
                        />
                    )}
                </div>
            </div>

        </div>

    )
}
