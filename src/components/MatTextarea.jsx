import React from 'react';
import { TextField } from '@material-ui/core';

export default function MatTextarea(props) {
  return (
    <TextField onChange={props.onChange} multiline={props.multiline} variant={props.variant} label={props.label} rows={props.rows} defaultValue={props.defaultValue} />
  )
};