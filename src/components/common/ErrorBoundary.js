import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
} from '@mui/material';
import { Error } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Paper
            sx={{
              p: 4,
              mt: 4,
              textAlign: 'center',
              borderRadius: 2,
            }}
          >
            <Error
              color="error"
              sx={{ fontSize: 60, mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography color="text.secondary" paragraph>
              We're sorry for the inconvenience. Please try refreshing the page
              or contact support if the problem persists.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;