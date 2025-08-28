// Серверний проксі-ендпоінт для CoinAPI
export default async function handler(request, response) {
  const baseUrl = process.env.COINAPI_URL;
  const apiKey = process.env.COINAPI_KEY;

  // Додаємо підтримку параметра limit
  const { limit } = request.query || {};
  // Додаємо параметр до URL, якщо він є
  let apiUrl = baseUrl;
  if (limit) {
    // Якщо в базовому URL вже є ?, додаємо через &
    apiUrl += (baseUrl.includes('?') ? `&per_page=${limit}` : `?per_page=${limit}`);
  }

  if (!apiUrl || !apiKey) {
    return response.status(500).json({ error: 'API endpoint or key is not configured on the server.' });
  }

  try {
    const apiResponse = await fetch(apiUrl, {
      headers: {
        'X-CoinAPI-Key': apiKey,
      },
    });

    if (!apiResponse.ok) {
      return response.status(apiResponse.status).json({ error: 'Failed to fetch from CoinAPI' });
    }

    const data = await apiResponse.json();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
}
