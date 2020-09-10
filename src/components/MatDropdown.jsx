import React from 'react';
import { TextField } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';


// will use dropdown for: skill level, frequency 

//props.label: a string that represents what you want the placeholder the dropdown to be
// props.options: an array of the strings you want to have as the options in the dropdown list 
// option refers to the option (as in state)

export default function MatDropdown(props) {
  const options = props.options

  const [name, setName] = React.useState('Cat in the Hat');
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <TextField
          id={props.id}
          type="select"
          select
          label={props.label}
          helperText={props.field}
          variant={props.variant}
          onChange={handleChange}
          value={name}
        >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
    </TextField>
  )
};


