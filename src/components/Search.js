import React from 'react'
import { useQuery } from 'urql'
import gql from 'graphql-tag'
import Links from './Links'

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`


const Search = () => {
  const [filter, setFilter] = React.useState('')

  const [result, executeQuery] = useQuery({
      query: FEED_SEARCH_QUERY,
      variables: {filter},
      pause: false,
  })

  const search = React.useCallback(() => {
      executeQuery();

  }, [executeQuery]);
  const links = result.data ? result.data.feed.links : [];
  
  return (
    <div>
      <div>
        Search
        <input
          type='text'
          onChange={e => setFilter(e.target.value)}
        />
        <button onClick={search}>search</button>
      </div>
      {links.map((link, index) => (
        <Links key={link.id} link={link} index={index} />
      ))}
    </div>
  )
}

export default Search