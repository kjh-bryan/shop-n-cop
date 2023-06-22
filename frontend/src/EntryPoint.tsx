import SignInScreen from "./screens/SignInScreen";
import { registerRootComponent } from "expo";

const EntryPoint = () => {
    return (
        <SignInScreen/>
    );
};

export default registerRootComponent(EntryPoint);
