import Image from 'next/image'
import styles from "./movie.module.css";
import { getMovie } from "@/mongo/movies";

function InfoComponent({title, value, regular = true}:any) {
    return (
        <div className={styles.info_wrapper}>
            <h4>{title}</h4>
            {
                regular ? 
                <p>{value}</p> 
                :
                value
            }
        </div>
    )
}

export default async function MovieComponent({ params }:any) {
    let doc = await getMovie(params.id);

    const validateField = (data:any) => {
        if (data === null)
            return 'unknown';
        return data;
    }

    return (
        <div className={styles.card}>
            <Image
                src={doc.image_url === null ? "/generic_mov.webp" : doc.image_url}
                alt="Picture of the movie"
                width={300}
                height={400}
            />
            <h2>{validateField(doc.title)}</h2>
            <InfoComponent title={"Studio"} value={validateField(doc.studio)}/>
            <InfoComponent title={"Summary"} value={validateField(doc.summary)}/>
            <InfoComponent title={"SKU"} value={validateField(doc.sku)}/>
            <InfoComponent title={"List Price"} value={validateField(doc.list_price)}/>
            <InfoComponent title={"Year"} value={validateField(doc.year)}/>
            <InfoComponent 
                title={"Awards"} 
                value={
                    (doc.awards instanceof Array) ?
                    <ul>
                        {doc.awards.map(
                            (elem: any, idx:number) => {
                                return <li key={idx}>{elem}</li>
                            }
                        )}
                    </ul>
                    :
                    <p>N/A</p>
                } 
                regular={false}
            />
            <InfoComponent title={"Runtime"} value={validateField(doc.runtime)}/>
            <InfoComponent title={"Gross"} value={validateField(doc.gross)}/>
            <InfoComponent 
                title={"Cast"} 
                value={
                    (doc.cast instanceof Array) ?
                    <ul>
                        {doc.cast.map(
                            (elem: any, idx:number) => {
                                return <li key={idx}>{elem}</li>
                            }
                        )}
                    </ul>
                    :
                    <p>N/A</p>
                }
                regular={false}
            />
            <InfoComponent 
                title={"Crew"} 
                value={
                    (doc.crew instanceof Array) ?
                    <ul>
                        {doc.crew.map(
                            (elem: any, idx:number) => {
                                return <li key={idx}>{elem.job} - {elem.names.join(", ")}</li>
                            }
                        )}
                    </ul>
                    :
                    <p>N/A</p>
                }
                regular={false}
            />
            <InfoComponent title={"Main Subject"} value={validateField(doc.main_subject)}/>
            <InfoComponent 
                title={"Nominations"} 
                value={
                    (doc.nominations instanceof Array) ?
                    <ul>
                        {doc.nominations.map(
                            (elem: any, idx:number) => {
                                return <li key={idx}>{elem}</li>
                            }
                        )}
                    </ul>
                    :
                    <p>N/A</p>
                }
                regular={false}
            />
            <InfoComponent title={"Budget"} value={validateField(doc.budget)}/>
            <InfoComponent title={"Opening Date"} value={validateField(doc.opening_date)}/>
            <InfoComponent title={"Genre"} value={(doc.genre instanceof Array) ? doc.genre.join(", ") : doc.genre}/>
            <InfoComponent title={"Views"} value={validateField(doc.views)}/>
        </div>
    );
}
