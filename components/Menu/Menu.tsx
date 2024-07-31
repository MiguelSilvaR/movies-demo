'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Breadcrumb({params}: any) {
    const paths = new Set<string>([
        "create_movie",
        "analytics"
    ])

    const pathname = usePathname();
    const [route, setRoute] = useState('');

    useEffect(() => {
        if (!pathname || pathname === '/')
            setRoute("home")
        else {
            let currPath:any = pathname.split('/');
            currPath = currPath.filter((el:string) => {
                return paths.has(el);
            })
            setRoute(currPath.join());
        }
    }, [pathname])

    return (
        <ul className="menu">
            <Link href={"/"}>
                <li className={(route == 'home' ? "active" : "") + " menu_option"}>
                    Home
                </li>
            </Link>
            <Link href={"/create_movie"}>
                <li className={(route == 'create_movie' ? "active" : "") + " menu_option"}>
                    Create Movie
                </li>
            </Link>
            <Link href={"/analytics"}>
                <li className={(route == 'analytics' ? "active" : "") + " menu_option"}>
                    Analytics
                </li>
            </Link>
        </ul>
    )
}