import React, { useState, useEffect } from 'react';

const SmallArtistDiscovery = () => {
  const [youtubeArtists, setYoutubeArtists] = useState([]);
  const [spotifyArtists, setSpotifyArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for small artists (replace with actual API calls)
  const mockYoutubeArtists = [
    { id: 1, name: 'Indie Soul', subscribers: 2500, genre: 'Soul', thumbnail: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Echo Dreams', subscribers: 1800, genre: 'Dream Pop', thumbnail: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Urban Roots', subscribers: 3200, genre: 'Hip Hop', thumbnail: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Acoustic Dawn', subscribers: 950, genre: 'Folk', thumbnail: 'https://via.placeholder.com/150' },
  ];

  const mockSpotifyArtists = [
    { id: 1, name: 'Midnight Vibes', monthlyListeners: 4500, genre: 'R&B', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Coffee Shop Jazz', monthlyListeners: 2100, genre: 'Jazz', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Synth Wave', monthlyListeners: 3800, genre: 'Electronic', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Garden Folk', monthlyListeners: 1600, genre: 'Indie Folk', image: 'https://via.placeholder.com/150' },
  ];

  useEffect(() => {
    // Simulate API loading
    const loadArtists = async () => {
      try {
        setLoading(true);
        
        // Reduce delay for testing - use environment variable or shorter delay
        const delay = process.env.NODE_ENV === 'test' ? 0 : 100;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Filter for small artists (YouTube < 5000 subscribers, Spotify < 5000 monthly listeners)
        const smallYoutubeArtists = mockYoutubeArtists.filter(artist => artist.subscribers < 5000);
        const smallSpotifyArtists = mockSpotifyArtists.filter(artist => artist.monthlyListeners < 5000);
        
        setYoutubeArtists(smallYoutubeArtists);
        setSpotifyArtists(smallSpotifyArtists);
        setLoading(false);
      } catch (err) {
        setError('Failed to load artists');
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  if (loading) {
    return (
      <div className="loading" data-testid="loading">
        <h2>Discovering small artists...</h2>
        <p>Loading amazing undiscovered talent...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error" data-testid="error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="small-artist-discovery" data-testid="small-artist-discovery">
      <header className="header">
        <h1>Discover Small Artists</h1>
        <p>Find amazing undiscovered talent on YouTube and Spotify</p>
      </header>

      <section className="youtube-section">
        <h2 data-testid="youtube-section-title">YouTube Small Artists</h2>
        <p>Artists with fewer than 5,000 subscribers</p>
        <div className="artists-grid" data-testid="youtube-artists">
          {youtubeArtists.map(artist => (
            <div key={artist.id} className="artist-card" data-testid={`youtube-artist-${artist.id}`}>
              <img src={artist.thumbnail} alt={artist.name} />
              <h3>{artist.name}</h3>
              <p className="genre">{artist.genre}</p>
              <p className="stats" data-testid={`youtube-subscribers-${artist.id}`}>
                {artist.subscribers.toLocaleString()} subscribers
              </p>
            </div>
          ))}
        </div>
        {youtubeArtists.length === 0 && (
          <p data-testid="no-youtube-artists">No small YouTube artists found</p>
        )}
      </section>

      <section className="spotify-section">
        <h2 data-testid="spotify-section-title">Spotify Small Artists</h2>
        <p>Artists with fewer than 5,000 monthly listeners</p>
        <div className="artists-grid" data-testid="spotify-artists">
          {spotifyArtists.map(artist => (
            <div key={artist.id} className="artist-card" data-testid={`spotify-artist-${artist.id}`}>
              <img src={artist.image} alt={artist.name} />
              <h3>{artist.name}</h3>
              <p className="genre">{artist.genre}</p>
              <p className="stats" data-testid={`spotify-listeners-${artist.id}`}>
                {artist.monthlyListeners.toLocaleString()} monthly listeners
              </p>
            </div>
          ))}
        </div>
        {spotifyArtists.length === 0 && (
          <p data-testid="no-spotify-artists">No small Spotify artists found</p>
        )}
      </section>
    </div>
  );
};

export default SmallArtistDiscovery;