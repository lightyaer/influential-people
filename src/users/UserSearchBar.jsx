function UserSearchBar({ onInput, onSearch, onReset, searchTerm, onNew }) {
  const styles = {
    button: "border-2 border-cyan-900 rounded-2xl p-2 mr-2",
    search: "",
  };

  return (
    <div className="flex justify-between my-8">
      <div>
        <input
          className="border-2 rounded-2xl p-2 mr-2"
          type="text"
          value={searchTerm}
          onInput={onInput}
          placeholder="Search for a user"
        />
        <button className={styles.button} onClick={onSearch}>
          Search
        </button>
        <button className={styles.button} onClick={onReset}>
          Reset
        </button>
      </div>
      <div>
        <button className={styles.button} onClick={onNew}>
          New
        </button>
      </div>
    </div>
  );
}

export default UserSearchBar;
