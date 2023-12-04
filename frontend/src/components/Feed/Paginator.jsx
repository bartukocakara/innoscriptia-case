import React, { useEffect, useState } from "react"

const OFFSET = 4

const Paginator = ({ t, pagination, pageChanged, totalItems }) => {
    const [pageNumbers, setPageNumbers] = useState([])
    useEffect(() => {
        const setPaginationPages = () => {
            let pages = []
            const { last_page, current_page, to } = pagination
            if (!to) return []
            let fromPage = current_page - OFFSET
            if (fromPage < 1) fromPage = 1
            let toPage = fromPage + OFFSET * 2
            if (toPage >= last_page) {
                toPage = last_page
            }
            for (let page = fromPage; page <= toPage; page++) {
                pages.push(page)
            }
            setPageNumbers(pages)
        }

        setPaginationPages()
    }, [pagination])

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={"page-item m-1" + (pagination.current_page === 1 ? " disabled" : "")}>
                    <span className="user" onClick={() => pageChanged(1)}>
                        First -
                    </span>
                </li>
                <li className={"page-item m-1" + (pagination.current_page === 1 ? " disabled" : "")}>
                    <span className="user" onClick={() => pageChanged(pagination.current_page - 1)}>
                        Previous
                    </span>
                </li>
                {pageNumbers.filter((pageNumber) => Math.abs(pageNumber - pagination.current_page) <= 2).map((pageNumber, i) => {
                    return (
                        <li key={i}
                            className={
                                "page-item" + (pageNumber === pagination.current_page ? " page-item active" : "")
                            }
                            onClick={() => pageChanged(pageNumber)}
                        >
                            <span className="page-link user">
                                {pageNumber}
                            </span>
                        </li>
                    )
                })}

                <li className={"m-1" + (pagination.current_page === pagination.last_page ? " disabled" : "")}>
                    <span className="" onClick={() => pageChanged(pagination.current_page + 1)}>
                        Next -
                    </span>
                </li>
                <li className={"m-1" + (pagination.current_page === pagination.last_page ? " disabled" : "")}>
                    <span className="user" onClick={() => pageChanged(pagination.last_page)}>
                        Last
                    </span>
                </li>
                
            </ul>
            <div className="mt-2 ms-2 d-block">
                <i>
                    Showing {pagination.from} - {pagination.to} | total {pagination.total} datas.
                </i>
            </div>
        </nav>
    )
}

export default Paginator