import React from 'react'

const Person = ({ person }) => (
  <div>
    <div>
      {person.name}, ({person.email}), {person.id}  
      <button >delete person</button>
    </div>
  </div>
)

export default Person;