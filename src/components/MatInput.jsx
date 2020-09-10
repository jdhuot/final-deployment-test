import React from 'react';
import { TextField } from '@material-ui/core';

// props.label: a string of whatever label you want to appear over the Input, ex: "Name"
//props.required: a boolean, true if field is required, false if field is not required 
// ?? might need an ID prop?
// props.error toggles the error state
// props.helperText will display text to explain the errors 

export default function MatInput(props) {

  return (
  
    <TextField
    required={props.required}
    label={props.label}
    error={props.error}
    helperText={props.helperText}
    multiline={props.multiline}
    variant={props.variant}
    rows={props.rows}
    size={props.size}
    fullWidth={props.fullWidth}
    defaultValue={props.defaultValue}
    color={props.color}
    onChange={props.onChange}
    value={props.value}
    onBlur={props.onBlur}
    type={props.type}
  />
  )
};