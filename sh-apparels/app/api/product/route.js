import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// Move the URI definition outside the functions
const URI = process.env.MONGODB_URI;

export async function GET() {
    try {
        // Connect to the MongoDB cluster
        const client = await MongoClient.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // taking query from the url
        const query = { };
        // Make the appropriate DB calls

        const db = client.db('clothing-site');
        const collection = db.collection('products');
        const data = await collection.find(query).toArray();

        client.close();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return NextResponse.error('Internal Server Error', { status: 500 });
    }
}

export async function POST(request) {
    try {
        const client = await MongoClient.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = client.db('clothing-site');
        const collection = db.collection('products');

        // Assuming the incoming request has JSON data in the body
        const requestData = await request.json();

        // Insert the new data into the database
        const result = await collection.insertOne(requestData);

        client.close();

        // Return a success response with the inserted data
        return NextResponse.json({ success: true, insertedId: result.insertedId });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // If there's an error, return a 500 status with an empty response
        return NextResponse.error('Internal Server Error', { status: 500 });
    }
}

