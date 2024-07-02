import Form from '@/components/form/Form';
import { sendMovieUpdated } from '@/lib/ServerSideUtilities';
import { getMovie } from '@/mongo/movies';


export default async function UpdateMovieComponent({ params }:any) {
    let doc = JSON.parse(JSON.stringify(await getMovie(params.id)));

    return (
        <div>
            <Form value={doc} _id={params.id} movieAction={sendMovieUpdated} action={"update"}/>
        </div>
    )
}