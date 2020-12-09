import React, { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";
import Loading from "./src/components/loading";

import NavContainer from "./src/navigation";

export default function App() {
  return (
    <Fragment>
      <NavContainer />
      <Loading />
    </Fragment>
  );
}
