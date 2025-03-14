import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Typography,
  Button,
  Rating,
  Chip,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  Alert,
  ImageList,
  ImageListItem,
  Stack,
} from '@mui/material';
import {
  LocalShipping,
  Security,
  Assignment,
  ShoppingCart,
  Bolt,
  LocationOn,
} from '@mui/icons-material';
import { addToCart } from '../store/cartSlice';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === parseInt(id))
  );
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  // Simulated additional images
  const productImages = [
    product.image,
    `https://source.unsplash.com/800x600/?${product.category}-1`,
    `https://source.unsplash.com/800x600/?${product.category}-2`,
    `https://source.unsplash.com/800x600/?${product.category}-3`,
  ];

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: selectedQuantity }));
  };

  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Left Column - Images */}
        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <ImageList sx={{ width: 100 }} cols={1}>
              {productImages.map((img, index) => (
                <ImageListItem
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    border: selectedImage === index ? '2px solid #1976d2' : 'none',
                    borderRadius: 1,
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    loading="lazy"
                    style={{ borderRadius: 4 }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Box sx={{ flex: 1 }}>
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 8,
                }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Right Column - Product Info */}
        <Grid item xs={12} md={5}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
              {product.rating} ({product.reviews.toLocaleString()} reviews)
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h4" color="primary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>

          {product.freeShipping && (
            <Chip
              icon={<LocalShipping />}
              label="FREE Shipping"
              color="primary"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          )}

          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn color="action" sx={{ mr: 1 }} />
                <Typography>
                  Deliver to <strong>Your Location</strong>
                </Typography>
              </Box>
              <Typography color="success.main" variant="h6">
                In Stock
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Select
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                  size="small"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  fullWidth
                >
                  Add to Cart
                </Button>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Bolt />}
                fullWidth
              >
                Buy Now
              </Button>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Secure transaction"
                  secondary="Your transaction is secure"
                  primaryTypographyProps={{
                    sx: { display: 'flex', alignItems: 'center', gap: 1 },
                  }}
                  secondaryTypographyProps={{ sx: { color: 'success.main' } }}
                  sx={{ display: 'flex', alignItems: 'center' }}
                  icon={<Security />}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Ships from and sold by Modern Shop"
                  secondary={`Estimated delivery: ${product.deliveryDate}`}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Product Features */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Product Features
            </Typography>
            <List>
              {product.features.map((feature, index) => (
                <ListItem key={index}>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetail;