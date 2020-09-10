import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function MatRadioBox(props) {
  const options = props.options;


  return (
    
    <RadioGroup aria-label={props.category} name={props.category} value={props.value} onChange={props.handleChange}>
        {options.map((option) => 
          <FormControlLabel value={option} control={<Radio />} label={option} />
        )}
    </RadioGroup>
  
  );
};
