import React from "react"
import Paginator from "./Paginator"
import useFeedHook from "../../hooks/useFeed";
import PaginateTypes from "./PaginateTypes";
import Search from "./Search";
import Spinner from '../Spinner'
const Feed = ({ columns, 
                fetchUrl,
                filters,
                setFilters,
                searchPlaceholder,  
                multiSelect = null, 
                handleCheckboxClick = null,
                search='search',
                searchStatus,
                setSearchStatus,
                filterPagination,
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
                    filterPagination,
                    listCalendar,
                    setListCalendar
            });

    return (
        <>
            {
                data ?  (
                <>
                    <div className="row m-1">
                        <Search search={search}
                                searchPlaceholder={searchPlaceholder}
                                onInputChange={onInputChange} />
                        <PaginateTypes filterPagination={filterPagination}
                        />
                    </div>
                    <div className='row'>
                        {loading.list_data ? data.map( (item, index) => (
                            React.createElement(card, { 
                                                        data:item, 
                                                        index, 
                                                        columns,
                                                        handleCheckboxClick,
                                                        multiSelect,
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
                        ) ) : <div className="m-auto">
                            <Spinner />
                        </div>}
                   </div>
                    {data.length > 0 && (
                        <div className="mt-2">
                            <Paginator  pagination={pagination}
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