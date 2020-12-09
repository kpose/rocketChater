import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Loading from "./src/components/loading";
import { StoreProvider } from "./src/context/store";
import NavContainer from "./src/navigation";

export default function App() {
  return (
    <StoreProvider>
      <NavContainer />
      <Loading />
    </StoreProvider>
  );
}
