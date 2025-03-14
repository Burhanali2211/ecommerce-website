import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
} from '@mui/material';
import { ShoppingCart, Person } from '@mui/icons-material';

function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Modern Shop
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/products"
          >
            Products
          </Button>

          <IconButton
            color="inherit"
            component={RouterLink}
            to="/cart"
          >
            <Badge badgeContent={0} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            component={RouterLink}
            to="/login"
          >
            <Person />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;