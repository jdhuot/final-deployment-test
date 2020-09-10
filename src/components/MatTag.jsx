import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';

// props.tag is a string that describes whichever tag was was clicked Ex: "outdoor", "hiking", "beginner"
// props.onClick is a function which will remove the tag component when it is clicked

export default function MatTag(props) {
  return (

    <p>{props.tag}<ClearIcon onClick={() => props.onClick}/></p>
  )
};