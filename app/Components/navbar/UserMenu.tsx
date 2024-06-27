'use client'

import { Avatar, MenuItem } from '@mui/material';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import MenuItems from './MenuItems';
import { signOut } from 'next-auth/react';
import BackDrop from './BackDrop';
import { SafeUser } from '@/types';

interface UserMenuProps {
    currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, []);

    return (
        <>
            <div className='relative z-30' style={{ marginRight: '30px' }}>
                <div onClick={toggleOpen} className="
                    p-2
                    flex
                    flex-row
                    items-center
                    gap-1
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                    text-slate-700
                    bg-slate
                    hover:border-black
                    
                    ">
                    <Avatar src={currentUser?.image || ''} sx={{ width: 24, height: 24 }} />
                    {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
                </div>
                {isOpen && (
                    <div className="absolute
                        rounded-md
                        shadow-md
                        w-[170px]
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                        flex
                        flex-col
                        cursor-pointer
                        ">
                        {currentUser ? (
                            <div>
                                <Link href="/orders">
                                    <MenuItems onClick={toggleOpen}>
                                        Your Orders
                                    </MenuItems>
                                </Link>
                                <Link href="/admin">
                                    <MenuItems onClick={toggleOpen}>
                                        Admin Dashboard
                                    </MenuItems>
                                </Link>
                                <hr />
                                <MenuItems onClick={() => {
                                    toggleOpen();
                                    signOut();
                                }}>
                                    LogOut
                                </MenuItems>
                            </div>
                        ) : (
                            <div>
                                <Link href="/login">
                                    <MenuItems onClick={toggleOpen}>
                                        Login
                                    </MenuItems>
                                </Link>
                                <Link href="/register">
                                    <MenuItems onClick={toggleOpen}>
                                        Register
                                    </MenuItems>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
        </>
    );
};

export default UserMenu;
