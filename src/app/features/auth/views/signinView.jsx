import React from 'react';
import { Link } from 'react-router-dom';
import AuthContextProvider, { AuthContext } from '../contexts/authContext';
import '../stylesheets/signin.scss';

const SignInView = () => {

  return (
    <AuthContextProvider>
      <div id="signin-page">
        <div className="custom-card signin-box">
          <div className="form-container">
            <h1>Welcome Back!</h1>
            <form action="#">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className='form-control' />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className='form-control' />
              </div>
            </form>
            <AuthContext.Consumer>{ context => {
              const { submitSignIn } = context 

              return (
                <button className="btn btn-dark" onClick={submitSignIn}>Sign In</button>
              )
            }}</AuthContext.Consumer>
          </div>
        </div>
      </div>
    </AuthContextProvider>
  )
}

export default SignInView;