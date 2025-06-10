import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SmallArtistDiscovery from '../SmallArtistDiscovery';

// Suppress the specific ReactDOMTestUtils.act deprecation warning
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn((message, ...args) => {
    if (
      typeof message === 'string' &&
      message.includes('Warning: `ReactDOMTestUtils.act` is deprecated')
    ) {
      return; // Suppress this specific warning
    }
    originalError(message, ...args);
  });
});

afterAll(() => {
  console.error = originalError;
});

// Mock environment for testing
process.env.NODE_ENV = 'test';

// Test for User Story: As a user I want to be able to discover small artists
describe('Small Artist Discovery Feature', () => {
  
  // Acceptance Test 1: Shows low subscriber YouTube artists
  test('shows low subscriber YouTube artists', async () => {
    render(<SmallArtistDiscovery />);
    
    // Wait for loading to complete with increased timeout
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    }, { timeout: 3000 });

    // Check that YouTube section exists
    expect(screen.getByTestId('youtube-section-title')).toBeInTheDocument();
    expect(screen.getByTestId('youtube-section-title')).toHaveTextContent('YouTube Small Artists');

    // Check that YouTube artists are displayed
    const youtubeArtistsContainer = screen.getByTestId('youtube-artists');
    expect(youtubeArtistsContainer).toBeInTheDocument();

    // Verify specific YouTube artists are shown (with low subscriber counts)
    await waitFor(() => {
      expect(screen.getByTestId('youtube-artist-1')).toBeInTheDocument();
      expect(screen.getByTestId('youtube-artist-2')).toBeInTheDocument();
      expect(screen.getByTestId('youtube-artist-3')).toBeInTheDocument();
      expect(screen.getByTestId('youtube-artist-4')).toBeInTheDocument();
    }, { timeout: 1000 });

    // Verify subscriber counts are shown and are low (< 5000)
    const subscriber1 = screen.getByTestId('youtube-subscribers-1');
    const subscriber2 = screen.getByTestId('youtube-subscribers-2');
    expect(subscriber1).toHaveTextContent('2,500 subscribers');
    expect(subscriber2).toHaveTextContent('1,800 subscribers');
  });

  // Acceptance Test 2: Shows low Spotify monthly listener artists
  test('shows low Spotify monthly listener artists', async () => {
    render(<SmallArtistDiscovery />);
    
    // Wait for loading to complete with increased timeout
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    }, { timeout: 3000 });

    // Check that Spotify section exists
    expect(screen.getByTestId('spotify-section-title')).toBeInTheDocument();
    expect(screen.getByTestId('spotify-section-title')).toHaveTextContent('Spotify Small Artists');

    // Check that Spotify artists are displayed
    const spotifyArtistsContainer = screen.getByTestId('spotify-artists');
    expect(spotifyArtistsContainer).toBeInTheDocument();

    // Verify specific Spotify artists are shown (with low monthly listener counts)
    await waitFor(() => {
      expect(screen.getByTestId('spotify-artist-1')).toBeInTheDocument();
      expect(screen.getByTestId('spotify-artist-2')).toBeInTheDocument();
      expect(screen.getByTestId('spotify-artist-3')).toBeInTheDocument();
      expect(screen.getByTestId('spotify-artist-4')).toBeInTheDocument();
    }, { timeout: 1000 });

    // Verify monthly listener counts are shown and are low (< 5000)
    const listeners1 = screen.getByTestId('spotify-listeners-1');
    const listeners2 = screen.getByTestId('spotify-listeners-2');
    expect(listeners1).toHaveTextContent('4,500 monthly listeners');
    expect(listeners2).toHaveTextContent('2,100 monthly listeners');
  });

  // Additional test: Component renders without crashing
  test('renders small artist discovery component', async () => {
    render(<SmallArtistDiscovery />);
    
    // Check initial loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Discovering small artists...')).toBeInTheDocument();

    // Wait for component to load with increased timeout
    await waitFor(() => {
      expect(screen.getByTestId('small-artist-discovery')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Check main heading
    expect(screen.getByText('Discover Small Artists')).toBeInTheDocument();
    expect(screen.getByText('Find amazing undiscovered talent on YouTube and Spotify')).toBeInTheDocument();
  });

  // Test for empty state handling
  test('handles empty artist lists gracefully', async () => {
    // This test would be useful if we had a way to mock empty responses
    // For now, we test that the component structure exists even if artists are present
    render(<SmallArtistDiscovery />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    }, { timeout: 3000 });

    // Ensure sections exist even when there might be no artists
    expect(screen.getByTestId('youtube-section-title')).toBeInTheDocument();
    expect(screen.getByTestId('spotify-section-title')).toBeInTheDocument();
  });

  // Test loading state
  test('shows loading state initially', () => {
    render(<SmallArtistDiscovery />);
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Discovering small artists...')).toBeInTheDocument();
    expect(screen.getByText('Loading amazing undiscovered talent...')).toBeInTheDocument();
  });
});