import React, { Suspense, lazy } from "react";
import PortalContract from './abis/portal.json';
import SurveyContract from './abis/survey.json';
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Box, Container } from "@material-ui/core";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Spinner from "./components/Spinner";
import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import SnackBar from "./components/SnackBar";
const LazyLanding = lazy(() => import("./components/common/Landing"));
const LazyPageNotFound = lazy(() => import("./components/common/PageNotFound"));
const LazyStudent = lazy(() => import("./components/student/Student"));

// componentDidMount = async () => {
//   try {
//     const web3Modal = new Web3Modal()
//     const connection = await web3Modal.connect()
//     const provider = new ethers.providers.Web3Provider(connection);
//     const add = '0x42Ab9DeB854F206e6943B7a6775A20e8bBFcC9B7';
//     const s = provider.getSigner();
//     const contract = new ethers.Contract(add, portal.abi, s);
//     console.log(contract);
//     const tx = await contract.id();

//     // Set web3, accounts, and contract to the state, and then proceed with an
//     // example of interacting with the contract's methods.

//   } catch (error) {
//     // Catch any errors for any of the above operations.
//     alert(
//       `Failed to load web3, accounts, or contract. Check console for details.`,
//     );
//     console.error(error);
//   }
// };

const App = () => {



  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AuthProvider>
          <SnackBar />
          <Box
            display="flex"
            flexDirection="column"
            className="App"
            style={{
              position: "relative",
              minHeight: "100vh"
            }}
          >
            <Box>
              <Header />
            </Box>
            <Box
              flexGrow={1}
              style={{ marginBottom: "auto", minHeight: "80vh" }}
            >
              <Suspense fallback={<Spinner />}>
                <Container>
                  <Switch>
                    {/* Common routes */}
                    <Route exact path="/" component={LazyLanding} />

                    {/* Student Routes */}
                    <Route path="/student" component={LazyStudent} />
                    {/* Faculty Routes */}

                    {/* not found route should always be last */}
                    <Route path="*" component={LazyPageNotFound} />
                  </Switch>
                </Container>
              </Suspense>
            </Box>
            <Box>
              <Footer />
            </Box>
          </Box>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
