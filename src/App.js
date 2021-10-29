import Content from "./components/Content/Content";
import { RaceProvider } from "./context/RaceContext";
import { Typography, Grid } from "@material-ui/core";

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {<Typography variant="h1" style={{ textAlign: "center", textDecoration: "underline" }}>Entain Test</Typography>}
      </Grid>
      <Grid item xs={12}>
        <RaceProvider>
          <Content />
        </RaceProvider>
      </Grid>
    </Grid>
  );
}

export default App;
