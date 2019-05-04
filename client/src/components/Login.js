import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Login({ history }) {
  const [state, setState] = useState({
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  });

  const _saveUserData = token => localStorage.setItem(AUTH_TOKEN, token);
  const _confirm = async data => {
    const { token } = state.login ? data.login : data.signup;
    _saveUserData(token);
    history.push('/');
  }
  const _handleOnChange = e => setState({ ...state, [e.target.name]: e.target.value });
  const _login = () => setState({ ...state, login: !state.login });

  return (
    <div>
      <h4 className="mv3">{state.login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!state.login && (
          <input value={state.name} onChange={_handleOnChange} type="text" placeholder="Your name" name="name" />
        )}
        <input value={state.email} onChange={_handleOnChange} type="text" placeholder="Your email address" name="email" />
        <input value={state.password} onChange={_handleOnChange} type="password" placeholder="Choose a safe password" name="password" />
      </div>
      <div className="flex mt3">
        <Mutation
          mutation={state.login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={state}
          onCompleted={data => _confirm(data)}
        >
          {mutation => (
            <div className="pointer mr2 button" onClick={mutation}>
              {state.login ? 'login' : 'create account'}
            </div>
          )}
        </Mutation>
        <div className="pointer button" onClick={_login}>
          {state.login ? 'need to create an account?' : 'already have an account?'}
        </div>
      </div>
    </div>
  );
};

export default Login;
