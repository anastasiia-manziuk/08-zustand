import css from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  onChange: (value: string) => void;
}

function SearchBox({ search, onChange }: SearchBoxProps) {
  return (
    <input
      id="search"
      type="text"
      value={search}
      placeholder="Search notes"
      aria-label="Search notes"
      className={css.searchInput}
      onChange={e => onChange(e.target.value)}
    />
  );
}

export default SearchBox;
