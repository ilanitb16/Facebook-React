import "./Search.css";
import { useRef } from "react";

function Search({ doSearch}) {
  const searchBox = useRef(null);

  const search = function () {
    doSearch(searchBox.current.value);
  };

  return (
    <div className="row">
    <div className="col-3">
        <label></label>
      </div>
    <div className="main-content search-row">
      <div className="search col-5">
        <div className="searchLine input-group mb-3 p-2">
          <input
            ref={searchBox}
            onKeyUp={search}
            type="text"
            className="form-control txt-input"
            placeholder="Search post"
            label="Search"
            aria-describedby="button-addon2"
          ></input>
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={search}
          >
            <i className="bi bi-search me-3"></i>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
export default Search;
