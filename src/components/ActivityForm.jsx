import React, { useState } from 'react';
import MatInput from './MatInput';
import MatTextarea from './MatTextarea';
import axios from 'axios';
import MatButton from './MatButton';
import MatMultiValues from './MatMultiValues';
import MatMultiSelect from './MatMultiSelect';

export default function ActivityForm(props) {

  const [stateForm, setStateForm] = useState({
    activity_name: "",
    description: "",
    max_participants: 0,
    city: "",
    location: "",
    frequency: [],
    timeframe: [],
    days: [],
    skill_level: [],
    tags: [],
    logged_in_user_id: props.state.loggedIn
  });

  const create = function(stateForm) {
    console.log('inside create function');
    // update Activity participants, activity tags, activities 
    // need to put activity in the DB first so we can use the activity id to update the activity tags page and the activity participants page
    if (stateForm.activity_name &&
      stateForm.description &&
      stateForm.max_participants &&
      stateForm.city &&
      stateForm.frequency &&
      stateForm.timeframe &&
      stateForm.days &&
      stateForm.skill_level &&
      stateForm.tags &&
      stateForm.logged_in_user_id 
      ) {
      axios.post(`/api/activities`, {stateForm})
      .then((res) => {
        // console.log('res after new post: ', res.data);
        props.socket.send('update');
        props.setState(prev => { return {...prev, view: 'browse', refresh: prev.refresh += 1 }})
        // not sure why, but not getting a response back
      })
      .catch(err => console.log(err));
    }
    // setTimeout(() => {
    //   props.setState(prev => { return {...prev, view: 'browse', refresh: prev.refresh += 1 }})
    // }, 1000)    
  }

  return (
    <div>
      <h2 className="form-title">Create an Activity</h2>
      <form className="form activity-form" onSubmit={e => e.preventDefault()}>
        <MatInput
          required={true}
          onChange={event => setStateForm({...stateForm, activity_name: event.target.value, city: props.state.users[props.state.loggedIn - 1].city})} 
          label="activity_name" 
          value={stateForm.activity_name} variant="filled" 
          size="small" 
          fullWidth
          />
        <MatTextarea 
          required={true}
          onChange={event => setStateForm({...stateForm, description: event.target.value})} 
          label="description" 
          value={stateForm.description} 
          variant="filled" size="small" 
          fullWidth
          multiline
          rows={3}

          />
        <MatInput 
          required={true} 
          onChange={event => setStateForm({...stateForm, max_participants: event.target.value})} 
          label="max_participants"
          value={stateForm.max_participants}
          variant="filled" size="small"
          //fullWidth
          />
        <MatInput 
          required={false}
          onChange={event => setStateForm({...stateForm, location: event.target.value})} 
          label="location" 
          value={stateForm.location} 
          variant="filled" 
          size="small" 
          fullWidth
          />
        <div className="form-selects">
          <div>
            <MatMultiSelect 
              items={['One Time', 'Weekly', 'Bi-Weekly', 'Monthly']} 
              inputLabel="Frequency" 
              multiple
              fullWidth
              onChange={event => setStateForm({...stateForm, frequency: event.target.value})}
            />
            <MatMultiSelect 
              multiple
              items={['Morning', 'Daytime', 'Evening']} 
              inputLabel="Timeframe"
              onChange={event => setStateForm({...stateForm, timeframe: event.target.value})}
            />
          </div>
          <div>
            <MatMultiSelect 
              multiple
              items={['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']} 
              inputLabel="Days" 
              onChange={event => setStateForm({...stateForm, days: event.target.value})}
            />
            <MatMultiSelect 
              items={['Beginner', 'Intermediate', 'Advanced']} 
              inputLabel="Skill Level" 
              multiple
              onChange={event => setStateForm({...stateForm, skill_level: event.target.value})}
            />
          </div>
        </div>        
        <MatMultiValues
          options={props.state.tags}
          label="Searchable Tags" 
          placeholder="Select Searchable Tags"
          onChange={(event, values) => setStateForm({...stateForm, tags: values })} // COULD REVISIT, AND ALLOW NEW ACTIVITY POSTS TO PLOP ALL RELAENT INFO INTO TAGS (CURRENTLY NOT DOING THAT)
          />
        <div className="form-button-wrapper">
          <div>
            <MatButton 
              variant="outlined"
              color="secondary"
              onClick={() => props.setState(prev => ({...prev, view: 'browse'}))}
              >
              CANCEL
            </MatButton>
          </div>
          <div>
            <MatButton 
              variant="contained" 
              type="submit"
              color="primary"
              onClick={() => create(stateForm)}
              >
              CREATE
            </MatButton>
          </div>
        </div>

      </form>
    </div>
  )
};
