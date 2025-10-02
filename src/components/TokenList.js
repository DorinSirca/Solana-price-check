import React, { useState } from 'react';
import TokenCard from './TokenCard';
import { TrendingUp, TrendingDown, Filter } from 'lucide-react';
import './TokenList.css';

const TokenList = ({ tokens, searchTerm }) => {
  const [sortBy, setSortBy] = useState('market_cap');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedTokens = [...tokens].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === 'price_change_percentage_24h') {
      aValue = aValue || 0;
      bValue = bValue || 0;
    }

    if (sortOrder === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num?.toFixed(2) || '0';
  };

  const getTotalMarketCap = () => {
    return tokens.reduce((sum, token) => sum + (token.market_cap || 0), 0);
  };

  const getTotalVolume = () => {
    return tokens.reduce((sum, token) => sum + (token.total_volume || 0), 0);
  };

  return (
    <div className="token-list-container">
      {/* Market Overview */}
      <div className="market-overview glass">
        <div className="overview-stats">
          <div className="stat-item">
            <div className="stat-label">Total Market Cap</div>
            <div className="stat-value">${formatNumber(getTotalMarketCap())}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">24h Volume</div>
            <div className="stat-value">${formatNumber(getTotalVolume())}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Active Tokens</div>
            <div className="stat-value">{tokens.length}</div>
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="sort-controls glass">
        <div className="sort-header">
          <Filter className="filter-icon" />
          <span>Sort by:</span>
        </div>
        <div className="sort-buttons">
          <button
            className={`sort-button ${sortBy === 'market_cap' ? 'active' : ''}`}
            onClick={() => handleSort('market_cap')}
          >
            Market Cap
            {sortBy === 'market_cap' && (
              sortOrder === 'desc' ? <TrendingDown /> : <TrendingUp />
            )}
          </button>
          <button
            className={`sort-button ${sortBy === 'current_price' ? 'active' : ''}`}
            onClick={() => handleSort('current_price')}
          >
            Price
            {sortBy === 'current_price' && (
              sortOrder === 'desc' ? <TrendingDown /> : <TrendingUp />
            )}
          </button>
          <button
            className={`sort-button ${sortBy === 'price_change_percentage_24h' ? 'active' : ''}`}
            onClick={() => handleSort('price_change_percentage_24h')}
          >
            24h Change
            {sortBy === 'price_change_percentage_24h' && (
              sortOrder === 'desc' ? <TrendingDown /> : <TrendingUp />
            )}
          </button>
          <button
            className={`sort-button ${sortBy === 'total_volume' ? 'active' : ''}`}
            onClick={() => handleSort('total_volume')}
          >
            Volume
            {sortBy === 'total_volume' && (
              sortOrder === 'desc' ? <TrendingDown /> : <TrendingUp />
            )}
          </button>
        </div>
      </div>

      {/* Results Info */}
      {searchTerm && (
        <div className="results-info">
          <span>
            {tokens.length} token{tokens.length !== 1 ? 's' : ''} found for "{searchTerm}"
          </span>
        </div>
      )}

      {/* Token Grid */}
      <div className="token-grid">
        {sortedTokens.map((token, index) => (
          <TokenCard
            key={token.id}
            token={token}
            index={index}
          />
        ))}
      </div>

      {tokens.length === 0 && (
        <div className="no-results">
          <p>No tokens found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TokenList;
