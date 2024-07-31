'use client';

import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
library.add(faHome, faGreaterThan);

export default function Breadcrumb({params}: any) {
    const paths = new Map<string,string>([
        ['movie', "View Movie"],
        ['update_movie', "Edit movie"],
        ['create_movie', "Create movie"],
        ['analytics', "Analytics"]
    ])

    const pathname = usePathname();
    const [isHome, setIsHome] = useState(true);
    const [route, setRoute] = useState([]);

    useEffect(() => {
        if (!pathname || pathname === '/')
            setIsHome(true);
        else {
            let currPath:any = pathname.split('/');
            currPath = currPath.filter((el:string) => {
                return paths.has(el);
            }).map((el:string) => {
                return paths.get(el);
            })
            setIsHome(false);
            setRoute(currPath);
        }
    }, [pathname])

    return (
        isHome ? 
        <Fragment/> 
        :
        <div className="breadcrumb-wrapper">
            <Link href={"/"}>
                <FontAwesomeIcon className="breadcrumb-link" icon="home"/>
            </Link>
            <FontAwesomeIcon className="breadcrumb-div" icon="greater-than"/>
            {
                route.map((el, idx) =>{
                    return (
                        <Fragment key={idx}>
                            <p>{el}</p>
                            {
                                idx == route.length-1 ?
                                <Fragment/>
                                :
                                <FontAwesomeIcon className="breadcrumb-div" icon="greater-than"/>
                            }
                        </Fragment>
                    )
                })
            }
        </div>
    )
}