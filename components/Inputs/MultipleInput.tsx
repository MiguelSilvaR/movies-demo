'use client';

import { useEffect, useState } from "react";
import styles from "./inputs.module.css"

import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import MultipleInputTitle from "./MultipleInputTitle";
library.add(faXmark);

export default function MultipleInput({title,id,value}:any) {
    const [inputs, setInputs] = useState<any[]>([]);

    useEffect(() => {
        if (!value)
            return;
        if (!(value instanceof Array))
            value = [value];
        let arr:any[] = [];
        value.forEach((el:any) => {
            const key = uuidv4();
            arr.push({key, value: el})
        });
        setInputs(arr);
    }, [])

    const onClickHandlerAdd = () => {
        const key = uuidv4();
        setInputs([...inputs, { key }]);
    };

    const onClickHandlerDelete = (key: any) => {
        const updatedInputs = inputs.filter((el) => el.key !== key);
        setInputs(updatedInputs);
    };

    return (
        <div className={styles['input-wrapper']}>
            <MultipleInputTitle id={id} title={title} onClickHandlerAdd={onClickHandlerAdd}/>
            {
                inputs.map((input) => (
                    <div key={input.key} className={styles['multiple-input-wrapper']}>
                        <input
                            className={styles['multiple-input']}
                            type="text"
                            name={id}
                            defaultValue={input.value}
                            required
                        />
                        <button title="Delete Field" type="button" className={styles['delete-input']}>
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