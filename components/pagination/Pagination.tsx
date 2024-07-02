'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "@/components/cards/Cards";

import styles from "@/components/pagination/pagination.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowLeft, faArrowRight, faSpinner);

export default function Pagination() {

    const [currentPage, setCurrentPage] = useState(0);
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasNext, sethasNext] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            axios.get(`/api/movies/${currentPage}`)
                    .then(response => {
                        setItems(response.data.docs);
                        sethasNext(response.data.hasNext);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
        };

        fetchItems();
    }, [currentPage, reload]);

    const onClickHandler = () => {
        setLoading(true);
    }

    const onDeleteHandler = () => {
        setReload(!reload);
    }

    return (
        <div>
            {loading ? (
                <div className={styles.spin}>
                    <FontAwesomeIcon icon="spinner" spin/> 
                </div>
            ) : (
                
                <div className={styles.card_layout}>
                    {items.map((item) => (
                        <Cards item={item} key={item._id} clickHandler={onClickHandler} deleteHandler={onDeleteHandler}/>
                    ))}
                </div>
            )}
            {
                (!loading) ? 
                    <div className={styles.pagination}>
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage <= 0 || loading}>
                            <FontAwesomeIcon icon="arrow-left" />
                        </button>
                        <p>{currentPage + 1}</p>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={!hasNext || loading}>
                            <FontAwesomeIcon icon="arrow-right" />
                        </button>
                    </div>
                    :
                    null

            }
        </div>
    );
}
