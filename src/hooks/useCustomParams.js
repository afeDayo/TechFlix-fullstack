// imports "useSearchParams" from react router dom to access and manage URL search parameters
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useCustomParams = (data) => {
  // Retrives the current URL search parameters.
  const [searchParams] = useSearchParams();

  // Initializies a state variable "" to store movies filtered based on search input.
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Gets the value of the "search" parameter from the URL. Defaults to an empty string if not found
  const searchInput = searchParams.get("search") ?? "";

  // Ensure that "data" is defined before performing any operation
  useEffect(() => {
    // Filters movies based on wether the title typed in the "serachedInput" ingnoring the case
    if (data) {
      const searchedMovies = data.filter((movie) => {
        return movie.title.toLowerCase().includes(searchInput.toLowerCase());
      });

      // Updates the filteredMovies state with the list of movies that matches the search input.
      setFilteredMovies(searchedMovies);
    }

    // useEffect runs whenever there are changes to "searchParams, data or searchInput"
  }, [searchParams, data, searchInput]);

  // Retruns userInput and filteredMovies so they can be used by the component that calls the hook.
  return { searchInput, filteredMovies };
};
