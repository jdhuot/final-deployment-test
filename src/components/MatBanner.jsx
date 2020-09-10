import React, { useEffect, useState } from 'react';
import MatButton from './MatButton';

export default function MatBanner(props) {

  const [localState, setLocalState] = useState(0)

    // find the activity id of all activities hosted by then logged in user, make an array 
    //loop through the state.messageNotifications array
    // if the activity id of the messageNotification Object matches any of the id's of the hosted activities then create a MenuItem that says "New join request in your activity: activity Name (get this from the activity id)"

  //   let activitiesHosted = [];

  //   const findActivitiesHosted = () => {
  //     for (let each of props.state.activityParticipants) {
  //       if (props.state.loggedIn === each.user_id && each.status === 'host') {
  //         activitiesHosted.push(each.activity_id);
  //       }
  //     }
  //   }

  // const activities = () => {
  //   console.log('activity function is running')
  //   activitiesHosted.map(activity => {
  //     console.log('activitesHosted is getting mapped')
  //     //console.log("messageNotification state in loos = ", props.state.messageNotification)
  //     return props.state.messageNotification.map(notification => {
  //       if (activity === notification.activity_id) {
  //         //console.log('the match was made')
  //         return (<MenuItem onClick={handleClose2(activity, notification.participant_id)}>You have a new participant request in {props.state.activities[activity - 1].name}!</MenuItem>)
  //       }
  //     })
  //   })
  // }

  // useEffect(() => {

  //   setLocalState(prev => prev += 1);
      
  // },[props.state.messageNotification])


   
  return (
    <div className="notification-menu">
      {(props.state.messageNotification.length > 0 && props.state.messageNotification[0].request_type === 'ask') &&
      <div>
        <h5>You have a join request </h5>
        <MatButton size="small" startIcon="NotificationsActiveIcon" aria-controls="simple-menu" aria-haspopup="true" onClick={() => props.setState(prev => ({...prev, view: 'hosted', messageNotification: [] , filters: []}))}>View Now</MatButton>
      </div>
      }
      {(props.state.messageNotification.length > 0 && props.state.messageNotification[0].request_type === 'newMessage') &&
      <div>
        <h5>You have a new chat notification</h5>
        <MatButton size="small" startIcon="NotificationsActiveIcon" aria-controls="simple-menu" aria-haspopup="true" onClick={() => props.setState(prev => ({...prev, view: 'messages', filters: []}))}>View Now</MatButton>
      </div>
      }
    </div>
  );
}