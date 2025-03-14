import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Box,
  Button,
  Divider,
  Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';

function Review({ onBack, onNext, formData }) {
  const cart = useSelector((state) => state.cart);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.items.map((product) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="body2">
              ${(product.price * product.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <Divider sx={{ my: 2 }} />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Subtotal" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${cart.totalAmount.toFixed(2)}
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{formData.firstName} {formData.lastName}</Typography>
          <Typography gutterBottom>{formData.address1}</Typography>
          {formData.address2 && (
            <Typography gutterBottom>{formData.address2}</Typography>
          )}
          <Typography gutterBottom>
            {formData.city}, {formData.state} {formData.zip}
          </Typography>
          <Typography gutterBottom>{formData.country}</Typography>
        </Grid>

        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>Card type</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Visa</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Card holder</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{formData.cardName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Card number</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                xxxx-xxxx-xxxx-{formData.cardNumber.slice(-4)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Expiry date</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{formData.expDate}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack} variant="outlined">
          Back
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          color="primary"
        >
          Place order
        </Button>
      </Box>
    </Box>
  );
}

export default Review;