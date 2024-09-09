"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { useState } from "react";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => {
    const restLink = new RestLink({
      uri: "https://swapi.dev/api/",
    });

    return new ApolloClient({
      link: restLink,
      cache: new InMemoryCache(),
    });
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
