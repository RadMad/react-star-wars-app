import { useState, useEffect, useMemo, useCallback } from "react";
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

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const updateSearchQuery = useCallback((newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
  }, []);

  const applySearchQuery = useCallback(() => {
    navigate(`?search=${searchQuery}&page=1`, { replace: true });
  }, [navigate, searchQuery]);

  return {
    searchQuery,
    handleSearchChange,
    updateSearchQuery,
    applySearchQuery,
  };
};

export default useSearchHook;
