import React from "react";
import "../css/App.css";
import Provider from "../contexts/DataStore";
import ChatContainer from "./ChatContainer";

function App() {
  return (
    <Provider>
      <div className="container">
        <ChatContainer />
      </div>
    </Provider>
  );
}

export default App;
