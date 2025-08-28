import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import CoinChart from "../components/CoinChart";

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_COIN_API_URL}/${id}`
        );
        if (!response.ok) {
          throw new Error("Не вдалось отримати дані");
        }
        const data = await response.json();
        setCoin(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoinDetails();
  }, [id]);

  //   if (loading) {
  //     return <div>Завантаження...</div>;
  //   }

  //   if (error) {
  //     return <div>Помилка: {error}</div>;
  //   }

  //   if (!coin) {
  //     return <div>Монету не знайдено</div>;
  //   }

  return (
    <div className="coin-details-container">
      <CoinChart coinID={id} />
      <h1 className="coin-details-title">
        {coin
          ? `${coin.name} (${coin.symbol.toUpperCase()})`
          : "Інформація про монету"}
      </h1>
      {/* {loading && <п>Завантаження...</п>} */}
      {loading && <Spinner color="#000000" size="200px" />}
      {error && <p>Помилка: {error}</p>}

      
      {/* {!loading && !error && coin && (
        <div className="coin-details">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          />
          <p>Ціна: ${coin.market_data.current_price.usd.toLocaleString()}</p>
          <p>Ринкова капіталізація: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
          <p>Зміна за 24 години: {coin.market_data.price_change_percentage_24h.toFixed(2)}%</p>
          <p>Зміна за 7 днів: {coin.market_data.price_change_percentage_7d.toFixed(2)}%</p>
          <p>Зміна за 30 днів: {coin.market_data.price_change_percentage_30d.toFixed(2)}%</p>
          <p>Зміна за 1 рік: {coin.market_data.price_change_percentage_1y.toFixed(2)}%</p>
          <div
            className="coin-description"
            dangerouslySetInnerHTML={{ __html: coin.description.en }}
          ></div>
        </div>
      )} */}

{!loading && !error && coin && (
      <>
        <img
          src={coin.image.large}
          alt={coin.name}
          className='coin-details-image'
        />
        <p>{coin.description.en.split('. ')[0] + '.'}</p>

        <div className='coin-details-info'>
          <h3>Rank: #{coin.market_cap_rank}</h3>
          <h3>Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</h3>
          <h4>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
          <h4>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
          <h4>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
          <h4>
            24h Price Change: ${coin.market_data.price_change_24h.toFixed(2)} (
            {coin.market_data.price_change_percentage_24h.toFixed(2)}%)
          </h4>
          <h4>
            Circulating Supply: {coin.market_data.circulating_supply.toLocaleString()}
          </h4>
          <h4>
            Total Supply: {coin.market_data.total_supply?.toLocaleString() || 'N/A'}
          </h4>
          <h4>Max Supply: {coin.market_data.max_supply?.toLocaleString() || 'N/A'}</h4>
          <h4>
            All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{' '}
            {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
          </h4>
          <h4>
            All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{' '}
            {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
          </h4>
          <h4>Last Updated: {new Date(coin.last_updated).toLocaleString()}</h4>
        </div>

        <div className='coin-details-links'>
          {coin.links.homepage[0] && (
            <p>
              🌐{' '}
              <a
                href={coin.links.homepage[0]}
                target='_blank'
                rel='noopener noreferrer'
              >
                Website
              </a>
            </p>
          )}
          {coin.links.blockchain_site[0] && (
            <p>
              🧩{' '}
              <a
                href={coin.links.blockchain_site[0]}
                target='_blank'
                rel='noopener noreferrer'
              >
                Blockchain Explorer
              </a>
            </p>
          )}
          {coin.categories.length > 0 && (
            <p>Categories: {coin.categories.join(', ')}</p>
          )}
        </div>
      </>
    )}

    {!loading && !error && !coin && <p>No data found.</p>}
    </div>
  );
};

export default CoinDetailsPage;
