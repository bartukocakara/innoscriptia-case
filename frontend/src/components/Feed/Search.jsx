import React from 'react'

const Search = (props) => {
    return (
        <div className="col-xl-6 col-lg-6 col-md-9 col-sm-12 filtered-list-search">
            <input
                type="text" className="form-control product-search" 
                id={props.search}
                placeholder={props.searchPlaceholder}
                onChange={(e) => props.onInputChange(e)}
            />
        </div>
    )
}

export default Search