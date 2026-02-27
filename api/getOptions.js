import axios from 'axios';

export default async function handler(req, res) {
  const { symbol } = req.query;
  const authHeader = req.headers.authorization; 

  // 1. Check if the user sent a token
  if (!authHeader) {
    return res.status(401).json({ error: 'No Authorization token provided' });
  }

  try {
    // 2. Call the ACTUAL Schwab API, not your own URL
    const response = await axios.get(`https://api.schwabapi.com/marketdata/v1/chains`, {
      params: { 
        symbol: symbol, 
        contractType: 'ALL', 
        strategy: 'SINGLE',
        strikeCount: 10 // Returns the 10 closest strikes to the current price
      },
      headers: { 
        'Authorization': authHeader, // Passes the Bearer token from your frontend
        'Accept': 'application/json'
      }
    });
    
    // 3. Send the Schwab data back to your HTML page
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Schwab API Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Schwab API call failed' });
  }
}
