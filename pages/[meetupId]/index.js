
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupDetail from "../../src/components/meetups/MeetupDetail";


function MeetupDetails(props) {
   
    return ( 
    <Fragment>
        <Head>
        <title>{props.meetupData.title}</title>
            <meta 
                name='description'
                content={props.meetupData.description}
            />
        </Head>
    <MeetupDetail
        image = {props.meetupData.image}
        title = {props.meetupData.title}
        address = {props.meetupData.address}
        description = {props.meetupData.description}
        />
    </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://Heidi:furious@cluster0.krkin.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollec = db.collection('meetups');

    const meetups = await meetupsCollec.find({}, {_id: 1}).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: {meetupId: meetup._id.toString()},
        })),
    };
}

export async function getStaticProps(context) {
    

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://Heidi:furious@cluster0.krkin.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollec = db.collection('meetups');

    const selectmeetup = await meetupsCollec.findOne({
        _id: ObjectId(meetupId),
    });

    client.close();


    return {
        props: {
            meetupData: {
                id: selectmeetup._id.toString(),
                title: selectmeetup.title,
                address: selectmeetup.address,
                image: selectmeetup.image,
                description: selectmeetup.description,
            },
        },
    };
}

export default MeetupDetails;