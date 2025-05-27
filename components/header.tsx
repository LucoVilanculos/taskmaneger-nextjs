"use client"

import { FC } from "react";

import type { HeaderProps } from "@/types/headeprops";
import { Button } from "./ui/button";

export const Header:FC<HeaderProps> = ({ name, onLogout }) => {
    return (
        <header className="px-2 py-1.5 h-15 flex items-center bg-gradient-to-l from-blue-900 to-cyan-700 text-white  justify-between shadow-2xl" >
            <h2 className="text-2xl "><strong>Task Maneger</strong></h2>
            <div className="flex items-center gap-4">
                <p className="font-bold md:text-[0.8rem] lg:text-lg">{name ? name : 'Visitor'}</p>
                {name && (
                    <Button
                        onClick={onLogout}
                        className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded"
                    >
                        Logout
                    </Button>
                )}
            </div>
            
        </header>
    );
};