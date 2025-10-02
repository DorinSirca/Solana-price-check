import React, { useState, useEffect } from 'react';
import './App.css';
import TokenList from './components/TokenList';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import { fetchSolanaTokens } from './services/api';

function App() {
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadTokens = async () => {
      try {
        setLoading(true);
        const tokenData = await fetchSolanaTokens();
        setTokens(tokenData);
        setFilteredTokens(tokenData);
      } catch (err) {
        setError('Failed to fetch token data. Please try again later.');
        console.error('Error fetching tokens:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTokens();
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadTokens, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTokens(tokens);
    } else {
      const filtered = tokens.filter(token =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTokens(filtered);
    }
  }, [searchTerm, tokens]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="app">
      <div className="background-animation"></div>
      <div className="app-content">
        <Header />
        <SearchBar onSearch={handleSearch} />
        
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading Solana tokens...</p>
          </div>
        )}
        
        {error && (
          <div className="error-container">
            <p>{error}</p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}
        
        {!loading && !error && (
          <TokenList 
            tokens={filteredTokens} 
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
}

export default App;
