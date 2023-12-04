import React, { createContext, useMemo, useState } from 'react';

export const FilterContext = createContext({
    filters: {},
    articleFilters: {},
    searchStatus: {},
    updateArticleFilters: () => {},
});

export const FilterProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const preferences = localStorage.getItem('preferences') && JSON.parse(localStorage.getItem('preferences'))

    const [searchStatus, setSearchStatus] = useState({
        filters: false,
        search: true,
    });

    console.log(preferences);

    const [articleFilters, setArticleFilters] = useState({
        // 'category_ids[]' : preferences.categories.map((item) => [item.id]),
        // 'author_ids[]' : preferences.authors.map((item) => [item.id]),
        // 'source_ids[]' : preferences.sources.map((item) => [item.id]),
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
