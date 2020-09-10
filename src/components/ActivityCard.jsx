import React, { useEffect, useState } from 'react';
import MatAvatar from './MatAvatar';
import MatButton from './MatButton';
import ParticipantsList from './ParticipantsList';
import axios from 'axios';
import classnames from 'classnames';
import Slide from 'react-reveal/Slide';

export default function ActivityCard(props) {
  // Set number of players message based on props.currentPlayers and props.numoOfParticipants
  console.log('activity card rendered');
  const [tagName, setTagName] = useState([{},{name: 'outdoor'}]);
  const [playerMessage, setPlayerMessage] = useState('');

  useEffect(() => {

    const fetchCount = function(id) {
      axios.get(`/api/ap_count?activity_id=${id}`)
      .then((response) => {
        let playerFraction = `${response.data[0].count} / ${props.numOfParticipants}`;
        if (response.data[0].count < props.numOfParticipants) {
          setPlayerMessage(prev => `Looking for ${props.numOfParticipants - response.data[0].count} more (${playerFraction} Filled)`);
        } else if (response.data[0].count >= props.numOfParticipants) {
          setPlayerMessage(prev => 'Filled')
        }
      })
    }
    fetchCount(props.id)
  },[props.state.activityParticipants]);

  useEffect(() => {
    
    const fetchTags = function(id) {
      axios.get(`/api/activity_tag_fetch?tags=${id}`)
      .then((response) => {
        //console.log(response);
        setTagName(response.data)
      })
    }
    fetchTags(props.id)

  }, []);

  const images = {
    spikeball: '../images/spikeball.png',
    tennis: '../images/tennis.jpeg',
    hiking: '../images/hiking.jpeg',
    badminton: '../images/badminton.jpeg',
    golf: '../images/golf.jpeg',
    biking: '../images/biking.jpeg',
    gaming: '../images/gaming.jpeg',
    'ping pong': '../images/pingpong.jpeg',
    billiards: '../images/pool.jpg',
    park: '../images/park.jpeg',
    recreation: '../images/park.jpeg',
    outdoor:'../images/park.jpeg',
    kayak: '../images/kayaking.jpeg',
    ski: '../images/skiing.jpeg',
    snowboarding: '../images/snowboarding.jpeg',
    volleyball: '../images/volleyball.jpeg',
    'bocce ball': '../images/bocce.jpeg',
    spalunking: '../images/spalunking.jpeg',
    'language practice': '../images/globe.jpeg',
    frisbee: '../images/frisbee.jpeg'
  }

  const ask = () => {
    // adds the user to the activity_participants table with a status of pending
    // in the request body pass along: logged in users id, and the id of the activity they are asking to join
    // console.log("Inside the ask function front end")
    axios.post(`/api/activity_participants`, {user_id: props.state.loggedIn, activity_id: props.id})
    .then(() => {
      props.socket.send({participant_id: props.state.loggedIn , activity_id: props.id, request_type: "ask"});
      props.setState(prev => ({...prev, view: 'browse', refresh: prev.refresh += 1}))
      props.socket.send('update');
    })
    .catch(err => console.log(err));
  };

  const message = () => {
    props.socket.send('update');
    props.setState(prev => ({...prev, view: 'chatcard', currentActivityId: props.id, currentChatRecipient: prev.users[prev.activities[props.id - 1].user_id - 1].id }));
  };

  const cancel = (userId, activityId) => {
    // cancels a pending request
    // deletes the entry into the activity participants table 
    // delete requests accept a path and an optional object where you can put information
    // put the user_id and activity_id in the optional object so we can use them in the db query?

    console.log("inside the cancel function front end")

    axios.delete(`/api/activity_participants?user_id=${userId}&activity_id=${activityId}`)
    .then(() => {
      props.socket.send('update');
      props.setState(prev => { return {...prev, refresh: prev.refresh += 1}})
    })
    .catch(err => console.log(err));

    // refresh the state after the axios request, don't change the view since we could cancel from either browse or from pending and we would just want to stay where we are 
  };

  const remove = (activityId) => {
    // remove the activity from the database 

    console.log("inside of the remove function front end")

    axios.delete(`/api/activities?activity_id=${activityId}`)
    .then(() => {
      props.socket.send('update');
      props.setState(prev => { return {...prev, refresh: prev.refresh += 1}})
    })
    .catch(err => console.log(err));
    
  };

  const statusChange = (userId, activityId, status) => {
    //used by the logged in user to remove themself from an activity where they are an accepted participant 
    // sets the user's status in the activity_participants table to null 
    //don't change the state since they could be in browse or in joined and we want them to stay where they are

    console.log("inside the leave function front end")

    axios.put(`/api/activity_participants?user_id=${userId}&activity_id=${activityId}&status=${status}`)
    .then(() => {
      props.socket.send('update');
      props.setState(prev => { return {...prev, refresh: prev.refresh += 1}})
    })
    .catch(err => console.log(err));
    
  };

  const viewChats = () => {
    props.setState(prev => { return {...prev, view: 'messages'}})
  };

  // const [pending, setPending] = useState(false);

  let hosted = props.hostId === props.state.loggedIn ? true : false;
  let pending = false;
  let joined = false;
  let filled = playerMessage === 'Filled' ? true : false;
  const filterParticipants = (userId, activityId) => {
    for (let i of props.state.activityParticipants) {
      if (activityId === i.activity_id && userId === i.user_id) {
        if (i.status === 'pending') {
          pending = true;
          // setPending(prev => true)
        }
        if (i.status === 'accepted') {
          joined = true;
        }
      }
    }
  }
  filterParticipants(props.state.loggedIn, props.id)

  for (let i of props.state.activityParticipants) {
    if (i.activity_id === props.id && i.user_id === props.state.loggedIn && i.status === "pending") {
      props.setPending(true)
      // props.socket.send('update');
    }
  }

  // const pickClass = classnames({'pending': props.pending}); // SEEMING SPOTTY AT BEST?

  const isHosted = () => {
    for(let i of props.state.activities) {
      if (props.state.loggedIn === i.user_id) {
      return false;
    } else {
      return true;
    }
  }
}
  const findImage = () => {
    for (let [keys, values] of Object.entries(images)) {
      for (let i of props.currentTagNames) {
        if ((keys !== 'outdoor' && keys !== 'recreation') && keys === i) {
          return values
        }
      }
    }
  }
  const filters = [
    'monday', 
    'tuesday', 
    'wednesday', 
    'thursday', 
    'friday', 
    'saturday', 
    'sunday',
    'morning', 
    'daytime', 
    'evening',
    'beginner', 
    'intermediate', 
    'advanced',
    'one time', 
    'weekly', 
    'bi-weekly', 
    'monthly'
  ]

  return (
    <Slide bottom>
    <div>
    {props.state.view === 'browse' && !filled &&
    <article className={pending ? 'pending' : ''}>
      <div>
        <div>
          {/* <img src={images[(tagName.length > 1 ? tagName[1].name : tagName[0].name)] || '../images/park.jpeg'} width="100%"></img> */}
          <img src={findImage() || '../images/park.jpeg'} width="100%"></img>
        </div>
        <div>
          <h3>{playerMessage}</h3>
          <ul>
            {tagName.map(tag => !filters.includes(tag.name) ? <li key={tagName.indexOf(tag)}>{tag.name}</li> : null)}
          </ul>
          <MatAvatar name={props.hostName} avatar={props.avatar} city={props.city} />
        </div>
      </div>
      <div>
      {props.state.view === 'hosted' && <div><MatButton size="small" variant="contained" onClick={() => props.setState(prev => {return {...prev, refresh: props.id, view: 'editform'}})}>Edit</MatButton></div>}
      {pending && <h2 className="request-sent">REQUEST SENT!</h2>}
        <h2>{props.name}</h2>
        <h5>Skill Level: {props.skillTag}</h5>
        <h5>Frequency: {props.frequency}</h5>
        <h5>Days: {props.days}</h5>
        <h5>Timeframe: {props.timeframe}</h5>
        {props.location && <h5>Location: {props.location}</h5>}
        <p>{props.description}</p>
        {props.state.view === 'browse' && !pending && !hosted && !joined &&
          <div>
            <MatButton variant="contained" color="primary" onClick={() => ask()}>Ask to Join</MatButton>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
          </div>
        }
        {joined && 
          <div>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
            <MatButton variant="contained" color="secondary" onClick={() => statusChange(props.state.loggedIn, props.id, "null")}>Leave</MatButton>
          </div>
        }
        {hosted && 
          <div>
            <MatButton variant="contained" color="primary" onClick={() => viewChats()}>View Chats</MatButton>
            <MatButton variant="contained" color="secondary" onClick={() => remove(props.id)}>Delete</MatButton>
          </div>
        }
        {pending &&
          <div>
          <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
          <MatButton variant="contained" color="secondary" onClick={() => cancel(props.state.loggedIn, props.id)}>Cancel</MatButton>
          </div>
        }
      </div>
    </article>
    }
    {props.state.loggedIn === props.hostId && props.state.view === 'hosted' &&
    <article className={props.pending ? 'pending' : ''}>
      {/* {isHosted() ? null : <h3>Looks like you dont have any hosted activities... <a onClick={() => props.setState(prev => {return {...prev, view: 'create'}})}>Yet?</a></h3>} */}
      <div>
        <div>
          <img src={findImage() || '../images/park.jpeg'} width="100%"></img>
        </div>
        <div>
          <h3>{playerMessage}</h3>
          <ul>
            {tagName.map(tag => !filters.includes(tag.name) ? <li key={tagName.indexOf(tag)}>{tag.name}</li> : null)}
          </ul>
          <MatAvatar name={props.hostName} avatar={props.avatar} city={props.city} />
        </div>
      </div>
      <div>
      <div><MatButton size="small" variant="outlined" onClick={() => props.setState(prev => {return {...prev, refresh: props.id, view: 'editform'}})} >Edit</MatButton></div>
        <h2>{props.name}</h2>
        <h5>Skill Level: {props.skillTag}</h5>
        <h5>Frequency: {props.frequency}</h5>
        <h5>Days: {props.days}</h5>
        <h5>Timeframe: {props.timeframe}</h5>
        {props.location && <h5>Location: {props.location}</h5>}
        <p>{props.description}</p>
          <div>
            <MatButton variant="contained" color="primary" onClick={() => viewChats()}>View Chats</MatButton>
            <MatButton variant="contained" color="secondary" onClick={() => remove(props.id)}>Delete</MatButton>
          </div>
      </div>
        <div className="participants-wrapper">
          <ParticipantsList state={props.state} setState={props.setState} activity_id={props.id} cancelFunction={cancel} statusChangeFunction={statusChange}/>
        </div>
    </article>
    }
    {joined && props.state.view === 'joined' &&
    <article className={props.pending ? 'pending' : ''}>
      {/* {isEmpty('accepted') ? null : <h3>It looks like you haven't joined any activities yet...</h3>} */}
      <div>
        <div>
          <img src={findImage() || '../images/park.jpeg'} width="100%"></img>
        </div>
        <div> 
          <h3>{playerMessage}</h3>
          <ul>
            {tagName.map(tag => !filters.includes(tag.name) ? <li key={tagName.indexOf(tag)}>{tag.name}</li> : null)}
          </ul>
          <MatAvatar name={props.hostName} avatar={props.avatar} city={props.city} />
        </div>
      </div>
      <div>
        <h2>{props.name}</h2>
        <h5>Skill Level: {props.skillTag}</h5>
        <h5>Frequency: {props.frequency}</h5>
        <h5>Days: {props.days}</h5>
        <h5>Timeframe: {props.timeframe}</h5>
        {props.location && <h5>Location: {props.location}</h5>}
        <p>{props.description}</p>
          <div>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
            <MatButton variant="contained" color="secondary" onClick={() => statusChange(props.state.loggedIn, props.id, "null")}>Leave</MatButton>
          </div>
      </div>
    </article>
    }
    
    {pending && props.state.view === 'pending' &&
    <article className={'pending'}>
      {/* {isEmpty('pending') && <h3>It looks like you don't have any pending activities yet...</h3>} */}
      <div>
        <div>
          <img src={findImage() || '../images/park.jpeg'} width="100%"></img>
        </div>
        <div>
         <h3>{playerMessage}</h3>
          <ul>
            {tagName.map(tag => !filters.includes(tag.name) ? <li key={tagName.indexOf(tag)}>{tag.name}</li> : null)}
          </ul>
          <MatAvatar name={props.hostName} avatar={props.avatar} city={props.city} />
        </div>
      </div>
      <div>
        <h2 className="request-sent">REQUEST SENT!</h2>
        <h2>{props.name}</h2>
        <h5>Skill Level: {props.skillTag}</h5>
        <h5>Frequency: {props.frequency}</h5>
        <h5>Days: {props.days}</h5>
        <h5>Timeframe: {props.timeframe}</h5>
        {props.location && <h5>Location: {props.location}</h5>}
        <p>{props.description}</p>
          <div>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
            <MatButton variant="contained" color="secondary" onClick={() => cancel(props.state.loggedIn, props.id)}>Cancel</MatButton>
          </div>
      </div>
    </article>
    }
  </div>
  </Slide>
  )
};