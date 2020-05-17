import React from "react";
import "./App.css";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import ChatContainer from "./containers/ChatContainer";
import Provider from "./contexts/DataStore";

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
