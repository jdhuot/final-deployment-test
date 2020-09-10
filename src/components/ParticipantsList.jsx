import React, { useState, useEffect } from 'react';
import Participant from './Participant';

export default function ParticipantsList(props) {

  const [localState, setLocalState] = useState({
    accepted: false,
    pending: false
  })

  // let accepted = false;
  // let pending = false;

  useEffect(() => {
  // for (let i of props.state.activityParticipants) {
  //   if (i.activity_id === props.activity_id) {
  //     if (i.status === 'pending') {
  //       setLocalState(prev => { return {...prev, pending: true}});
  //     }
  //     if (i.status === 'accepted') {
  //       setLocalState(prev => { return {...prev, accepted: true}});
  //     }
  //   }
  // }

  if (props.state.activityParticipants.filter(part => part.activity_id === props.activity_id && part.status === 'pending').length > 0) {
    setLocalState(prev => { return {...prev, pending: true}});
  } else {
    setLocalState(prev => { return {...prev, pending: false}});
  }
  if (props.state.activityParticipants.filter(part => part.activity_id === props.activity_id && part.status === 'accepted').length > 0) {
    setLocalState(prev => { return {...prev, accepted: true}});
  } else {
    setLocalState(prev => { return {...prev, accepted: false}});
  }


  },[props.state.activityParticipants])

  return (
    <div>
      {(localState.accepted || localState.pending) &&
          <div className="participants-list">
            <div>
            {localState.accepted && <h3>Accepted Participants</h3>}
            </div>
              <ul>
                {props.state.activityParticipants.map(part => {
                  if (part.status === "accepted" && part.activity_id === props.activity_id) {
                    return (
                      <Participant
                        name={props.state.users[part.user_id - 1].name}
                        city={props.state.users[part.user_id - 1].city}
                        avatar={props.state.users[part.user_id - 1].avatar}
                        key={part.id}
                        status="accepted"
                        statusChangeFunction={props.statusChangeFunction}
                        activity_id={props.activity_id}
                        user_id={part.user_id}
                        state={props.state}
                        setState={props.setState}
                      />
                    )
                  }
                })}
              </ul>
            <div>
            {localState.pending && <h3>Pending Participants</h3>}
            </div>
              <ul>
                {props.state.activityParticipants.map(part => {
                  if (part.status === "pending" && part.activity_id === props.activity_id) {
                    return (
                      <Participant 
                        name={props.state.users[part.user_id - 1].name}
                        city={props.state.users[part.user_id - 1].city}
                        avatar={props.state.users[part.user_id - 1].avatar}
                        key={part.id}
                        status="pending"
                        cancelFunction={props.cancelFunction}
                        statusChangeFunction={props.statusChangeFunction}
                        activity_id={props.activity_id}
                        user_id={part.user_id}
                        state={props.state}
                        setState={props.setState}
                      />
                    )
                  }
                })}
              </ul>
          </div>
      }
    </div>
  )
};