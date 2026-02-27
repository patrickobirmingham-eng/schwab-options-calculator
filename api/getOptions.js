import axios from 'axios';

export default async function handler(req, res) {
  const { symbol } = req.query;
  const authHeader = req.headers.authorization;

  try {
    const response = await axios.get(`https://api.schwabapi.com/marketdata/v1/quotes`, {
      params: { 
        symbols: symbol,
        fields: 'quote' 
      },
      headers: { 
        'Authorization': authHeader,
        'Accept': 'application/json'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Schwab Quote API failed' });
  }
}
