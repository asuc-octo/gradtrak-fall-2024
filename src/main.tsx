import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import App from "./App.tsx";
import "./index.css";

import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const client = new ApolloClient({
  uri: 'https://stanfurdtime.com/api/graphql',
  cache: new InMemoryCache()
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
		{/* <Provider store={store}> */}
      <StrictMode>
        <Theme>
          <App />
        </Theme>
      </StrictMode>
    {/* </Provider> */}
	</ApolloProvider>
);
