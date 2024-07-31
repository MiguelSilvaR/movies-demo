'use client';

import { Fragment, useEffect, useState } from "react";
import styles from "./analytics.module.css";
import Spin from "@/components/spin/Spin";
import axios from "axios";

export default function AnalitycsComponent({}) {
    const currYear = new Date().getFullYear();

    const [loading, setLoading]   = useState(true);
    const [rankedDocs, setRankedDocs] = useState([]);
    const [year, setYear] = useState(currYear);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            axios.get(`/api/analytics/${year}`)
                    .then(response => {
                        console.log(response)
                        setRankedDocs(response.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
        };

        fetchItems();
    }, [year]);

    const onClickHandler = () => {
        let valYear:any = document.querySelector("#year");
        if (!valYear.value)
            valYear = currYear;
        else
            valYear = valYear.value;
        if (valYear == year)
            return;
        setLoading(true);
        setYear(valYear);
    }

    return (
        <div className={styles.container}>
            <h4 className={styles.h4}>Highest-grossing films by year</h4>
            <input type="number" name="year" id="year" min={1950} max={year} defaultValue={currYear} className={styles.input}/>
            <button onClick={onClickHandler} className={styles.button}>Search</button>
            {
                loading ?
                    <Spin/>
                    :
                    <Fragment>
                        {
                            (rankedDocs.length === 0) ?
                                <p className={styles.noData}>No Data For This Year</p>
                                :
                                (
                                    <table key={year} className={`${styles.table} ${styles.show}`}>
                                        <thead>
                                            <tr className={styles.tr} >
                                                <th className={styles.th}>Rank</th>
                                                <th className={styles.th}>Year</th>
                                                <th className={styles.th}>Title</th>
                                                <th className={styles.th}>Gross</th>
                                            </tr>                                
                                        </thead>
                                        <tbody>
                                            {
                                                rankedDocs.map((el:any, idx) => {
                                                    return (
                                                    <tr className={styles.tr} key={idx}>
                                                        <td className={styles.td}>{el.rank}</td>
                                                        <td className={styles.td}>{el.year}</td>
                                                        <td className={styles.td}>{el.title}</td>
                                                        <td className={styles.td}>{el.gross}</td>
                                                    </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                )
                        }
                    </Fragment>
            }
        </div>
    );
}