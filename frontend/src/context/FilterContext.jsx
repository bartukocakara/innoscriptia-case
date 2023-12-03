import React, { createContext, useMemo, useState } from 'react';

export const FilterContext = createContext({
    filters: {},
    matchFilters: {},
    searchStatus: {},
    updateMatchFilters: () => {},
});

export const FilterProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const [searchStatus, setSearchStatus] = useState({
        filters: false,
        search: true,
    });

    const [articleFilters, setArticleFilters] = useState({
        'preferences[]' : [],
    });


    const handlePerPage = (perPage) => {
        setCurrentPage(1)
        setPerPage(perPage)
    }

    const updateArticleFilters = (filterKey, value) => {
        setArticleFilters({...articleFilters,  [filterKey]: value} );
        setCurrentPage(1)
        setPerPage(perPage)
    };


    const contextValue = useMemo(() => {
        return {
            articleFilters,
            updateArticleFilters,
            searchStatus,
            setSearchStatus,
            pagination: {
                perPage,
                handlePerPage,
                currentPage,
                setCurrentPage,
                setPerPage,
          },
        };
      }, [
        articleFilters,
        updateArticleFilters,
        searchStatus,
        setSearchStatus,
        perPage,
        handlePerPage,
        currentPage,
        setCurrentPage,
        setPerPage,
      ]);

    return (
        <FilterContext.Provider value={contextValue}>
            {children}
        </FilterContext.Provider>
    );
};
