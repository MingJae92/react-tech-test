// DrinkDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";

function DrinkDetail() {
  // State variables to manage drink details, loading, and error
  const [drinkDetail, setDrinkDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get drink id from URL parameters
  const { id } = useParams();
  // API endpoint for fetching drink details
  const drinkDetailsApi = `https://api.punkapi.com/v2/beers/${id}`;

  // Function to fetch drink details from the API
  const fetchDrinkDetails = async () => {
    try {
      // Make API request and update state with response data
      const drinkDetailsApiResponse = await axios.get(drinkDetailsApi);
      setDrinkDetail(drinkDetailsApiResponse.data[0]);
    } catch (err) {
      // Handle errors by updating the error state
      console.log(err);
      setError(err);
    } finally {
      // Set loading to false after the request is complete
      setLoading(false);
    }
  };

  // Use useEffect to fetch drink details when the component mounts or when the id changes
  useEffect(() => {
    fetchDrinkDetails();
  }, [id]);

  // Display loading spinner while data is being fetched
  if (loading) {
    return <CircularProgress />;
  }

  // Display error message if there was an issue fetching data
  if (error) {
    return (
      <Typography variant="body1">
        Error fetching drink details: {error.message}
      </Typography>
    );
  }

  // Display message if drink details are not found
  if (!drinkDetail) {
    return <Typography variant="body1">Drink not found</Typography>;
  }

  // Display drink details in a Card component
  return (
    <div>
      <div>
        {/* Display drink name */}
        <Typography variant="h4" gutterBottom>
          {drinkDetail.name}
        </Typography>
        {/* Card component to display drink details */}
        <Card>
          {/* CardMedia to display drink image */}
          <CardMedia
            component="img"
            alt={drinkDetail.name}
            height={"200"} 
            image={drinkDetail.image_url}
            style={{ width: "100%" }}
          />
          {/* CardContent to display various details about the drink */}
          <CardContent>
            {/* Display Alcohol By Volume (ABV) */}
            <Typography variant="h6" component="div" gutterBottom>
              Alcohol By Volume (ABV): {drinkDetail.abv}%
            </Typography>
            {/* Display drink tagline */}
            <Typography
              variant="subtitle1"
              color="textSecondary"
              gutterBottom
            >
              Tagline: {drinkDetail.tagline}
            </Typography>
            {/* Display drink description */}
            <Typography variant="body1">{drinkDetail.description}</Typography>
            {/* Display the first brewed date */}
            <Typography variant="subtitle2" color="primary">
              First Brewed: {drinkDetail.first_brewed}
            </Typography>
            {/* Display drink volume */}
            <Typography variant="subtitle2" color="primary">
              Volume: {drinkDetail.volume.value} {drinkDetail.volume.unit}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DrinkDetail;
