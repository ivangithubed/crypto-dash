import { useState, useEffect } from "react";
// import CoinCard from "./components/CoinCard";
// import LimitSelector from "./components/LimitSelector";
// import FilterInput from "./components/FilterInput";
// import SortSelector from "./components/SortSelector";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import NotFoundPage from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";

const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {


    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!response.ok) {
          throw new Error("Не вдалось отримати дані");
        }
        const data = await response.json();
        setCoins(data);
        // console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, [limit]);

  // const filteredCoins = coins.filter((coin) => 
  //     coin.name.toLowerCase().includes(filter.toLowerCase()) ||
  //     coin.symbol.toLowerCase().includes(filter.toLowerCase()))
  //     .sort((a, b) => {
  //       switch (sortBy) {
  //         case "market_cap_desc":
  //           return b.market_cap - a.market_cap;
  //         case "market_cap_asc":
  //           return a.market_cap - b.market_cap;
  //         case "price_desc":
  //           return b.current_price - a.current_price;
  //         case "price_asc":
  //           return a.current_price - b.current_price;
  //         default:
  //           break;
  //       }
  //     })


//   return (
//     <div>
//       <h1>🚀 Crypto Dashboard</h1>

//            <div className="top-controls ">
//         <LimitSelector limit={limit} onSetLimit={setLimit} />
//         <FilterInput filter={filter} onSetFilter={setFilter} />
//         <SortSelector sortBy={sortBy} onSetSortBy={setSortBy} />
//       </div>

//       {loading && <div>Завантаження...</div>}
//       {error && <div>Помилка: {error}</div>}
//       {!loading && !error && (
//         <main className="grid">
       

//           {filteredCoins.length > 0 ? (
//             filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
//           ) : (
//             <div>Жодна монета не знайдена за Вашим запитом</div>
//           )}
//         </main>
//       )}
//     </div>
//   );

return (
  <>
    <Header />
    <Routes>
      <Route path="/" element={
        <HomePage 
          coins={coins} 
          limit={limit} 
          setLimit={setLimit} 
          filter={filter} 
          setFilter={setFilter} 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          loading={loading} 
          error={error} 
        />
      } />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/coin/:id" element={<CoinDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );



};

export default App;
