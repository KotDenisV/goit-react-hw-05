import s from './SearchBar.module.css';
import toast from 'react-hot-toast';

function SearchBar({ onSubmit }) {
    const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.query.value.trim();
    if (!query) {
      toast.error('Please enter a value to search for!');
      return;
    }
    onSubmit(query);
  };
    
    return (
      <div className={s.wrapper}>
        <form className={s.form} onSubmit={handleSubmit}>
          <input
            className={s.input}
            name="query"
            type="search"            
            placeholder="Search muvies"
          />
          <button className={s.button} type="submit">Search</button>
        </form>
      </div>
    )
}

export default SearchBar;