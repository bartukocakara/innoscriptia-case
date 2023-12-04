import { useEffect, useState } from "react";
import axios from 'axios';
import HttpService from "../services/HttpService";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const SORT_ASC = "asc";
const SORT_DESC = "desc";

const useFeedHook = ({
    columns,
    fetchUrl,
    filters,
    setFilters,
    searchStatus,
    setSearchStatus,
    favoritedDatas,
    setFavoritedDatas,
    filterPagination,
}) => {
    const [data, setData] = useState([]);
    const [sortColumn, setSortColumn] = useState(columns[0]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [pagination, setPagination] = useState({});
    const [systemMessage, setSystemMessage] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState({})

    const handleSort = (column) => {
        if (column === sortColumn) {
            sortOrder === SORT_ASC ? setSortOrder(SORT_DESC) : setSortOrder(SORT_ASC);
        } else {
            setSortColumn(column);
            setSortOrder(SORT_ASC);
        }
    };

    const onInputChange = (e) => {
        let { id, value } = e.target;
        if (
            value.length >= 3 &&
            value.length <= 15 &&
            value.length % 3 === 0 &&
            searchStatus?.search
        ) {
            setTimeout(() => {
                setFilters(id, value);
                setSearchStatus({ ...searchStatus, search: true });
            }, 1500);
            return;
        } else if (value.length === 0 && searchStatus?.search) {
            setTimeout(() => {
                setFilters(id, '');
                setSearchStatus({ ...searchStatus, search: true });
            }, 1500);
            return;
        }
        searchStatus['search'] = true;
    };

    useEffect(() => {
        const fetchData = async () => {
            let sport_type_id = localStorage.getItem('sport_type_id');
            setLoading({list_data: true});
            let params = {
                ...filters,
                sport_type_id,
                sort_field: sortColumn,
                sort_order: sortOrder,
                per_page: filterPagination.perPage,
                page: filterPagination.currentPage,
            };
            let http = new HttpService();
            let token = "Bearer " + JSON.parse(localStorage.getItem('token'));
            let url = http.url + fetchUrl;
            let headers = {
                'Authorization': token,
            };
            try {
                const response = await axios.get(url, { params, headers });
                if (response.status === 200) {
                    let responseData = response.data.result;
                    setData(responseData.data);
                    setLoading({list_data : false});
                    setPagination(responseData.meta);
                    setSystemMessage("");
                    if (favoritedDatas) {
                        let ids = responseData.data.map((item) => {
                            return item.favorite_id ? item.id : null;
                        });
                        setFavoritedDatas(ids);
                    }
                } else {
                    setLoading({list_data:false});
                }
            } catch (error) {
                console.log(error);
                let statusCode = error.response.status;
                if (statusCode === 401) {
                    navigate('/logout');
                } else if (statusCode === 500 || statusCode === 429) {
                    setSystemMessage("We are trying to work on scalable system. Please try after 1 minute.");
                } else if (statusCode === 403) {
                    navigate('/logout');
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'Cool',
                    });
                    console.log(error.message);
                }
            } finally {
                setLoading({list_data:false});
            }
        };
        
        if (searchStatus?.search || searchStatus?.filters || !filters) {
            fetchData(); // reset searchStatus to false
        }
    }, [filterPagination.perPage, 
        sortColumn, 
        sortOrder, 
        filterPagination.currentPage, 
        fetchUrl, 
        navigate, 
        searchStatus]);

    return {
        data,
        sortColumn,
        sortOrder,
        pagination,
        systemMessage,
        loading,
        setLoading,
        handleSort,
        onInputChange,
    };
};

export default useFeedHook;
