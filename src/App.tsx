import "./App.css";
import { useState } from "react";

function App() {
  const [handlerToggle, setHandlerToggle] = useState(false);

  return <video src="/simple-example" controls />;
}

export default App;
