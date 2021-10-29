import Content from "./components/Content/Content";
import { RaceProvider } from "./context/RaceContext";

function App() {
  return (
    <div className="App">
      <RaceProvider>
        <Content />
      </RaceProvider>
    </div>
  );
}

export default App;
