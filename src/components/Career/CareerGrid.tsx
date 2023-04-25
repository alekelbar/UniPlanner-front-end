import { useContext } from "react";
import { careerPageContext } from "./context/careerContext";
import { Grid } from "@mui/material";
import { CareerCard } from "./CareerCard";



export const CareerGrid = () => {
  const { state: { careers } } = useContext(careerPageContext);

  return (
    <Grid container my={2} spacing={5} justifyContent='space-evenly'>
      {
        careers.map(career => (
          <Grid item xs={12} md={6} key={career._id}>
            <CareerCard career={career} />
          </Grid>
        ))
      }
    </Grid >
  );
};