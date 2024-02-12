// Drinks.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

// Component function to display a list of drinks
function Drinks() {
  // State variables for managing drinks data, loading state, and error state
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // API endpoint for drinks data
  const drink_api = "https://api.punkapi.com/v2/beers";

  // Function to fetch drinks data from the API
  const drinks_data_response = async () => {
    try {
      // Fetching drinks data from the API and updating state
      const drinks_data = await axios.get(`${drink_api}?per_page=10`);
      setDrinks(drinks_data.data);
      console.log(drinks_data.data);
    } catch (err) {
      // Handling error in case of API request failure
      console.error(err);
      setError(true);
    } finally {
      // Marking the loading state as false after API request completion
      setLoading(false);
    }
  };

  // useEffect hook to trigger the API request on component mount
  useEffect(() => {
    drinks_data_response();
  }, []);

  return (
    // Container Paper for the drinks component
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      {/* Header Typography for the drinks component */}
      <Typography variant="h4" gutterBottom>
        Devil's Drinks Menu
      </Typography>

      {/* Conditional rendering based on loading and error states */}
      {loading ? (
        // Display a loading spinner if data is still loading
        <CircularProgress />
      ) : error ? (
        // Display an error message if there's an issue fetching data
        <Typography variant="body1" color="error">
          Error fetching drinks data.
        </Typography>
      ) : (
        // Display a grid of drink cards once data is loaded
        <Grid container spacing={2}>
          {drinks.map((drink) => (
            // Individual drink card within the grid
            <Grid item key={drink.id} xs={12} sm={6} md={4}>
              {/* Link to navigate to the drink details page */}
              <Card>
                <Link
                  to={`/drinkdetail/${drink.id}`}
                  style={{ textDecoration: "none" }}
                >
                  {/* Drink image and details within the card */}
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
                      {/* Displaying a truncated version of the drink description */}
                      {drink.description.slice(0, 10)}...
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
}

// Exporting the Drinks component as the default export
export default Drinks;
