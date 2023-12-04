import React from "react"
import Paginator from "./Paginator"
import useFeedHook from "../../hooks/useFeed";
import PaginateTypes from "./PaginateTypes";
import Search from "./Search";

const Feed = ({ columns, 
                fetchUrl,
                filters,
                setFilters,
                searchPlaceholder,  
                multiSelect = null, 
                handleCheckboxClick = null,
                search='title',
                searchStatus,
                setSearchStatus,
                favoritedDatas,
                setFavoritedDatas,
                favoriteAction,
                filterPagination,
                setRole = null,
                t,
                storageKey= null,
                card,
                handleSingleSelect= null,
                selectedItem=null,
                setSelectedModalData,
                setShowModal,
                cardFooter,
                handleAction,
                handleSendRequest,
                listCalendar = false,
                setListCalendar
        }) => {
    const {
            loading,
            setLoading,
            data,
            pagination,
            systemMessage,
            onInputChange,
            } = useFeedHook({
                    columns,
                    fetchUrl,
                    filters,
                    setFilters,
                    searchStatus,
                    setSearchStatus,
                    favoritedDatas,
                    setFavoritedDatas,
                    filterPagination,
                    setRole,
                    listCalendar,
                    setListCalendar
            });

    return (
        <>
            {
                data ?  (
                <>
                    <div className="row m-1">
                        <Search t={t}
                                search={search}
                                searchPlaceholder={searchPlaceholder}
                                onInputChange={onInputChange} />
                        <PaginateTypes t={t}
                                    filterPagination={filterPagination}
                        />
                    </div>
                    <div className='row'>
                        {data.length > 0 && data.map( (item, index) => (
                            React.createElement(card, { 
                                                        data:item, 
                                                        index, 
                                                        t, 
                                                        columns,
                                                        handleCheckboxClick,
                                                        multiSelect,
                                                        storageKey,
                                                        favoriteAction,
                                                        favoritedDatas,
                                                        setShowModal,
                                                        setSelectedModalData,
                                                        cardFooter,
                                                        loading,
                                                        setLoading,
                                                        handleAction,
                                                        handleSendRequest,
                                                        handleSingleSelect,
                                                        selectedItem,
                                                       })
                        ) )}
                   </div>
                      
                    
                    {data.length > 0 && (
                        <div className="mt-2">
                            <Paginator
                                t={t}
                                pagination={pagination}
                                pageChanged={(page) => filterPagination.setCurrentPage(page)}
                                totalItems={data.length}
                            />
                        </div>
                    )
                }
                </>
                ) : 
                (
                    <>
                        <h6>No data found</h6>
                        <p className="text-danger">{systemMessage}</p>
                        <button className="btn btn-primary" 
                                onClick={() => {window.location.reload()}}
                                > 
                                Retry 
                        </button>
                    </>
                )
            }
        </>
    )
}

export default Feed