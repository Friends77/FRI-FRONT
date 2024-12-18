import { Outlet } from "react-router";
import "./App.css";
import AppInitializer from "@/components/appInitializer/AppInitializer";

function App() {
  return (
    <AppInitializer>
      <Outlet />
    </AppInitializer>
  );
}

export default App;
