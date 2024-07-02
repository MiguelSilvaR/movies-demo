import styles from "./inputs.module.css"

export default function BasicInput({title, id, value, useTextArea}:any) {
    return (
        <div className={styles['input-wrapper']}>
            <h4 className={styles.title}>
                <label className={styles.label} htmlFor={id}>{title}</label>    
            </h4>
            {
                useTextArea ? 
                <textarea className={styles['basic-input']} name={id} id={id} defaultValue={value}></textarea>
                :
                <input className={styles['basic-input']} type="text" id={id} name={id} defaultValue={value}/>
            }
        </div>
    )
}