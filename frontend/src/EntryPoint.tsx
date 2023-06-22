import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { registerRootComponent } from "expo";

const EntryPoint = () => {
    return (
        <RegisterScreen/>
    );
};

export default registerRootComponent(EntryPoint);
