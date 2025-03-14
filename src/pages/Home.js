import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

function Home() {
  const features = [
    {
      title: 'Wide Selection',
      description: 'Browse through our extensive collection of products',
      image: 'https://source.unsplash.com/400x300/?shopping',
    },
    {
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly and securely',
      image: 'https://source.unsplash.com/400x300/?delivery',
    },
    {
      title: 'Best Prices',
      description: 'Find the best deals and competitive prices',
      image: 'https://source.unsplash.com/400x300/?sale',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
          >
            Welcome to Modern Shop
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Discover amazing products at great prices
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/products"
              sx={{ px: 4, py: 1.5 }}
            >
              Shop Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;