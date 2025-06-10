import React, { useEffect, useState } from 'react';
import { historyService } from '../../services/historyService';
import { HistoryItem } from '../../types/history';
import { formatDate, formatDuration } from '../../utils/formatters';

const HistoryList: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await historyService.getHistory();
        setHistory(data);
        setError(null);
      } catch (err) {
        setError('Failed to load listening history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await historyService.deleteHistoryItem(id);
      setHistory(history.filter(item => item.id !== id));
    } catch (err) {
      setError('Failed to delete history item');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading history...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4 border border-red-300 rounded-md">{error}</div>;
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No listening history yet.</p>
        <p>Start playing songs to build your personalized experience!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Your Listening History</h2>
      <div className="space-y-2">
        {history.map((item) => (
          <div key={item.id} className="flex items-center p-3 bg-gray-100 rounded-lg">
            {item.song?.coverImage && (
              <img
                src={item.song.coverImage}
                alt={item.song.title}
                className="w-12 h-12 rounded mr-3"
              />
            )}
            <div className="flex-grow">
              <h3 className="font-medium">{item.song?.title || 'Unknown Track'}</h3>
              <p className="text-sm text-gray-600">{item.song?.artist || 'Unknown Artist'}</p>
              <p className="text-xs text-gray-500">
                {formatDate(item.listenedAt)} • {formatDuration(item.song?.duration || 0)}
                {item.completed ? ' • Completed' : ' • Partial play'}
              </p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-gray-500 hover:text-red-500"
              aria-label="Delete history item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;