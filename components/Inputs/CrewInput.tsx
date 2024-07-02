'use client';

import { useEffect, useState } from "react";
import styles from "./inputs.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import MultipleInputTitle from "./MultipleInputTitle";
library.add(faXmark);

export default function CrewInput({title,id,value}:any) {
    const [inputs, setInputs] = useState<any[]>([]);

    useEffect(() => {
        if (!value)
            return;
        if (!(value instanceof Array))
            value = [value];
        let arr:any[] = [];
        value.forEach((el:any) => {
            const key = window.crypto.randomUUID();
            arr.push({key, job: el.job, name: el.name, 'crew-object': JSON.stringify(el)})
        });
        setInputs(arr);
    }, [])

    const onClickHandlerAdd = () => {
        const key = window.crypto.randomUUID();
        setInputs([...inputs, { key }]);
    };

    const onClickHandlerDelete = (key: any) => {
        const updatedInputs = inputs.filter((el) => el.key !== key);
        setInputs(updatedInputs);
    };

    const onBlurHandleCrew = (job:string|null,name:string|null,key:string) => {
        let el:any = document.getElementById("crew-object-" + key)
        let obj;
        if (!el.value)
            obj = {};
        else
            obj = JSON.parse(el.value);
        if (!obj)
            obj = {};
        if (job !== null)
            obj.job = job;
        if (name !== null)
            obj.name = name;
        el.value = JSON.stringify(obj);
    }

    return (
        <div className={styles['input-wrapper']}>
            <MultipleInputTitle id={id} title={title} onClickHandlerAdd={onClickHandlerAdd}/>
            {
                inputs.map((input) => (
                    <div key={input.key} className={styles['multiple-input-wrapper']}>
                        <input
                            className={`${styles['crew-input']} ${styles['left-crew-input']}`}
                            type="text"
                            name={id}
                            defaultValue={input.job}
                            required
                            onBlur={(e) => onBlurHandleCrew(e.target.value, null, input.key)}
                        />
                        <input
                            className={styles['crew-input']}
                            type="text"
                            name={id}
                            defaultValue={input.name}
                            required
                            onBlur={(e) => onBlurHandleCrew(null, e.target.value, input.key)}
                        />
                        <input type="hidden" name="crew-object" id={"crew-object-" + input.key} defaultValue={input['crew-object']}/>
                        <button type="button" className={styles['delete-input']}>
                            <FontAwesomeIcon
                                icon={"xmark"}
                                onClick={() => onClickHandlerDelete(input.key)}
                            />
                        </button>
                    </div>
                ))
            }
        </div>
    )
}