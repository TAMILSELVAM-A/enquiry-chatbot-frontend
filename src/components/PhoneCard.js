import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const PhoneCard = ({ phone }) => {
  return (
    <Card sx={{ maxWidth: 300, m: 2 }}>
      <CardMedia component="img" height="200" image={phone.image} alt={phone.name} />
      <CardContent>
        <Typography variant="h6">{phone.name}</Typography>
        <Typography variant="body2" color="textSecondary">{phone.specs}</Typography>
        <Typography variant="h6" color="primary">{phone.price}</Typography>
        <Button variant="contained" sx={{ mt: 1 }} fullWidth>Add to Cart</Button>
      </CardContent>
    </Card>
  );
};

export default PhoneCard;
