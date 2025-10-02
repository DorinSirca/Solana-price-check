import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Copy, ExternalLink } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import './TokenCard.css';

const TokenCard = ({ token, index }) => {
  const [copied, setCopied] = useState(false);

  const formatPrice = (price) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(2)}`;
  };

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num?.toFixed(0) || '0';
  };

  const formatPercentage = (percentage) => {
    if (percentage === null || percentage === undefined) return '0.00%';
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  };

  const getChangeColor = (percentage) => {
    if (percentage > 0) return '#00ff88';
    if (percentage < 0) return '#ff4444';
    return '#ffffff';
  };

  const getSparklineData = () => {
    if (!token.sparkline || token.sparkline.length === 0) {
      return [{ value: token.current_price }];
    }
    return token.sparkline.map((price, index) => ({
      value: price,
      index
    }));
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(token.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const openInExplorer = () => {
    window.open(`https://solscan.io/token/${token.address}`, '_blank');
  };

  const sparklineData = getSparklineData();
  const isPositive = (token.price_change_percentage_24h || 0) >= 0;

  return (
    <div 
      className="token-card glass"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="token-header">
        <div className="token-info">
          <div className="token-image">
            {token.image ? (
              <img src={token.image} alt={token.name} />
            ) : (
              <div className="token-placeholder">
                {token.symbol.charAt(0)}
              </div>
            )}
          </div>
          <div className="token-details">
            <h3 className="token-name">{token.name}</h3>
            <p className="token-symbol">{token.symbol}</p>
          </div>
        </div>
        <div className="token-actions">
          <button
            className="action-button"
            onClick={copyAddress}
            title="Copy address"
          >
            <Copy className="action-icon" />
            {copied && <span className="copied-text">Copied!</span>}
          </button>
          <button
            className="action-button"
            onClick={openInExplorer}
            title="View on Solscan"
          >
            <ExternalLink className="action-icon" />
          </button>
        </div>
      </div>

      {/* Price and Change */}
      <div className="price-section">
        <div className="current-price">
          {formatPrice(token.current_price)}
        </div>
        <div 
          className="price-change"
          style={{ color: getChangeColor(token.price_change_percentage_24h) }}
        >
          {isPositive ? <TrendingUp className="change-icon" /> : <TrendingDown className="change-icon" />}
          {formatPercentage(token.price_change_percentage_24h)}
        </div>
      </div>

      {/* Mini Chart */}
      <div className="chart-section">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={sparklineData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositive ? '#00ff88' : '#ff4444'}
                strokeWidth={2}
                dot={false}
                activeDot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Data */}
      <div className="market-data">
        <div className="data-row">
          <span className="data-label">Market Cap</span>
          <span className="data-value">${formatNumber(token.market_cap)}</span>
        </div>
        <div className="data-row">
          <span className="data-label">24h Volume</span>
          <span className="data-value">${formatNumber(token.total_volume)}</span>
        </div>
        <div className="data-row">
          <span className="data-label">1h Change</span>
          <span 
            className="data-value"
            style={{ color: getChangeColor(token.price_change_percentage_1h) }}
          >
            {formatPercentage(token.price_change_percentage_1h)}
          </span>
        </div>
        <div className="data-row">
          <span className="data-label">7d Change</span>
          <span 
            className="data-value"
            style={{ color: getChangeColor(token.price_change_percentage_7d) }}
          >
            {formatPercentage(token.price_change_percentage_7d)}
          </span>
        </div>
      </div>

      {/* Address */}
      <div className="address-section">
        <span className="address-label">Contract:</span>
        <span className="address-text">
          {token.address.slice(0, 8)}...{token.address.slice(-8)}
        </span>
      </div>
    </div>
  );
};

export default TokenCard;
