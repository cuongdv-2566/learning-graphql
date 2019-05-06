import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { FEED_QUERY } from './LinkList';
import { LINKS_PER_PAGE } from '../constants';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

function CreateLink({ history }) {
  const [state, setState] = useState({
    description: '',
    url: '',
  });

  const _handleOnChange = e => setState({ ...state, [e.target.name]: e.target.value });

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={state.description}
          onChange={_handleOnChange}
          type="text"
          placeholder="A description for the link"
          name="description"
        />
        <input
          className="mb2"
          value={state.url}
          onChange={_handleOnChange}
          type="text"
          placeholder="The URL for the link"
          name="url"
        />
      </div>
      <Mutation
        mutation={POST_MUTATION}
        variables={state}
        onCompleted={() => history.push('/new/1')}
        update={(store, { data: { post } }) => {
          const first = LINKS_PER_PAGE;
          const skip = 0;
          const orderBy = 'createdAt_DESC';
          const data = store.readQuery({
            query: FEED_QUERY,
            variables: { first, skip, orderBy },
          });
          data.feed.links.unshift(post);
          store.writeQuery({
            query: FEED_QUERY,
            data,
            variables: { first, skip, orderBy },
          });
        }}
      >
        {postMutation => <button onClick={postMutation}>Submit</button>}
      </Mutation>
    </div>
  );
}

export default CreateLink;
