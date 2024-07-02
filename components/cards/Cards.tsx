'use-client';

import Image from 'next/image'
import styles from "@/components/cards/cards.module.css";

import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faPenNib, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
library.add(faTrash, faPenNib , faEye);

export default function Cards({ item, clickHandler, deleteHandler }:any) {
    
    const getSummaryFormatted = (summary:string) => {
        if (summary === null)
            return "View more..."
        let arr = summary.split(" ");
        let formattedSummary:string = '';
        for (let index = 0; index < 30 && index < arr.length; index++) {
            formattedSummary += arr[index];
            if (index !== 29)
                formattedSummary += " ";
        }
        formattedSummary += "...";
        return formattedSummary;
    }

    const deleteMovie = (key:string):Promise<any> => {
        return axios.delete(`/api/movie/${key}`);
    }

    const showDeleteAlert = (title: string, key: string) => {
        Swal.fire({
            title: `Do you want to delete '${title}'?`,
            text: 'This operation cannot be rollback',
            icon: 'warning',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true
        }).then(
            (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Deleting movie...',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
                    deleteMovie(key).then(
                        (response) => {
                            Swal.close()
                            if (response.data.deletedCount !== 0) {
                                Swal.fire(
                                    'Done!',
                                    'Movie was deleted!',
                                    'success'
                                ).then(
                                    (res) => {
                                        deleteHandler();
                                    }
                                );
                            } else 
                                throw new Error("Cannot delete doc");
                        }
                    ).catch(
                        () => {
                            Swal.close()
                            Swal.fire(
                                'Error!',
                                'Movie was not deleted!',
                                'error'
                            );
                        }
                    );
                    
                }
            }
        );
    };

    return (
        <div className={styles.card} key={item._id}>
            <Image
            src={item.image_url === null ? "/generic_mov.webp" : item.image_url}
            alt="Picture of the movie"
            className='card_image'
            width={300}
            height={300}

            />
            <h3 className={styles.card_title}>{item.title}</h3>
            <p className={styles.card_description}>{getSummaryFormatted(item.summary)}</p>
            <div className={styles.button_wrapper}>
                <Link onClick={clickHandler} className={`${styles.button} ${styles['view-more']}`} href={`/movie/${item._id}`}>
                    <FontAwesomeIcon icon="eye"/> 
                </Link>
                <Link onClick={clickHandler} className={`${styles.button} ${styles.update}`} href={`/update_movie/${item._id}`}>
                    <FontAwesomeIcon icon="pen-nib"/> 
                </Link>
                <button className={`${styles.button} ${styles.delete}`} onClick={() => showDeleteAlert(item.title, item._id)}>
                    <FontAwesomeIcon icon="trash"/> 
                </button>
            </div>
            
        </div>
    );
}
