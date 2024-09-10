import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import AuthModal from "./components/AuthModal.tsx";
import {ApolloProvider} from "@apollo/client";
import {client} from "./utils/apolloClient.ts";
import {useGeneralStore} from "./stores/generalStore.ts";

function App() {
  const isLoginOpen = useGeneralStore(state => state.isLoginOpen)

  return <>
    {<ApolloProvider client={client}>
      <RouterProvider router={router}/>
      {isLoginOpen && <AuthModal/>}
    </ApolloProvider>}
  </>
}

export default App
