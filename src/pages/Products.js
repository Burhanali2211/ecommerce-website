import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Chip,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Slider,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Badge,
} from '@mui/material';
import {
  FilterList,
  LocalShipping,
  Star,
  ShoppingCart,
  Favorite,
} from '@mui/icons-material';
import { fetchProducts, setFilters, setSortBy } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';

function Products() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { items: products, loading, error, filters, sortBy } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home'];
  const priceRanges = [
    { label: 'Under $25', value: [0, 25] },
    { label: '$25 to $50', value: [25, 50] },
    { label: '$50 to $100', value: [50, 100] },
    { label: '$100 to $200', value: [100, 200] },
    { label: 'Over $200', value: [200, Infinity] },
  ];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const FilterDrawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            key={category}
            dense
            button
            onClick={() =>
              dispatch(setFilters({ ...filters, category }))
            }
          >
            <Checkbox
              edge="start"
              checked={filters.category === category}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Price Range
      </Typography>
      <List>
        {priceRanges.map((range) => (
          <ListItem
            key={range.label}
            dense
            button
            onClick={() =>
              dispatch(setFilters({ ...filters, priceRange: range.value }))
            }
          >
            <Checkbox
              edge="start"
              checked={
                filters.priceRange &&
                filters.priceRange[0] === range.value[0] &&
                filters.priceRange[1] === range.value[1]
              }
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={range.label} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Minimum Rating
      </Typography>
      <Box sx={{ px: 2 }}>
        <Slider
          value={filters.rating || 0}
          onChange={(_, newValue) =>
            dispatch(setFilters({ ...filters, rating: newValue }))
          }
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={5}
        />
      </Box>
    </Box>
  );

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">Our Products</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <FilterList />
            </IconButton>
          )}
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy || ''}
              label="Sort By"
              onChange={(e) => dispatch(setSortBy(e.target.value))}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="price_asc">Price: Low to High</MenuItem>
              <MenuItem value="price_desc">Price: High to Low</MenuItem>
              <MenuItem value="rating">Average Rating</MenuItem>
              <MenuItem value="newest">Newest Arrivals</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Filters - Desktop */}
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>{FilterDrawer}</Paper>
          </Grid>
        )}

        {/* Product Grid */}
        <Grid item xs={12} md={isMobile ? 12 : 9}>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      pt: '100%',
                      '&:hover img': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        height: '100%',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                      }}
                    >
                      <Favorite />
                    </IconButton>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component={RouterLink}
                      to={`/products/${product.id}`}
                      sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Rating
                        value={product.rating}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        ({product.reviews.toLocaleString()})
                      </Typography>
                    </Box>
                    <Typography variant="h6" color="primary" gutterBottom>
                      ${product.price.toFixed(2)}
                    </Typography>
                    {product.freeShipping && (
                      <Chip
                        icon={<LocalShipping />}
                        label="FREE Shipping"
                        size="small"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    )}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {FilterDrawer}
      </Drawer>
    </Box>
  );
}

export default Products;