import React, { useState, useEffect } from 'react';

export const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const query = 'sunset'; // Change this to any keyword you want
  const unsplashAccessKey = 'YOUR_ACCESS_KEY'; // Replace with your Unsplash Access Key

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashAccessKey}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setImageUrl(data.urls.regular); // or data.urls.small for a smaller version
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRandomImage();
  }, [query, unsplashAccessKey]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {imageUrl ? <img src={imageUrl} alt="Random from Unsplash" /> : <p>Loading...</p>}
    </div>
  );
};

export default RandomImage;
