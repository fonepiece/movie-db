import { Pagination } from "react-bootstrap";

const rangeInclusive = (start, end) => new Array(end - start + 1).fill().map((d, i) => i + start)

export default function MoviePagination({activePage, setPage, totalPage}) {
    const pageCount = Math.min(totalPage, 10);
    if (pageCount < 2) {
        return null;
    }
    const pages = rangeInclusive(1, pageCount);

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Pagination>
                <Pagination.First disabled={activePage == 1} onClick={() => setPage(1)} />
                <Pagination.Prev disabled={activePage == 1} onClick={() => setPage(activePage-1)} />
                {pages.map(page => <Pagination.Item onClick={() => setPage(page)} key={page} active={page === activePage}>
                    {page}
                </Pagination.Item>
                )}
                <Pagination.Next disabled={activePage == pageCount} onClick={() => setPage(activePage+1)} />
                <Pagination.Last disabled={activePage == pageCount} onClick={() => setPage(pageCount)} />
            </Pagination>
        </div>
    );
}