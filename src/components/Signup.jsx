import React, { useState } from 'react';
import MatInput from './MatInput';
import MatButton from './MatButton';
import Fade from 'react-reveal/Fade';

export default function Signup(props) {

  const avatars = [
    "https://www.spacercreative.com/wp-content/uploads/2020/09/001-running.png",
    "https://www.spacercreative.com/wp-content/uploads/2020/09/003-tennis.png",
    "https://www.spacercreative.com/wp-content/uploads/2020/09/004-soccer.png",
    "https://www.spacercreative.com/wp-content/uploads/2020/09/005-campfire.png",
    "https://www.spacercreative.com/wp-content/uploads/2020/09/006-football-field.png",
    "https://www.spacercreative.com/wp-content/uploads/2020/09/007-tent.png",
    "https://www.spacercreative.com/wp-content/uploads/2020/09/009-hot-air-balloon.png",
    "https://www.spacercreative.com/wp-content/uploads/2020/09/010-bicycle.png",
    "https://www.spacercreative.com/wp-content/uploads/2020/09/011-motorbike.png",
    "https://www.spacercreative.com/wp-content/uploads/2020/09/012-kite.png",
    "https://www.spacercreative.com/wp-content/uploads/2020/09/013-boat.png",
    "https://www.spacercreative.com/wp-content/uploads/2020/09/014-golf.png",
    "https://www.spacercreative.com/wp-content/uploads/2020/09/017-compass.png",
    "https://www.spacercreative.com/wp-content/uploads/2020/09/030-backpack.png"
  ];

  const [stateSignup, setStateSignup] = useState({
    name: "",
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
    city: "",
    email: "",
    password: ""
  });


  return (
    <div>
      <Fade top>
        <h2 className="form-title">Sign Up</h2>
      </Fade>
      <form className="form" onSubmit={e => e.preventDefault()}>
        <MatInput required={true} onChange={event => setStateSignup({...stateSignup, name: event.target.value})} label="Name" value={stateSignup.name} variant="filled" size="small" fullfullWidth={true} />
        <MatInput required={true} onChange={event => setStateSignup({...stateSignup, city: event.target.value})} label="city" value={stateSignup.city} variant="filled" size="small" fullfullWidth={true} />
        <MatInput required={true} onChange={event => setStateSignup({...stateSignup, email: event.target.value})} label="email" value={stateSignup.email} variant="filled" size="small" fullfullWidth={true} />
        <MatInput type="password" onChange={event => setStateSignup({...stateSignup, password: event.target.value})} label="Password" value={stateSignup.password} variant="filled" size="small" fullfullWidth={true} />
        <MatButton variant="contained" color="primary" type="submit" onClick={() => props.signup(stateSignup)}>SIGN UP</MatButton>
      </form>
    </div>
  )
};
