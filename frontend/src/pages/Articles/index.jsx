import React, { useContext } from 'react'
import Feed from '../../components/Feed'
import { FilterContext } from '../../context/FilterContext';
import ArticleCard from '../../components/Cards/ArticleCard';
import CardFooter from '../../components/Cards/Footers/CardFooter';

export default function Index () {
    const { searchStatus, 
            setSearchStatus, 
            articleFilters, 
            updateArticleFilters,
            pagination
        } = useContext(FilterContext);

    return (
        <>
            <h4 className='ml-2'>
                Article List
            </h4>
            <div className="widget-content-area col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div className="list">
                    <Feed fetchUrl='/articles'
                          card={ArticleCard}
                          filters={{ ...articleFilters }}
                          searchStatus={searchStatus}
                          setSearchStatus={setSearchStatus}
                          setFilters={updateArticleFilters}
                          searchPlaceholder="search_articles"
                          filterPagination={pagination}
                          cardFooter={CardFooter}
                          handleAction={ [
                            ]}
                    />
                </div>
            </div>
        </>
    )
}