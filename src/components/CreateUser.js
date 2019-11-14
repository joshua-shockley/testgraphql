import React from 'react'
import gql from 'graphql-tag';
import { useMutation } from 'urql';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
     token
    }
  }
`


const CreateUser = props => {
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  
  const [state, executeMutation] = useMutation(SIGNUP_MUTATION)

  const submit = React.useCallback(() => {
    executeMutation({name, email, password })
    .then(() => {
        props.history.push('/people');
        window.location.reload();
    
    })
  }, [executeMutation, name, email, password])

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          placeholder="User's name"
        />
        <input
          className="mb2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="User's Email"
        />
        <input
          className="mb2"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="User's password"
        />

      </div>
      <button 
        disabled={state.fetching}
        onClick={submit}>
        Submit
      </button>
    </div>
  )
}

export default CreateUser;