
import React from "react";
import { registerRootComponent } from "expo";
import SignInScreen from "./screens/SignInScreen";

const EntryPoint = () => {
  return (
    // put whatever screen you wanna see here
    <SignInScreen/>
  );
};


export default registerRootComponent(EntryPoint);

