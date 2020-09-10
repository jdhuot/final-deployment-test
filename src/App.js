import React, { Fragment, Component, useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import SubNav from './components/SubNav';
import ActivityForm from './components/ActivityForm';
import Landing from './components/Landing';
import Signup from './components/Signup';
import ChatCard from './components/ChatCard';
import EditForm from './components/EditForm';

import { geolocated } from "react-geolocated";

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

const socket = io.connect('http://localhost:8080', {resource: '/nodejs/socket.io'});
// const socket = io.connect('http://localhost:3000')
// const socket = io('http://localhost', {path: '/nodejs/socket.io'})

const theme = createMuiTheme({
  palette: createPalette({
       primary: { main: '#576D5C' },// 
       secondary: { main: '#F7BD02' } // #f85466
 }),
  typography: {
    // Use the custom font instead of the default Roboto font.
    fontFamily: [
      'Lilita One',
      'Roboto',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});


export default function App(props) {

  const [state, setState] = useState({
    loggedIn: null,
    activities: [],
    filters: [],
    view: 'landing',
    messages: [],
    tags: [],
    activityParticipants: [],
    activityTags: [],
    users: [],
    refresh: 1,
    message: '',
    name: '',
    chat: [],
    currentActivityId: 0,
    currentChatRecipient: 0,
    messageNotification: []
  });

  // state.messages, state.activity_participants
  const onMessageSubmit = (e) => {
    e.preventDefault()
    const { name, message, loggedIn, currentChatRecipient, currentActivityId } = state;
    // let recipient = state.loggedIn === state.users[state.activities[state.currentActivityId - 1] -1] ? otherperson : state.users[state.activities[state.currentActivityId - 1] -1]
    socket.send({name, message, loggedIn, currentChatRecipient, currentActivityId, request_type: "newMessage"})
    // socket.send({participant_id: props.state.loggedIn , activity_id: props.id, request_type: "newMessage"});
    setState(prev => {return {...prev, message: '', name , refresh: prev.refresh+= 1 }})
  }

  const onTextChange = (value, inputName) => {
    setState(prev => { return {...prev, [inputName]: value}})
  }


  useEffect(() => {
    const promiseOne = axios.get('/api/users');
    const promiseTwo = axios.get('/api/activities');
    const promiseThree = axios.get('/api/activity_participants');
    const promiseFour = axios.get('/api/activity_tags');
    const promiseFive = axios.get('/api/tags');
    const promiseSix = axios.get('/api/messages');
    const promiseSeven = (state.loggedIn && state.users[state.loggedIn - 1] !== undefined) ? axios.get(`/api/activitiesSorted?city=${state.users[state.loggedIn - 1].city}`) : axios.get('/api/activities')
    // const promiseSeven = state.loggedIn ? axios.get(`/api/activitiesSorted?city=${state.users[state.loggedIn - 1].city}`) : axios.get('/api/activities')

    Promise.all([promiseOne, promiseTwo, promiseThree, promiseFour, promiseFive, promiseSix, promiseSeven])
    .then((arrayOfValues) => {
      let [usersData, activitiesData, activityParticipantsData, activityTagsData, tagsData, messagesData, activitiesSortedData ] = arrayOfValues;
      setState((prev) => {
        console.log('axios call');
        return ({...prev, users: usersData.data,
        activities: activitiesData.data,
        activityParticipants: activityParticipantsData.data,
        activityTags: activityTagsData.data,
        tags: tagsData.data,
        messages: messagesData.data,
        activitiesSorted: activitiesSortedData.data
        })
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }, [state.refresh]);



// NOT GEO LOGIN
  // const login = function(username) {
    
  //   for (let i of state.users) {
  //     // if (username.toLowerCase() === i.name.split(' ')[0].toLowerCase()) {
  //     if (username.toLowerCase() === i.email) {
  //       axios.get(`/api/activitiesSorted?city=${i.city}`)
  //       .then((response) => {
  //         setState(prev => { return {...prev, activitiesSorted: response.data, loggedIn: i.id, view: 'browse', refresh: prev.refresh += 1, name: prev.users[Number(i.id) - 1].name }});
  //       })
  //     }
  //   }
  // }

  // GEOBABY!! // uncomment to use this login for geolocation
  const login = function(username) {
    console.log('in login function')
    console.log('username', username)
    for (let i of state.users) {
      if (username.toLowerCase() === i.email) {

          axios.get('https://api.ipify.org')
          .then((res) => {
            console.log('ip? : ', res.data);
            axios.get(`http://api.ipstack.com/${res.data}?access_key=112f50c4f2e7f7869e3a2f40d9f6b430`) /// THIS IS OUR GEO, UNCOMMENT WHEN READY!!
            .then((res2) => {
              console.log('typeof something? : ', typeof res2.data.city);
              let tempCity;
              if (res2.data.city.split(' ').length > 1) {
                console.log('van? :', res2.data.city.split(' ')[1]);
                tempCity = res2.data.city.split(' ')[1]
              } else {
                tempCity = res2.data.city
              }
              axios.get(`/api/activitiesSorted?city=${tempCity}`)
              .then((response) => {
                setState(prev => { return {...prev, activitiesSorted: response.data, loggedIn: i.id, view: 'browse', name: prev.users[Number(i.id) - 1].name }});
              })
            })
          })
      }
    }
  }

  // GEO SIGNUP
  const signup = function(stateForm) {
    axios.post('/api/users', { stateForm })
    .then((newUser) => {

      axios.get('https://api.ipify.org')
      .then((ip) => {
        console.log('ip? : ', ip.data);
        axios.get(`http://api.ipstack.com/${ip.data}?access_key=112f50c4f2e7f7869e3a2f40d9f6b430`) /// THIS IS OUR GEO, UNCOMMENT WHEN READY!!
        .then((geoCity) => {
          console.log('typeof something? : ', typeof geoCity.data.city);
          let tempCity;
          if (geoCity.data.city.split(' ').length > 1) {
            console.log('van? :', geoCity.data.city.split(' ')[1]);
            tempCity = geoCity.data.city.split(' ')[1]
          } else {
            tempCity = geoCity.data.city
          }
          axios.get(`/api/activitiesSorted?city=${tempCity}`)
          .then((sortedActivities) => {
            setState(prev => { return {...prev, activitiesSorted: sortedActivities.data, loggedIn: newUser.data[0].id, view: 'browse', name: newUser.data[0].name }});
            axios.get('/api/users')
            .then((users) => {
              setState(prev => { return {...prev, users: users.data}});
              // socket.send('update'); // this sockets signup update buuuuut breaks signup geo
            })
          })
        })
      })
    })
  }


  // REGULAR SIGNUP
  // const signup = function(stateForm) {
  //   axios.post('/api/users', { stateForm })
  //   .then((response) => {
  //     const city = response.data[0].city
  //     axios.get(`/api/activitiesSorted?city=${city[0].toUpperCase() + city.substring(1)}`)
  //     .then((response2) => {
  //       setState(prev => ({...prev, activitiesSorted: response2.data, loggedIn: response.data[0].id, view: 'browse', name: response.data[0].name }));
  //     })
  //   })
  // }


  useEffect(() => {
    // console.log('whats our state? beginning of useEffect', state);
    setState(prev => ({...prev, refresh: prev.refresh += 1 }))
    socket.on('message', (message) => {
      // console.log('message in App.js = ', message);
      if (message === 'update') {
        
        setState(prev => ({...prev, refresh: prev.refresh += 1 }))
      } 
      if (message.request_type === 'ask') {
            setState(prev => {
              if (prev.loggedIn === prev.users[prev.activities[message.activity_id - 1].user_id - 1].id) {
                return { ...prev, refresh: prev.refresh += 1, messageNotification: [...prev.messageNotification, {activity_id: message.activity_id, participant_id: message.participant_id, request_type: message.request_type}] }
              }
              return prev
            })
          
      }
      if (message.request_type === 'newMessage') {
        
        setState(prev => {
          if ((prev.view !== 'chatcard' || (prev.view === 'chatcard' && message.currentActivityId !== prev.currentActivityId)) && (prev.loggedIn === message.loggedIn || prev.loggedIn === message.currentChatRecipient)) {
            // if you are the host and the message isn't from you
            // console.log("first half of the condition = ", (prev.loggedIn === prev.users[prev.activities[message.currentActivityId - 1].user_id - 1].id))
            // console.log("second half of the condidtion = ", (prev.loggedIn !== message.loggedIn))
            if ((prev.loggedIn === prev.users[prev.activities[message.currentActivityId - 1].user_id - 1].id) && (prev.loggedIn !== message.loggedIn)) {
              // console.log("you are the host and the message isn't from you")
              return { ...prev, refresh: prev.refresh += 1, messageNotification: [...prev.messageNotification, {activity_id: message.currentActivityId, participant_id: message.loggedIn, request_type: message.request_type}] }
              //if you're not the host and the message is from the host
            }
            if ((prev.loggedIn !== prev.users[prev.activities[message.currentActivityId - 1].user_id - 1].id) && (prev.users[prev.activities[message.currentActivityId - 1].user_id - 1].id === message.loggedIn)) {
              // console.log('youre not the host and the message is from the host')
              return { ...prev, refresh: prev.refresh += 1, messageNotification: [...prev.messageNotification, {activity_id: message.currentActivityId, participant_id: message.loggedIn, request_type: message.request_type}] }
            }
          }
          return { ...prev, refresh: prev.refresh += 1}
        })
      
      } 
    })
  }, [])



  return(
    <ThemeProvider theme={theme}>
      <NavBar className='navbar' loggedIn={state.loggedIn} setState={setState} state={state} login={login}/>
      <main className="activity-views">
        {state.view === "landing" &&
            <Landing setState={setState} state={state} />
            }
        {state.view === "signup" &&
            <Signup setState={setState} state={state} signup={signup} />
            }
        {state.view === "login" &&
            <Login setState={setState} state={state} login={login} />
            }
        {state.view === "browse" &&
            <SubNav setState={setState} state={state} socket={socket}/>
            }
        {state.view === "joined" &&
            <SubNav setState={setState} state={state} socket={socket}/>
            }
        {state.view === "hosted" &&
            <SubNav setState={setState} state={state} socket={socket}/>
            }
        {state.view === "pending" &&
            <SubNav setState={setState} state={state} socket={socket}/>
            }
        {state.view === "create" &&
            <ActivityForm setState={setState} state={state} socket={socket} />
            }
        {state.view === "messages" &&
            <SubNav setState={setState} state={state} socket={socket}/>
            }
        {state.view === "editform" &&
            <EditForm setState={setState} state={state} />
            }
        {state.view === "chatcard" &&
            <ChatCard setState={setState} state={state} onMessageSubmit={onMessageSubmit} onTextChange={onTextChange} />
            }
        </main>
      <Footer />
    </ThemeProvider>
  )
}



// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

{/* <Fragment>
<NavBar loggedIn={state.loggedIn} setState={setState} state={state}/>
<Login setState={setState} state={state} />
<Router>
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/MatButton">MatButton</Link>
        </li>
      </ul>
    </nav>
    {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
//     <Switch>
//       <Route path="/MatButton">
//         <MatButton variant="contained" href="#" startIcon="SaveIcon" color="accent" >Push me</MatButton>
//       </Route>
//       <Route path="/MatInput">
//         <MatInput required={true} label="Name" variant="filled"/>
//     </Switch>
//   </div>
// </Router>
// <Footer />
// </Fragment> */}

