import React from "react";
import { Grid } from "@mui/material";
import PhoneCard from "./PhoneCard";

const phones = [
  { id: 1, name: "Galaxy S23 Ultra", price: "$1199", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf", specs: "8GB RAM | 256GB Storage" },
  { id: 2, name: "iPhone 14 Pro", price: "$999", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab", specs: "6GB RAM | 128GB Storage" },
  { id: 3, name: "Pixel 7 Pro", price: "$899", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97", specs: "12GB RAM | 256GB Storage" },
];

const PhoneList = () => {
  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
      {phones.map((phone) => (
        <Grid item key={phone.id}>
          <PhoneCard phone={phone} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PhoneList;
