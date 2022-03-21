
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

import NewMeetupForm from "../../src/components/meetups/NewMeetupForm";

function NewMeetupPage() {
    const router = useRouter();

    async function addMeetupHandler(meetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);

        router.push('/');
    }

    return ( 
        <Fragment>
            <Head>
            <title>Add a new meetup</title>
            <meta 
                name='description'
                content='Add your own meetups'
            />
            </Head>
        <h1>Add New Meetup</h1>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
      
    );
}

export default NewMeetupPage;