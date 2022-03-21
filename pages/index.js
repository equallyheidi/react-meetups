import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../src/components/meetups/MeetupList';
import { Fragment } from 'react';

function HomePage(props) {
    return (
    <Fragment>
        <Head>
            <title>Meetups</title>
            <meta 
            name='description'
            content='Browse a list of meetups'
            />
        </Head>
        <MeetupList meetups={props.meetups} />;
    </Fragment>
    );
    
}

/* export async function getServerSideProps(context) {
    const req = context.req;

    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    };
}
 */

export async function getStaticProps() {

    MongoClient.connect();
    const client = await MongoClient.connect('mongodb+srv://Heidi:furious@cluster0.krkin.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollec = db.collection('meetups');

    const meetups = await meetupsCollec.find().toArray();
    client.close();

    return {
       props: {
           meetups: meetups.map(meetup => ({
               title: meetup.title,
               address: meetup.address,
               image: meetup.image,
               id: meetup._id.toString(),
           })),
        },
        revalidate: 1
    };
}

export default HomePage;