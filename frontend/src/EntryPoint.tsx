import { registerRootComponent } from "expo";
import { Navigation } from "./navigation/StackNavigator";

const EntryPoint = () => {
  return (
    <>
      <Navigation />
    </>
  );
};


export default registerRootComponent(EntryPoint);
