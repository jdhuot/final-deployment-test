import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 220,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MatMultiSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);



  const handleChange = (event) => {
    setPersonName(event.target.value);
    props.onChange(event);
  };
  
  // const handleChangeMultiple = (event) => {
  //   const { options } = event.target;
  //   console.log("options = ", options)
  //   console.log("Event.target.value = ", event.target.value)
  //   //const options = event.target.value
  //   const value = [];
  //   for (let i = 0, l = options.length; i < l; i += 1) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   console.log('value = ', value);
  //   setPersonName(value);
  //   props.onChange(event);
  // };

  return (
    <div>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">{props.inputLabel}</InputLabel>
        <Select
          displayEmpty
          //defaultValue={props.defaultValue}
          labelId={props.labelId}
          fullWidth={props.fullWidth}
          id={props.id}
          multiple={props.multiple}
          items={props.items}
          value={personName }
          // value={props.defaultValue ? props.defaultValue : personName }
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => {
            // if (selected.length === 0 && props.defaultValue) {
            // return <div className={classes.chips}>
            //           <Chip label={props.defaultValue} className={classes.chip} />
            //         </div>;
            // }
            if (typeof selected === 'object') {
              return (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )
            } else {
              return selected;
            }
          }}
          MenuProps={MenuProps}
        >
          {props.items.map((i) => (
            <MenuItem key={i} value={i} style={getStyles(i, personName, theme)} >
              {i}
            </MenuItem>
          ))}
        </Select>
        
      </FormControl>
    </div>
  );
}


// days: multi - select
// frequency: single - select
// timeframe: multi - select

// tags: multiValue
// search:multiValues