import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

function ErrorAlert({ title, message, onRetry }) {
  return (
    <Box sx={{ my: 2 }}>
      <Alert
        severity="error"
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              RETRY
            </Button>
          )
        }
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Box>
  );
}

export default ErrorAlert;