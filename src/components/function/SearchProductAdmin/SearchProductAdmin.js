import axios from "axios";
import { useState } from "react";

function SearchProductAdmin({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSave = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/products/?search=${searchValue}`,
      );
      onSearch(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <label>Search</label>
      <input
        type="text"
        placeholder="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSave}>save</button>
    </div>
  );
}

export default SearchProductAdmin;
