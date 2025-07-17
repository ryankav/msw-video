import "./App.css";
import { useState } from "react";
import { Root, Thumb } from "@radix-ui/react-switch";

function App() {
  const [handlerToggle, setHandlerToggle] = useState(false);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label
          className="Label"
          htmlFor="partial-content-src"
          style={{ paddingRight: 15 }}
        >
          Partial content source
        </label>
        <Root
          checked={handlerToggle}
          onCheckedChange={() => setHandlerToggle((prev) => !prev)}
          className="SwitchRoot"
          id="partial-content-src"
        >
          <Thumb className="SwitchThumb" />
        </Root>
      </div>
      {handlerToggle ? (
        <video src="/example" crossOrigin="anonymous" controls />
      ) : (
        <video src="/simple-example" controls />
      )}
    </>
  );
}

export default App;
