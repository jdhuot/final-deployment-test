import React from 'react';
import MatButton from './MatButton';
export default function Landing(props) {

  return (
    <div className="landing-wrapper">
      <section className="hero">
        <div className="hero-overlay">
          <div>
            <h1>Join and Host Fun Group Activities!</h1>
          </div>
          <div>
            <span></span>
            <h5> WeGO brings people together to do the things they love! 
              <br></br>
              <br></br>
              Can't find what you love? 
              <br></br>
              <br></br>
              Host an activity and introduce people to something new. 
            </h5>
          </div>
        </div>
      </section>
      <section className="categories-wrapper">
        <h3>ADVENTURE</h3>
        <h3>REC SPORTS</h3>
        <h3>ONLINE GAMES</h3>
        <h3>SEASONAL</h3>
      </section>
      <section className="process-wrapper">
        <h2>How It Works</h2>
        <div>
          <article>
            <h3>Step</h3>
            <h2 className="circle">1</h2>
            <p>Sign up to see what's happening!</p>
          </article>
          <article>
            <h3>Step</h3>
            <h2 className="circle">2</h2>
            <p>Join an activity to try something new. Host an activity to find others who share your interest.</p>
          </article>
          <article>
            <h3>Step</h3>
            <h2 className="circle">3</h2>
            <p>GO do something fun!</p>
          </article>
          <MatButton variant="contained" color="primary" size="large" onClick={() => props.setState({...props.state, view:"signup"})}>SIGNUP TODAY!</MatButton>
        </div>
      </section>
      <section className="sample-wrapper">
        <div className="sample-image"></div>
        <div>
          <h2>Browse from a plethora of awesome activities!</h2>
          <p>WeGo has something for everyone. 
            <br></br>
            <br></br>

            Outdoor Adventures?
            Book Club?
            Rec Sports?
            Online Gaming?
            Snow Sports? 
            
            <br></br>
            <br></br>
            Whatever you love you can find it on WeGo, and if you don't, you can host it!
          </p>
        </div>
      </section>
      <section className="cta-wrapper">
        <h4>Two Users Worldwide!</h4>
        <div>
          <h3>Meet New People</h3>
          <h3>Get Active</h3>
          <h3>Try Something New</h3>
        </div>
        <MatButton variant="contained" color="secondary" size="large" onClick={() => props.setState({...props.state, view:"signup"})}>SIGNUP TODAY!</MatButton>
      </section>
    </div>
  )
};