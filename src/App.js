import Content from "./components/Content/Content";
import { RaceProvider } from "./context/RaceContext";
import { Typography } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      {<Typography variant="h1">Entain Test</Typography>}
      <RaceProvider>
        <Content />
      </RaceProvider>
    </div>
  );
}

export default App;
