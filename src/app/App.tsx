import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export default function App() {
  console.log("App component loaded");
  try {
    return <RouterProvider router={router} />;
  } catch (error) {
    console.error("Error in App:", error);
    return <div>Error loading app: {String(error)}</div>;
  }
}