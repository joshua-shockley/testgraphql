import React from 'react'
import Person from './Person.js';
import { useQuery } from 'urql';
import gql from 'graphql-tag';


const ALLUSERS_QUERY = gql`
{
    allUsers{
        email
        name
        id
    }
}
`

const PersonList = () => {
    const [result] = useQuery({ query: ALLUSERS_QUERY })
    const { data, fetching, error } = result
    
    if (fetching) return <div>Fetching Yo Shit!!</div>
    if (error) return <div>Error getting your list of Persons</div>
    
    console.log(error);

    const personsToRender = data.allUsers;
    
return(  
<div>
    {personsToRender.map(person => <Person key={person.id} person={person} />)}
</div>
)
}

export default PersonList