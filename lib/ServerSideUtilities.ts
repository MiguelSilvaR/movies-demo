'use server';

import { createMovie, updateMovie } from "@/mongo/movies";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const validateRegularField = (formValues: FormData, fieldName:string, updateDoc: any, isNumber = false) => {
    let value = formValues.get(fieldName);
    const str = value?.toString().trim();
    if (!str)
        updateDoc[fieldName] = null;
    else {
        if (isNumber)
            try {
                updateDoc[fieldName] = parseFloat(str);
            } catch (error) {
                updateDoc[fieldName] = str;
            }
            
        else
            updateDoc[fieldName] = str;
    }
}

const validateMultipleInputField = (formValues: FormData, fieldName:string, updateDoc: any, isSigleStringAllow = false) => {
    let formValue = formValues.getAll(fieldName);
    
    if (!formValue || formValue.length === 0)
        updateDoc[fieldName] = null;
    else {
        formValue = formValue.filter((el:any) => {
            if (!el)
                return false;
            const str = el.trim();
            if (!el)
                return false;
            return true;
        })
        if (isSigleStringAllow && formValue.length == 1)
            updateDoc[fieldName] = formValue[0];
        else
            updateDoc[fieldName] = formValue;
    }
}

const validateCrew = (formValues: FormData, updateDoc: any) => {
    let fieldNameForm = 'crew-object';
    let fieldName = 'crew';
    let formValue = formValues.getAll(fieldNameForm);
    if (!formValue || formValue.length === 0)
        updateDoc[fieldName] = null;
    else {
        let map = new Map<string,Array<any>>();
        let crew: Array<Object> = [];
        formValue.forEach((el:any) => {
            const obj = JSON.parse(el);
            let job = obj.job.trim();
            let name = obj.name.trim();
            if (!job)
                job = 'unknown';
            if (!name)
                name = 'unknown';
            if (!map.has(job))
                map.set(job,[]);
            let arr = map.get(job);
            arr?.push(name);
        })
        map.forEach((val, key) => {
            crew.push({names:val, job:key})
        })
        updateDoc[fieldName] = crew;

    }
}

const validateInput = (formValues: FormData, doc: Object) => {
    validateRegularField(formValues, "title", doc);
    validateRegularField(formValues, "image_url", doc);
    validateRegularField(formValues, "summary", doc);
    validateRegularField(formValues, "sku", doc);
    validateRegularField(formValues, "list_price", doc, true);
    validateRegularField(formValues, "year", doc, true);
    validateRegularField(formValues, "runtime", doc, true);
    validateRegularField(formValues, "gross", doc, true);
    validateRegularField(formValues, "main_subject", doc);
    validateRegularField(formValues, "budget", doc, true);
    validateRegularField(formValues, "opening_date", doc);
    validateRegularField(formValues, "views", doc, true);
    
    validateMultipleInputField(formValues, "studio", doc, true);
    validateMultipleInputField(formValues, "genre", doc, true);
    validateMultipleInputField(formValues, "cast", doc);
    validateMultipleInputField(formValues, "awards", doc);
    validateMultipleInputField(formValues, "nominations", doc);

    validateCrew(formValues, doc);
}

export async function sendMovieUpdated(prevState:any, formValues:FormData) {
    let updateDoc = {};
    const _id = formValues.get("_id")?.toString();
    if (!_id)
        throw new Error("Missing _id in update!")

    validateInput(formValues, updateDoc);
    
    console.log(updateDoc)
    console.log(JSON.stringify(updateDoc));
    try {
        await updateMovie(_id, updateDoc);
    } catch (error) {
        return "failed"
    }

    return "success";
}

export async function sendCreateMovie(prevState:any, formValues:FormData) {
    let newMovie = {};

    validateInput(formValues, newMovie);
    
    console.log(newMovie)
    console.log(JSON.stringify(newMovie));
    try {
        await createMovie(newMovie);
    } catch (error) {
        return "failed"
    }

    return "success";
}

export async function goHome() {
    revalidatePath("/");
    redirect("/");
}