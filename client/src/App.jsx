import { RouterProvider } from "react-router-dom";
import AppRouter from "./Router/AppRouter";

function App() {
  return <RouterProvider router={AppRouter}></RouterProvider>;
}

export default App;
