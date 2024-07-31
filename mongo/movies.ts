import MongoConnection from "@/mongo/mongo_conn"
import { MongoClient, Collection, ObjectId, UpdateResult, InsertOneResult } from "mongodb";

const BATCH_SIZE = 10;

async function getMoviesColl(client: MongoClient):Promise<Collection> {
    await client.connect();
    const db = client.db('scott');
    const collection = db.collection('movies');
    return collection;
}

export async function getMovies(actualPage: number): Promise<Object>{
    const client: MongoClient = (await MongoConnection.getConnection()).getConn();
    try {
        const collection = await getMoviesColl(client);

        const cursor = await collection.find({}).sort({title:1}).skip(actualPage * BATCH_SIZE).limit(BATCH_SIZE);
        const nextCursor = await collection.find({}).sort({title:1}).skip((actualPage + 1) * BATCH_SIZE).limit(1);

        const docs = await cursor.toArray();
        const hasNext = await nextCursor.hasNext();

        return {docs, hasNext};
 
    } catch (err:any) {
        throw new Error(err);
    } finally {
        await client.close();
    }
}

export async function getMovie(_id: string): Promise<any> {
    const client: MongoClient = (await MongoConnection.getConnection()).getConn();
    try {
        const collection = await getMoviesColl(client);
        const doc = await collection.findOne({_id:new ObjectId(_id)});
        if (doc === null)
            throw new Error("Cannot get doc with id " + _id);
        
        return doc;
 
    } catch (err:any) {
        throw new Error(err);
    } finally {
        await client.close();
    }
}

export async function deleteMovie(_id: string): Promise<number> {
    const client: MongoClient = (await MongoConnection.getConnection()).getConn();
    try {
        const collection = await getMoviesColl(client);
        const res = (await collection.deleteOne({_id:new ObjectId(_id)})).deletedCount;
        return res;
 
    } catch (err:any) {
        throw new Error(err);
    } finally {
        await client.close();
    }
}

export async function updateMovie(_id: string, updateDoc: Object): Promise<UpdateResult> {
    const client: MongoClient = (await MongoConnection.getConnection()).getConn();
    try {
        const collection = await getMoviesColl(client);
        const res = (await collection.updateOne({_id:new ObjectId(_id)}, {$set: updateDoc}));
        return res;
 
    } catch (err:any) {
        throw new Error(err);
    } finally {
        await client.close();
    }
}

export async function createMovie(newMovie: Object): Promise<InsertOneResult> {
    const client: MongoClient = (await MongoConnection.getConnection()).getConn();
    try {
        const collection = await getMoviesColl(client);
        const res = (await collection.insertOne(newMovie));
        return res;
 
    } catch (err:any) {
        throw new Error(err);
    } finally {
        await client.close();
    }
}

export async function getRankPerYear(year:number) {
    const client: MongoClient = (await MongoConnection.getConnection()).getConn();
    try {
        const collection = await getMoviesColl(client);
        const res = (await collection.aggregate(
            [
                {$match: {year , gross : {$ne: null}}},
                {$sql:`select json_mergepatch(i.data, json {'rank': rank() over (order by i.data."gross" desc)}) 
                        from input i`},
                {$project: { rank: 1, year: 1, title: 1, gross: 1, "_id": 0 }},
                {$match: {rank : {$le : 10}}},
                {$sort: {rank: 1}}
            ]
        ));
        return await res.toArray();
 
    } catch (err:any) {
        throw new Error(err);
    } finally {
        await client.close();
    }
}