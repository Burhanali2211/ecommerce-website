import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

// Mock data - replace with actual cart state management
const cartItems = [
  {
    id: 1,
    name: 'Product 1',
    price: 99.99,
    quantity: 1,
    image: 'https://source.unsplash.com/400x300/?product',
  },
  // Add more items here
];

function Cart() {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            color="primary"
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '100%', borderRadius: 8 }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        gutterBottom
                      >
                        ${item.price}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <IconButton size="small">
                          <Remove />
                        </IconButton>
                        <TextField
                          size="small"
                          value={item.quantity}
                          inputProps={{ min: 1, style: { textAlign: 'center' } }}
                          sx={{ width: 60 }}
                        />
                        <IconButton size="small">
                          <Add />
                        </IconButton>
                        <IconButton
                          color="error"
                          sx={{ ml: 'auto' }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography>Subtotal:</Typography>
                  <Typography>${total.toFixed(2)}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={RouterLink}
                  to="/checkout"
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Cart;