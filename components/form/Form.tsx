'use client';

import { Fragment, useState } from "react";
import { useFormState } from "react-dom";
import { goHome } from "@/lib/ServerSideUtilities";

import styles  from "./form.module.css";
import CrewInput from "@/components/Inputs/CrewInput";
import BasicInput from "@/components/Inputs/BasicInput";
import MultipleInput from "@/components/Inputs/MultipleInput";

import Swal from "sweetalert2";

export default function Form({ value, _id, movieAction, action }:any) {

    const [state, formAction] = useFormState(movieAction, null);
    const [isModalOpen, setModalOpen] = useState(false);

    const deserializeCrew = (value:any) => {
        let arr:Object[] = [];
        if (!(value instanceof Array))
            return null;
        value.forEach((obj:any) => {
            let job = obj.job;
            obj.names.forEach((name:any) => {
                arr.push({job,name})
            });
        });
        return arr;
    }

    const onSubmitHandler = () => {
        Swal.fire({
            title: `${( action === 'create' ? 'Creating ' : 'Updating ') } movie...`,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    };

    const onSuccess = () => {
        if (!isModalOpen) 
            setModalOpen(true)
        else
            return <Fragment/>;
        
        Swal.close();
        Swal.fire(
            'Done!',
            `Movie was ${( action === 'create' ? 'created' : 'updated') }!`,
            'success'
        ).then(
            (res) => {
                if (res) {
                    console.log("CALLED!")
                    goHome()
                }
            }
        );
        return <Fragment/>;
    }

    return (
        <form onSubmit={onSubmitHandler} className={styles.form} action={ formAction }>
            <input type="hidden" name="_id" defaultValue={_id} />
            <BasicInput title={"Title"} id={"title"} value={value?.title}/>
            <BasicInput title={"Image URL"} id={"image_url"} value={value?.image_url}/>
            <MultipleInput title={"Studio"} id={"studio"} value={value?.studio}/>
            <BasicInput title={"Summary"}id={"summary"} value={value?.summary} useTextArea={true}/>
            <BasicInput title={"SKU"} id={"sku"} value={value?.sku}/>
            <BasicInput title={"List Price"} id={"list_price"} value={value?.list_price} />
            <BasicInput title={"Year"} id={"year"} value={value?.year} />
            <MultipleInput title={"Awards"} id={"awards"} value={value?.awards} />
            <BasicInput title={"Runtime"} id={"runtime"} value={value?.runtime} />
            <BasicInput title={"Gross"} id={"gross"} value={value?.gross} />
            <MultipleInput title={"Cast"} id={"cast"} value={value?.cast} />
            <CrewInput title={"Crew"} id={"crew"} value={deserializeCrew(value?.crew)} />
            <BasicInput title={"Main Subject"} id={"main_subject"} value={value?.main_subject} />
            <MultipleInput title={"Nominations"} id={"nominations"} value={value?.nominations} />
            <BasicInput title={"Budget"} id={"budget"} value={value?.budget} />
            <BasicInput title={"Opening Date"} id={"opening_date"} value={value?.opening_date} />
            <MultipleInput title={"Genre"} id={"genre"} value={value?.genre} />
            <BasicInput title={"Views"} id={"views"} value={value?.views} />
            <button type="submit" className={styles.button} >Submit</button>
            {
                state === "success" ? onSuccess() : <Fragment/>
            }
        </form>
    )
}
