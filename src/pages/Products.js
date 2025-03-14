import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
} from '@mui/material';

// Mock data - replace with actual API call
const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is a sample product description',
    price: 99.99,
    rating: 4.5,
    image: 'https://source.unsplash.com/400x300/?product',
  },
  // Add more products here
];

function Products() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Our Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  paragraph
                >
                  {product.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Rating
                    value={product.rating}
                    precision={0.5}
                    readOnly
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({product.rating})
                  </Typography>
                </Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={RouterLink}
                  to={`/products/${product.id}`}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Products;