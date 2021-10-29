import React, { useContext, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Grid } from '@material-ui/core';
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import { RaceContext } from "../../context/RaceContext";

const Content = () => {
  // Getting Race data from context.
  const races = useContext(RaceContext);

  // Getting first 5 items from sorted races array.
  const fiveRaces = races.slice(0, 5);

  const [category, setCategory] = useState("");
  const [raceData, setRaceData] = useState([]);

  // For initial render checkign for empty array.
  const newRaceData = raceData.length > 0 ? raceData : fiveRaces;

  // Race categories.
  const categories = [
    {id: "9daef0d7-bf3c-4f50-921d-8e818c60fe61", value: "Greyhound Racing"},
    {id: "161d9be2-e909-4326-8c2c-35ed71fb460b", value: "Harness Racing"},
    {id: "4a2788f8-e825-4d36-9894-efd4baf1cfae", value: "Horse Racing"}
  ];

  const filteredCategories = categories.filter((el) => {
    return fiveRaces.some((f) => {
      return f.category_id === el.id;
    });
  });
  

  // Handle change of category select list.
  const handleChange = (event) => {
    setCategory(event.target.value);
    event.target.value === "" ? setRaceData(fiveRaces) : setRaceData(fiveRaces.filter(x => x.category_id === event.target.value));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Select
          value={category}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "data-testid": "select" }}
        >
          <MenuItem value="" data-testid="select-option">
            <em>All Categories</em>
          </MenuItem>
          {filteredCategories.map((item, index) => {
            return (
              <MenuItem inputProps={{ "data-testid": "select-option" }} value={item.id} key={index}>{item.value}</MenuItem>
            )
          })}
        </Select>
      </Grid>
      <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table aria-label="race table">
          <TableHead>
            <TableRow>
              <TableCell>Race Number</TableCell>
              <TableCell align="center">Meeting Name</TableCell>
              <TableCell align="center">Countdown</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newRaceData.map((race) => (
              <TableRow key={race.race_id}>
                <TableCell component="th" scope="row">
                  {race.race_number}
                </TableCell>
                <TableCell align="center">{race.meeting_name}</TableCell>
                <TableCell align="center">{<CountdownTimer time={race.advertised_start.seconds} />}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Content;
