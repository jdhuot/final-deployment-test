import React, { useState } from 'react';
import MatInput from './MatInput';
import MatTextarea from './MatTextarea';
import axios from 'axios';
import MatButton from './MatButton';
import MatMultiValues from './MatMultiValues';
import MatMultiSelect from './MatMultiSelect';

// At this moment, the value of refresh will be equal to the activity id of whatever activity you are editing

export default function EditForm(props) {

    // make a function that finds the activity details from the state based on the activity id(the value of refresh)
    let activityToEdit = {};
    for (let activity of props.state.activities) {
      if (activity.id === props.state.refresh) {
        activityToEdit = activity;
        console.log("found the activity to edit! = ", activityToEdit);
      }
    }

  const [stateEdit, setStateEdit] = useState({
    activity_id: props.state.refresh,
    activity_name: activityToEdit.name,
    description: activityToEdit.description,
    max_participants: activityToEdit.num_of_participants,
    city: activityToEdit.city,
    location: activityToEdit.location,
    // frequency: [`${activityToEdit.frequency}`],
    frequency: activityToEdit.frequency.split(' '),
    timeframe: activityToEdit.timeframe.split(' '),
    days: activityToEdit.days_available.split(' '),
    skill_level: activityToEdit.skill_tag.split(' '),
    tags: [],
    logged_in_user_id: props.state.loggedIn,
    activity_id: props.state.refresh
  });



  const edit = function(stateEdit) {
    console.log('inside edit function');
    // update Activity participants, activity tags, activities 
    // need to put activity in the DB first so we can use the activity id to update the activity tags page and the activity participants page

      axios.put(`/api/activities?activity_id=${props.state.refresh}`, {stateEdit})
      .then(() => {
        // not sure why, but not getting a response back
      })
      .catch(err => console.log(err));
    setTimeout(() => {
      props.setState(prev => { return {...prev, view: 'hosted', refresh: prev.refresh += 1 }})
    }, 1000)    
  }

  console.log("the stateEdit is = ", stateEdit);

  return (
    <div>
      <h2 className="form-title">Edit Your Activity</h2>
      <form className="form activity-form" onSubmit={e => e.preventDefault()}>
        <MatInput 
          required={true}
          onChange={event => setStateEdit({...stateEdit, activity_name: event.target.value, city: props.state.users[props.state.loggedIn - 1].city})} 
          label="activity_name" 
          //value={stateEdit.activity_name} 
          variant="filled" 
          size="small" 
          fullfullWidth={true} 
          defaultValue={activityToEdit.name}
          />
        <MatTextarea 
          required={true}
          onChange={event => setStateEdit({...stateEdit, description: event.target.value})} 
          label="description" 
          //value={stateEdit.description} 
          variant="filled" 
          size="small" 
          fullfullWidth={true} 
          multiline
          defaultValue={activityToEdit.description}
          />
        <MatInput 
          required={true} 
          onChange={event => setStateEdit({...stateEdit, max_participants: event.target.value})} 
          label="max_participants"
          //value={stateEdit.max_participants}
          variant="filled" 
          size="small"
          fullfullWidth={true}
          defaultValue={activityToEdit.num_of_participants}
          />
        <MatInput 
          required={false}
          onChange={event => setStateEdit({...stateEdit, location: event.target.value})} 
          label="location" 
          //value={stateEdit.location} 
          variant="filled" 
          size="small" 
          fullfullWidth={true}
          defaultValue={activityToEdit.location}
          />
        <div className="form-selects">
          <div>
            <MatMultiSelect 
              items={['One Time', 'Weekly', 'Bi-Weekly', 'Monthly']} 
              inputLabel="Frequency" 
              multiple
              fullWidth
              onChange={event => setStateEdit({...stateEdit, frequency: event.target.value})}
              // defaultValue={[`${activityToEdit.frequency}`]}
            />

            <MatMultiSelect 
              items={['Morning', 'Daytime', 'Evening']} 
              inputLabel="Timeframe" 
              multiple
              fullWidth
              onChange={event => setStateEdit({...stateEdit, timeframe: event.target.value})}
              // defaultValue={[`${activityToEdit.timeframe}`]}
            />
            </div>
            <div>
              <MatMultiSelect 
                items={['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']} 
                inputLabel="Days" 
                multiple
                fullWidth
                onChange={event => setStateEdit({...stateEdit, days: event.target.value})}
                // defaultValue={[`${activityToEdit.days_available}`]}
                />
              <MatMultiSelect 
                items={['Beginner', 'Intermediate', 'Advanced']} 
                inputLabel="Skill Level" 
                multiple
                fullWidth
                onChange={event => setStateEdit({...stateEdit, skill_level: event.target.value})}
                // defaultValue={[`${activityToEdit.skill_tag}`]}
                />
            </div>
          </div>
        <MatMultiValues 
          options={props.state.tags} 
          label="Searchable Tags" 
          placeholder="Select Searchable Tags" 
          onChange={(event, values) => setStateEdit({...stateEdit, tags: values})}
          />
          <div className="form-button-wrapper">
            <div>
              <MatButton 
                variant="outlined"
                color="secondary"
                onClick={() => props.setState(prev => ({...prev, view: 'hosted'}))}
                >
                CANCEL
              </MatButton>
            </div>
            <div>
              <MatButton 
                variant="contained"
                type="submit"
                color="primary"
                onClick={() => edit(stateEdit)}
                >
                EDIT
              </MatButton>
            </div>
          </div>
      </form>
    </div>
  )
};
