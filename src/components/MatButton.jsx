import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

// link to the Material UI Icon Library: https://material-ui.com/components/material-icons/

export default function MatButton(props) {

  let icons = [
    DeleteIcon,
    SaveIcon,
    CancelIcon,
    CloseIcon,
    ArrowDropDownIcon,
    ArrowDropUpIcon,
    AddIcon,
    CheckCircleIcon,
    NotificationsActiveIcon,
    SendIcon
  ]

  // Conditionally set icon from parent props if startIcon or endIcon is set
  let EndIcon;
  let StartIcon;

  if (props.endIcon) {
    for (let i of icons) {
      if (i.displayName === props.endIcon) {
        EndIcon = i;
      }
    }
  } else if (props.startIcon) {
    for (let i of icons) {
      if (i.displayName === props.startIcon) {
        StartIcon = i;
      }
    }
  }

  // variant= outlined, contained
  // color= primary, secondary
  return (
  <Button fullWidth={props.fullWidth} component={props.component} onClick={props.onClick} size={props.size} endIcon={props.endIcon ? <EndIcon /> : false } startIcon={props.startIcon ? <StartIcon /> : false } variant={props.variant} color={props.color} disabled={props.disabled} disableElevation href={props.href} type={props.type}>{props.children}</Button>
  )
};