import React from 'react'

const PaginateTypes = (props) => {
    return (
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-9  ">
            <div className="d-flex m-auto">
                <label>{ props.t('per_page')}</label>
                <select className="form-control text-light" 
                        value={props.filterPagination.perPage} 
                        onChange={(e) => props.filterPagination.handlePerPage(e.target.value)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    )
}

export default PaginateTypes