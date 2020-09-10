import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ActivityList from './ActivityList';
import MatMultiValues from './MatMultiValues'
import MatMultiSelect from './MatMultiSelect'
import MessageDashboard from './MessageDashboard';
import axios from 'axios';
import Fade from 'react-reveal/Fade';


export default function SubNav(props) {

  //determine what the heading should be
   //determine the index of which tab to set as the default
  // view: ‘signin’ | landing (login, browse, create, joined, hosted, pending, messages, chat)
  // !!!!!! eventually the first criteria should be set to Browse, not to Landing!!!!!
  let subNavHeading = '';
  let viewIndex;
  if (props.state.view === 'browse') {
    subNavHeading = "All Activities"
    viewIndex = 0;
  } else if (props.state.view === 'hosted'){
    subNavHeading = "Hosted Activities"
    viewIndex = 1;
  } else if (props.state.view === 'joined'){
    subNavHeading = "Joined Activities"
    viewIndex = 2;
  } else if (props.state.view === 'pending'){
    subNavHeading = "Pending Activities"
    viewIndex = 3;
  } else if (props.state.view === 'messages'){
    subNavHeading = "All Messages"
    viewIndex = 4;
  }

  const [value, setValue] = React.useState(viewIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      props.setState({...props.state, view: 'browse'});
    } else if (newValue === 1) {
      props.setState({...props.state, view: 'hosted', filters: []});
    } else if (newValue === 2) {
      props.setState({...props.state, view: 'joined', filters: []});
    } else if (newValue === 3) {
      props.setState({...props.state, view: 'pending', filters: []});
    } else if (newValue === 4) {
      props.setState({...props.state, view: 'messages', filters: []});
    }
  };

  const changeCity = (e) => {
    axios.get(`/api/activitiesSorted?city=${e.target.value}`)
    .then((response) => {
      props.setState(prev => ({...prev, activitiesSorted: response.data}));
    })
  }

  const cityArray = [];
  for (let i of props.state.users) {
    if (!cityArray.includes(i.city[0].toUpperCase() + i.city.substring(1))) {
      cityArray.push(i.city[0].toUpperCase() + i.city.substring(1))
    }
  }
  console.log('cityArray', cityArray);

  return (
    <div className="subnav-wrapper">
    <Fade bottom>
      <h2>{subNavHeading}</h2>
    </Fade>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs">
        <Tab label="Browse" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
        <Tab label="Hosted" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
        <Tab label="Joined" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
        <Tab label="Pending" id="simple-tab-3" aria-controls="simple-tabpanel-3" />
        <Tab label="Messages" id="simple-tab-4" aria-controls="simple-tabpanel-4" />
      </Tabs>
      <div>
        {value === 0 &&
        <div>
          <div className="search-wrapper">
            <MatMultiValues 
              options={props.state.tags} 
              label="Search Activities"
              placeholder="What do you want to do?"
              onChange={(event, values) => props.setState(prev => ({...prev, filters: values }))}/>
            <MatMultiSelect inputLabel="Change City" items={cityArray} onChange={(e) => changeCity(e)}/>
          </div>
          <ActivityList setState={props.setState} state={props.state} socket={props.socket} />
        </div>}
        {value === 1 && <div><ActivityList setState={props.setState} state={props.state} socket={props.socket} /></div>}
        {value === 2 && <div><ActivityList setState={props.setState} state={props.state} socket={props.socket} /></div>}
        {value === 3 && <div><ActivityList setState={props.setState} state={props.state} socket={props.socket} /></div>}
        {value === 4 && <div><MessageDashboard setState={props.setState} state={props.state} socket={props.socket} /></div>}       
      </div>
    </div>
    
  );
}