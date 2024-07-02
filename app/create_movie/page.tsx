import Form from '@/components/form/Form';
import { sendCreateMovie } from '@/lib/ServerSideUtilities';


export default function UpdateMovieComponent({ params }:any) {

    return (
        <div>
            <Form action={"create"} movieAction={sendCreateMovie}/>
        </div>
    )
}