import React from 'react';
import HistoryList from '../components/history/HistoryList';
import PreferencesForm from '../components/history/PreferencesForm';
import RecommendedSongs from '../components/songs/RecommendedSongs';

const History: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Music Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <HistoryList />
        </div>

        <div className="space-y-8">
          <PreferencesForm />

          <div>
            <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
            <p className="text-sm text-gray-600 mb-4">
              Based on your listening history and preferences
            </p>
            <RecommendedSongs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;