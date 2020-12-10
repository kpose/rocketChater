import React from "react";
import { Loading } from "./src/components";
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
