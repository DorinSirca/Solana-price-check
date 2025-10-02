import axios from 'axios';

// Using CoinGecko API for Solana tokens (free tier)
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Popular Solana tokens with their CoinGecko IDs
const SOLANA_TOKENS = [
  { id: 'solana', symbol: 'SOL', name: 'Solana', address: 'So11111111111111111111111111111111111111112' },
  { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
  { id: 'tether', symbol: 'USDT', name: 'Tether', address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB' },
  { id: 'raydium', symbol: 'RAY', name: 'Raydium', address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R' },
  { id: 'serum', symbol: 'SRM', name: 'Serum', address: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt' },
  { id: 'orca', symbol: 'ORCA', name: 'Orca', address: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE' },
  { id: 'step-finance', symbol: 'STEP', name: 'Step Finance', address: 'StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT' },
  { id: 'mango-markets', symbol: 'MNGO', name: 'Mango', address: 'MangoCzJ36AjZyKwVj3VnYU4geOnxnM4H7r2YBarkLJs' },
  { id: 'saber', symbol: 'SBR', name: 'Saber', address: 'Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1' },
  { id: 'mercurial', symbol: 'MER', name: 'Mercurial', address: 'MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K' },
  { id: 'bonfida', symbol: 'FIDA', name: 'Bonfida', address: 'EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp' },
  { id: 'maps', symbol: 'MAPS', name: 'Maps', address: 'MAPS41MDahZ9QdKXhVa4dWB9RuyfW4Qqno9Rr3v6g' },
  { id: 'star-atlas', symbol: 'ATLAS', name: 'Star Atlas', address: 'ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx' },
  { id: 'star-atlas-dao', symbol: 'POLIS', name: 'Star Atlas DAO', address: 'poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk' },
  { id: 'media-network', symbol: 'MEDIA', name: 'Media Network', address: 'ETAtLmCmsoiEEKfNrHKJ2kYy3MoFhZ4ksnvZJa4LvG7' },
  { id: 'cope', symbol: 'COPE', name: 'Cope', address: '8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh' },
  { id: 'robo-inu-finance', symbol: 'ROBO', name: 'Robo Inu Finance', address: '7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx' },
  { id: 'stepn', symbol: 'GMT', name: 'STEPN', address: '7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx' },
  { id: 'gst', symbol: 'GST', name: 'Green Satoshi Token', address: 'AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB' },
  { id: 'samoyedcoin', symbol: 'SAMO', name: 'Samoyedcoin', address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU' }
];

export const fetchSolanaTokens = async () => {
  try {
    // Get token IDs for batch request
    const tokenIds = SOLANA_TOKENS.map(token => token.id).join(',');
    
    // Fetch current prices and market data
    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: tokenIds,
        order: 'market_cap_desc',
        per_page: 50,
        page: 1,
        sparkline: true,
        price_change_percentage: '1h,24h,7d'
      }
    });

    // Combine token data with additional info
    const tokensWithData = response.data.map((coinData, index) => {
      const tokenInfo = SOLANA_TOKENS[index];
      return {
        id: coinData.id,
        symbol: coinData.symbol.toUpperCase(),
        name: coinData.name,
        address: tokenInfo.address,
        current_price: coinData.current_price,
        market_cap: coinData.market_cap,
        total_volume: coinData.total_volume,
        price_change_percentage_1h: coinData.price_change_percentage_1h_in_currency,
        price_change_percentage_24h: coinData.price_change_percentage_24h,
        price_change_percentage_7d: coinData.price_change_percentage_7d_in_currency,
        sparkline: coinData.sparkline_in_7d?.price || [],
        image: coinData.image,
        last_updated: coinData.last_updated
      };
    });

    return tokensWithData;
  } catch (error) {
    console.error('Error fetching Solana tokens:', error);
    throw new Error('Failed to fetch token data');
  }
};

export const fetchTokenPriceHistory = async (tokenId, days = 7) => {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/${tokenId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days,
        interval: days <= 1 ? 'hourly' : 'daily'
      }
    });

    return response.data.prices.map(([timestamp, price]) => ({
      timestamp,
      price
    }));
  } catch (error) {
    console.error('Error fetching price history:', error);
    throw new Error('Failed to fetch price history');
  }
};
