import * as React from "react";

import { ApolloConsumer, Query } from "react-apollo";
import { ApolloClient, gql } from "apollo-boost";
import { ApolloCache } from "apollo-cache";

interface BCState {
  beerId: string;
}

const SET_CURRENT_BEER_ID_MUTATION = gql`
  mutation SetCurrentBeerIdMutation($newBeerId: ID!) {
    setCurrentBeerId(beerId: $newBeerId) @client
  }
`;

const BEER_ID_QUERY = gql`
  query {
    currentBeerId @client
  }
`;

export default class BeerChooser extends React.Component<{}, BCState> {
  readonly state: BCState = {
    beerId: ""
  };

  onChangeBeerId = (e: React.SyntheticEvent<HTMLInputElement>) => this.setState({ beerId: e.currentTarget.value });

  onSelectBeer = (client: ApolloClient<any>) => {
    // does not work: // cache.writeData({ data: { currentBeerId: this.state.beerId.toUpperCase() } });
    // using the call above, the other component (BeerPage) does not get updated

    // works:
    client.mutate({
      mutation: SET_CURRENT_BEER_ID_MUTATION,
      variables: { newBeerId: this.state.beerId.toUpperCase() }
    });
    this.setState({ beerId: "" });
  };

  render() {
    const { beerId } = this.state;

    return (
      <Query query={BEER_ID_QUERY}>
        {({ client, data }) => {
          return (
            <div>
              <input value={beerId} onChange={this.onChangeBeerId} />
              <button onClick={() => this.onSelectBeer(client)}>Select</button>
              <p>Beer Id: ${JSON.stringify(data, undefined, 2)}</p>
            </div>
          );
        }}
      </Query>
    );
  }
}
