import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method = 'POST') {
        const data = req.body;

        const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://Heidi:furious@cluster0.krkin.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollec = db.collection('meetups');

        const result = await meetupsCollec.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted!' });
    }
}

export default handler;