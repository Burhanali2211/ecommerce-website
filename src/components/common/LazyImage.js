import React, { useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function LazyImage({ src, alt, aspectRatio = '1/1', ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
      }}
    >
      {(!isIntersecting || !isLoaded) && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      )}
      {isIntersecting && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          {...props}
        />
      )}
    </Box>
  );
}

export default LazyImage;