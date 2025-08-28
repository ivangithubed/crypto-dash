const FilterInput = ({ filter, onSetFilter }) => {
  return (
    <div className="filter">
     <input type="text" placeholder="Фільтруйте за назвою або символом" value={filter} onChange={(e) => onSetFilter(e.target.value)} />
    </div>
  );
};

export default FilterInput;
