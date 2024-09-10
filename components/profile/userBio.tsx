"use client"
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import GetUser from '@/hooks/getUser';

interface User {
    username: string;
    nickname: string;
    Location: string;
    StartDate: string;
    followingCount?: number;
    followersCount?: number;
    followedBy?: string[];
}

interface UserBioProp {
    userId: string
}

export const UserBio: React.FC<UserBioProp> = ({ userId }) => {

    const [userData, setUserData] = useState({
        username: "",
        nickname: "",
        location: "",
        startDate: undefined as Date | undefined,
        followingCount: 0,
        followersCount: 0,
        followedBy: 0
    });

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await GetUser(userId);
                setUserData({
                    username: user.username,
                    nickname: user.nickname,
                    location: user.Location,
                    startDate: user.StartDate,
                    followingCount: user.followingCount ?? 0,
                    followersCount: user.followersCount ?? 0,
                    followedBy: user.followedBy ?? 0
                });
            } catch (error) {
                throw (error)
            }
        };

        fetchCurrentUser();
    }, [userId]);


    return (
        <div className='pb-4'>
            <div className='text-white ml-4 mt-20'>
                <h1 className='text-xl font-extrabold'>{userData.username}</h1>
                <h3 className='text-gray-500 font-medium'>@{userData.nickname}</h3>
            </div>
            <div className='text-gray-500 flex ml-5 mt-4'>
                <FaLocationDot />
                <p className='ml-1'>{userData.location}</p>
                <div className='ml-4 flex'>
                    <FaCalendarAlt />
                    <p className='ml-1'>{userData.startDate} tarihinde katıldı</p></div>
            </div>
            <div className='flex ml-5 mt-4'>
                <p className='text-white mr-1'>{userData.followingCount}</p>
                <p className='text-gray-500 mr-4'> Takip edilen</p>
                <p className='text-white mr-1'>{userData.followersCount}</p>
                <p className='text-gray-500'> Takipçi</p>
            </div>
            <div className='flex text-sm ml-5 mt-4 text-gray-500'>
                <p className='pr-1'>Random User</p>
                <p className='pr-1'>ve takip ettiğin diğer</p>
                <p className='pr-1'>Ortak takipçi sayısı</p>
                <p>kişi tarafından takip ediliyor.</p>
            </div>
        </div>
    )
}
