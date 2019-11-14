import React from 'react'
import Link from './Link'
import { useQuery } from 'urql';
import gql from 'graphql-tag';


const FEED_QUERY = gql`
{
    feed{
        links{
            id
            createdAt
            description
            url
            postedBy{
                id
                name
            }
            votes{
                id
                user{
                    id
                }
            }
        }
    }
}
`

const LinkList = () => {
    const [result] = useQuery({ query: FEED_QUERY })
    const { data, fetching, error } = result
    
    if (fetching) return <div>Fetching Yo Shit!!</div>
    if (error) return <div>Error</div>
    
    console.log(error);

    const linksToRender = data.feed.links;
    
return(  
<div>
    {linksToRender.map((link,index) => <Link key={link.id} link={link} index={index} />)}
    
</div>
)
}

export default LinkList