import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function EmptyState({
  icon: Icon,
  title,
  message,
  actionText,
  onAction,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
      }}
    >
      {Icon && <Icon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mb: 3 }}
      >
        {message}
      </Typography>
      {actionText && onAction && (
        <Button variant="contained" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;