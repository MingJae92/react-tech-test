import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
const drink_api = "https://api.punkapi.com/v2/beers"
  const drinks_data_response = async () => {
    try {
      const drinks_data = await axios.get(`${drink_api}?per_page=10`);
      console.log(drinks_data.data);
      setDrinks(drinks_data.data);
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
    <div>
      <h1>Welcome to the devil's drinks menu!</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching drinks data.</p>
      ) : (
        <ul>
          {drinks.map((drink) => (
            <li key={drink.id}>
                <Link to={`/drinkdetail/${drink.id}`}>
                    <img src={drink.image_url} alt={drink.name}/>
                    <h3>{drink.name}</h3>
                    <p>{drink.description.slice(0, 100)}...</p>
                </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Drinks;
