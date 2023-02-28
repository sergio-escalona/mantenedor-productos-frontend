import ReactPaginate from 'react-paginate';

export default function Paginate({ pages, setPage, ...props }) {
  const handlePageClick = event => {
    setPage(event.selected + 1);
  };
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pages}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      previousLinkClassName={'prevBtn'}
      nextLinkClassName={'nextBtn'}
      disabledClassName="pageDisable"
      activeClassName="pageActive"
    />
  );
}
