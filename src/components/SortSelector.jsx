const SortSelector = ({ sortBy, onSetSortBy }) => {
  return (
    <div className="controls">
      <label htmlFor="sort">Сортувати за:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => onSetSortBy(e.target.value)}
      >
        <option value="market_cap_desc">Капіталізація (зменшенням)</option>
        <option value="market_cap_asc">Капіталізація (зростанням)</option>
        <option value="price_desc">Ціна (зменшенням)</option>
        <option value="price_asc">Ціна (зростанням)</option>
      </select>
    </div>
  );
};

export default SortSelector;
