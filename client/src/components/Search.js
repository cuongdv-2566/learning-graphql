import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Link from './Link';

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
`;

function Search({ client }) {
  const [state, setState] = useState({ links: [], filter: '' });
  const _executeSearch = async () => {
    const { filter } = state;
    const result = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    });
    const links = result.data.feed.links;
    setState({ ...state, links });
  }
  const _handleOnChange = e => setState({ ...state, [e.target.name]: e.target.value });

  return (
    <div>
      <div>
        Search
        <input type='text' value={state.filter} name="filter" onChange={_handleOnChange} />
        <button onClick={_executeSearch}>OK</button>
      </div>
      {state.links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  );
}

export default withApollo(Search);
