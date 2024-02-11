// Drinks.js
import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
} from "@mui/material";
// import DrinkDetail from "./components/DrinkDetail";

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const drink_api = "https://api.punkapi.com/v2/beers";

  const drinks_data_response = async () => {
    try {
      const drinks_data = await axios.get(`${drink_api}?per_page=10`);
      setDrinks(drinks_data.data);
      console.log(drinks_data.data)
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    drinks_data_response();
  }, []);

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Devil's Drinks Menu
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          Error fetching drinks data.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {drinks.map((drink) => (
            <Grid item key={drink.id} xs={12} sm={6} md={4}>
              <Card>
                <Link to={`/drinkdetail/${drink.id}`} style={{ textDecoration: "none" }}>
                  <CardMedia
                    component="img"
                    alt={drink.name}
                    height="200"
                    image={drink.image_url}
                    style={{ width: "100%" }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {drink.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {drink.description.slice(0, 10)}...
                    </Typography>
                    
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Route for DrinkDetail component */}
      {/* <Route path="/drinkdetail/:id" component={DrinkDetail} /> */}
    </Paper>
  );
}

export default Drinks;