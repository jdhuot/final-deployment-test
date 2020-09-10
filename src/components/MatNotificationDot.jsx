import React from 'react';
import { Chip } from '@material-ui/core';

//props.new_messages is a number that represents how many new messages have been sent since the last time a user open this chat 

export default function MatNotificationDot(props) {
  return (
    <Chip
      className="notification-dot"
      label={props.children}
      className={props.className}
    />
  )
};