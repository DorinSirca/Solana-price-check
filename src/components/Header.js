import React from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import './Header.css';

const Header = ({ isRefreshing }) => {
  return (
    <header className="header glass-strong">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <TrendingUp className="logo-icon" />
            <h1>Sol to 1k</h1>
          </div>
          <p className="header-subtitle">
            Real-time Solana token prices and market data
          </p>
        </div>
        
        <div className="header-right">
          <div className="refresh-indicator">
            <RefreshCw className={`refresh-icon ${isRefreshing ? 'spinning' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Auto-refresh: 30s'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
