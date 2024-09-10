"use client"
import { CiTwitter } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import Sidebarlogo from "./Sidebarlogo";
import { SidebarItem } from "./SidebarItem";

export default function Sidebar() {
    const items = [
        {
            label: "Home",
            href: "/",
            icon: FaHome
        },
        {
            label: "Profile",
            href: "/profile",
            icon: CgProfile
        }
    ]
    return (
        <div className="col-span-1 pr-4 md:pr-6 h-[80vh] xs:max-2xl:h-full overflow-y-auto">
            <div className="flex flex-col xs:max-2xl:items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <Sidebarlogo />
                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                        />
                    ))
                    }
                </div>
            </div>
        </div>
    );
}