import styles from "./inputs.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus);

export default function MultipleInputTitle({id, title, onClickHandlerAdd}:any) {
    return (
        <div className={styles['multiple-input-wrapper-title']}>
            <h4 className={styles['multiple-input-title']}>
                <label className="" htmlFor={id}>{title}</label>
            </h4>
            <button title="Add Field" className={styles['create-input']} type={"button"} onClick={onClickHandlerAdd}>
                <FontAwesomeIcon icon={"plus"} />
            </button>
        </div>
    )
}