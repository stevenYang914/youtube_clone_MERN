import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Subscriber(props) {
    const userTo = props.userTo;
    const userFrom = props.userFrom;

    const [SubscriberNumber, setSubscriberNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    const onSubscribe = () => {

        let subscribeVariables = {
            userTo: userTo,
            userFrom: userFrom
        }
        
        if (Subscribed) {
            axios.post('/api/subscribe/unSubscribe', subscribeVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscriberNumber(SubscriberNumber - 1)
                    setSubscribed(!Subscribed)
                } else {
                    alert("fail to unSubscribe")
                }
            })

        } else {
            axios.post('/api/subscribe/subscribe', subscribeVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscriberNumber(SubscriberNumber + 1)
                    setSubscribed(!Subscribed)
                } else {
                    alert("fail to subscribe")
                }
            })
        }
    }

    useEffect(() => {

        const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom }

        axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
        .then(response => {
            if (response.data.success) {
                //console.log(response.data.subscriberNumber)
                setSubscriberNumber(response.data.subscriberNumber)
            } else {
                alert("fail to get subscriber number")
            }
        })

        axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
        .then(response => {
            if (response.data.success) {
                //console.log(response.data.subscribed)
                setSubscribed(response.data.subscribed)
            } else {
                alert("fail to get subscribed information")
            }
        })

    }, [])

    return (
        <div>
            <button 
                onClick={onSubscribe}
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}` ,
                    borderRadius: '4px', color: 'white',
                    padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}
            >
                {SubscriberNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>


        </div>
    )
}

export default Subscriber