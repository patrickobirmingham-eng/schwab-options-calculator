// api/getOptions.js
import axios from 'axios';

export default async function handler(req, res) {
  const { symbol } = req.query;
  const authHeader = req.headers.authorization; // Token passed from frontend

  try {
    const response = await axios.get(`https://api.schwabapi.com/marketdata/v1/chains`, {
      params: { symbol, contractType: 'ALL', strategy: 'SINGLE' },
      headers: { 
        'Authorization': authHeader,
        'Accept': 'application/json'
      }
    });
    
    // Send data back to your GitHub Pages frontend
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy failed to fetch Schwab data' });
  }
}
