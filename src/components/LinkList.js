import React from 'react'
import Links from './Links'
import { useQuery } from 'urql';
import gql from 'graphql-tag';


const FEED_QUERY = gql `
query FEEDQUERY($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
        count
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

const LinkList = (props) => {
        const isNewPage = props.location.pathname.includes('new');

        const page = parseInt(props.match.params.page, 10);

//in variables this sets the total viewed on the page to 10 at a time

        const variables = React.useMemo(() => ({
            Skip: isNewPage ? (page - 1) * 10 : 0,
            first: isNewPage ? 10 : 100,
            orderBy: isNewPage ? 'createdAt_DESC' : null
        }), [isNewPage, page])

        const [result] = useQuery({ query: FEED_QUERY, variables })
        const { data, fetching, error } = result


                
        const pageIndex = isNewPage ? (page - 1) *10 : 0;
// for const nextPage dependency array remove .feed.count or it will error out and wont render the page at all....
        const nextPage = React.useCallback(() => {
            if (page <= data.feed.count / 10) {
                console.log(data);
              props.history.push(`/new/${page + 1}`);
            }
          }, [props.history, data, page]);

        const previousPage = React.useCallback(() => {
                if(page > 1){
                    props.history.push(`/new/${page - 1}`);
                }
            },
            [props.history, page]
        );

        const linksToRender = React.useMemo(() => {
            if(!data) {
                return [];
            }else if(isNewPage){
                return data.feed.links;
            }else{
                const rankedLinks = data.feed.links
                .slice()
                .sort((l1,l2) => l2.votes.length - l1.votes.length);
                return rankedLinks;
            }
        }, [data, isNewPage]);

        if (fetching) return <div > Fetching Yo Shit!! </div>
        if (error) return <div> Error </div>

        console.log(error);


        return ( 
            <React.Fragment>
            <div> 
            {linksToRender.map((link, index) => (
                <Links key = { link.id }
                link = { link }
                index = { pageIndex + index } 
                />
            ))}
            </div>
            {isNewPage && (
            <div className="flex ml4 mv3 gray">
            <div className="pointer mr2" onClick={previousPage}>
                Previous
            </div>
            <div className="pointer" onClick={nextPage}>
                Next
            </div>
            </div>
             )}
            </React.Fragment>
        )
}

                export default LinkList