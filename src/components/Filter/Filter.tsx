import { useContext } from "react";
import { FilteredBy } from "../../types/Filters";
import { SharedDataContext } from "../../utils/context";

export const StatusFilter = () => {
  const { booksFromServer, booksFiltered, filter, setFilter } =
    useContext(SharedDataContext);
  const numberOfBooks = `${booksFiltered.length} of ${booksFromServer.length} books`;

  return (
    <div className="filter">
      <select
        className="filter__selector"
        value={filter}
        onChange={(event) => {
          setFilter(event.target.value);
          event.target.blur();
        }}
      >
        <option value={FilteredBy.ACTIVE}>Show active</option>
        <option value={FilteredBy.ALL}>Show all</option>
        <option value={FilteredBy.DEACTIVATED}>Show deactivated</option>
      </select>
      <div className="filter__quantity">{numberOfBooks}</div>
    </div>
  );
};
