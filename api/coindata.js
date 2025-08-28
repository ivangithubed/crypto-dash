// Серверний проксі-ендпоінт для CoinGecko
export default async function handler(request, response) {
  const baseUrl = process.env.COINAPI_URL;

  // Додаємо підтримку параметра limit з URL запиту
  const limit = request.query.limit || '10'; // За замовчуванням 10, якщо не вказано

  // Перевірка, чи налаштована базова URL
  if (!baseUrl) {
    return response.status(500).json({ error: 'API endpoint is not configured on the server.' });
  }

  // Формуємо кінцевий URL для запиту до CoinGecko
  const apiUrl = `${baseUrl}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`;

  try {
    // Сервер робить запит до CoinGecko
    const apiResponse = await fetch(apiUrl);

    if (!apiResponse.ok) {
      // Якщо зовнішній API повернув помилку, передаємо її далі
      const errorText = await apiResponse.text();
      return response.status(apiResponse.status).json({ error: 'Failed to fetch from CoinGecko API', details: errorText });
    }

    const data = await apiResponse.json();
    
    // Повертаємо успішну відповідь нашому фронтенду
    response.status(200).json(data);

  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
