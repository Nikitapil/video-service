import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import AuthModal from "./components/AuthModal.tsx";
import {ApolloProvider} from "@apollo/client";
import {client} from "./utils/apolloClient.ts";

function App() {

  return <>
    <ApolloProvider client={client}>
      <RouterProvider router={router}/>
      <AuthModal/>
    </ApolloProvider>
  </>
}

export default App
