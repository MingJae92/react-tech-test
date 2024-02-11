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
  const [drinkDetail, setDrinkDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const drinkDetailsApi = `https://api.punkapi.com/v2/beers/${id}`;
  console.log(id)
  const fetchDrinkDetails = async () => {
    try {
      const drinkDetailsApiResponse = await axios.get(drinkDetailsApi);
      setDrinkDetail(drinkDetailsApiResponse.data[0]); // { name: lager }.ma
      console.log(drinkDetailsApiResponse)
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrinkDetails();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="body1">
        Error fetching drink details: {error.message}
      </Typography>
    );
  }

  if (!drinkDetail) {
    return <Typography variant="body1">Drink not found</Typography>;
  }

  return (
    <div>
    
        <div>
          <Typography variant="h4" gutterBottom>
            {drinkDetail.name}
          </Typography>
          <Card>
            <CardMedia
              component="img"
              alt={drinkDetail.name}
              height="400"
              image={drinkDetail.image_url}
              style={{ width: "100%" }}
            />
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Alcohol By Volume (ABV): {drinkDetail.abv}%
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Tagline: {drinkDetail.tagline}
              </Typography>
              <Typography variant="body1">{drinkDetail.description}</Typography>
              <Typography variant="subtitle2" color="primary">
                First Brewed: {drinkDetail.first_brewed}
              </Typography>
            </CardContent>
          </Card>
        </div>
  
    </div>
  );
}

export default DrinkDetail;
