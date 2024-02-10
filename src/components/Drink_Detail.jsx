import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function Drink_detail() {
    const [drinkDetails, setDrinksDetails]=useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState("")
    const {id}=useParams

  return (
    <div>
        
    </div>
  )
}

export default Drink_detail