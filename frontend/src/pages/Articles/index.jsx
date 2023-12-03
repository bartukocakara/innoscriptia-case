import React, { useContext } from 'react'
import Feed from '../../components/Feed'
import { FilterContext } from '../../context/FilterContext';
import ArticleCard from '../../components/Cards/ArticleCard';
import CardFooter from '../../components/Cards/Footers/CardFooter';

export default function Index () {
    const { searchStatus, 
            setSearchStatus, 
            matchFilters, 
            updateMatchFilters,
            pagination
        } = useContext(FilterContext);



    return (
        <>
            <h4 className='ml-2'>
                match_list
            </h4>
            <div className="widget-content-area col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div className="list">
                    <Feed fetchUrl="/articles"
                          columns={[ 
                                  'title',
                                  'items',
                                  'gender',
                                  'court', 
                                  'price', 
                                  'city',
                                  'status', 
                                  'time',
                                  'date', 
                                  ]}
                          card={ArticleCard}
                          filters={{ ...matchFilters }}
                          searchStatus={searchStatus}
                          setSearchStatus={setSearchStatus}
                          setFilters={updateMatchFilters}
                          searchPlaceholder="search_articles"
                          filterPagination={pagination}
                          cardFooter={CardFooter}
                          listCalendar={true}
                          handleAction={ [
                            ]}
                    />
                </div>
            </div>
        </>
    )
}