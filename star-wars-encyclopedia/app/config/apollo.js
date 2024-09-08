import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri: "https://swapi.dev/api/",
});

const client = new ApolloClient({
  uri: restLink,
  cache: new InMemoryCache(),
});

export default client;
