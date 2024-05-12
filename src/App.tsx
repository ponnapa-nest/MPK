import React from "react";
import RestaurantFinder from "./Component/RestaurantFinder";
import Header from "./Component/Header";
import Navbar from "./Component/Navbar";
import { Container, CssBaseline } from "@mui/material";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Navbar />
      <Container maxWidth="xl" sx={{background: "#F5F6F8"}}>
        <RestaurantFinder/>
      </Container>
    </>
  );
};

export default App;
