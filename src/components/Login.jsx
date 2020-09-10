import React, { useState } from 'react';
import MatInput from './MatInput';
import MatButton from './MatButton';
import Fade from 'react-reveal/Fade';

export default function Login(props) {

  const [stateLogin, setStateLogin] = useState({
    username: "",
    password: ""
  });


  return (
    <div>
      <Fade top>
       <h2 className="form-title">Login</h2>
      </Fade>
      <form className="form" onSubmit={e => e.preventDefault()}>
        <MatInput required={true} onChange={event => setStateLogin({...stateLogin, username: event.target.value})} label="Username" value={stateLogin.username} variant="filled" size="small" fullfullWidth={true} />
        <MatInput type="password" onChange={event => setStateLogin({...stateLogin, password: event.target.value})} label="Password" value={stateLogin.password} variant="filled" size="small" fullfullWidth={true} />
        <MatButton fullWidth variant="contained" color="primary" type="submit" onClick={() => props.login(stateLogin.username, stateLogin.password)}>LOGIN</MatButton>
      </form>
      <div className="signup-instead-wrapper">
        <p>Don't have an account?</p>
        <MatButton size="small" variant="outlined" color="primary" onClick={() => props.setState(prev => ({...prev, view: 'signup'}))}>Signup!</MatButton>
      </div>
    </div>
  )
};
