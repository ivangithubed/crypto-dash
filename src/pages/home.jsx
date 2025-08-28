import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";
import Spinner from "../components/Spinner";

const HomePage = ({coins, limit, setLimit, filter, setFilter, sortBy, setSortBy, loading, error}) => {

const filteredCoins = coins.filter((coin) => 
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => {
        switch (sortBy) {
          case "market_cap_desc":
            return b.market_cap - a.market_cap;
          case "market_cap_asc":
            return a.market_cap - b.market_cap;
          case "price_desc":
            return b.current_price - a.current_price;
          case "price_asc":
            return a.current_price - b.current_price;
          default:
            break;
        }
      })

       return (
    <div>
      <h1>🚀 Crypto Dashboard</h1>

           <div className="top-controls ">
        <LimitSelector limit={limit} onSetLimit={setLimit} />
        <FilterInput filter={filter} onSetFilter={setFilter} />
        <SortSelector sortBy={sortBy} onSetSortBy={setSortBy} />
      </div>

      {loading && <Spinner color="red" size="200px" />}
      {error && <div>Помилка: {error}</div>}
      {!loading && !error && (
        <main className="grid">
       

          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
          ) : (
            <div>Жодна монета не знайдена за Вашим запитом</div>
          )}
        </main>
      )}
    </div>
  );
};



export default HomePage;
