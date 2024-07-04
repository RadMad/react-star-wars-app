import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface UseSearchHookOptions {
  initialSearchQuery?: string;
}

const useSearchHook = ({ initialSearchQuery = "" }: UseSearchHookOptions = {}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [searchQuery, setSearchQuery] = useState<string>(query.get("search") || initialSearchQuery);

  useEffect(() => {
    setSearchQuery(query.get("search") || "");
  }, [query]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const updateSearchQuery = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
  };

  const applySearchQuery = () => {
    navigate(`?search=${searchQuery}&page=1`, { replace: true });
  };

  return {
    searchQuery,
    handleSearchChange,
    updateSearchQuery,
    applySearchQuery,
  };
};

export default useSearchHook;
