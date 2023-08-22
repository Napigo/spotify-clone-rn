import { StatusBar } from "expo-status-bar";
import { ThemeContextProvider } from "./src/theme/ThemeProvider";
import { Provider } from "react-redux";
import { AppStore } from "./src/redux/app-store";
import { AppNavigation } from "./src/navigations";
import { AuthContainer } from "./src/containers/App";

export default function App() {
  return (
    <ThemeContextProvider>
      <StatusBar style="auto" />
      <Provider store={AppStore}>
        <AuthContainer>
          <AppNavigation />
        </AuthContainer>
      </Provider>
    </ThemeContextProvider>
  );
}
