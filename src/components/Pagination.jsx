function Pagination({ getProducts, pageInfo }) {
  //換頁功能
  const handleChangePage = (e, page) => {
    e?.preventDefault();
    getProducts(page);
  };

  return (
    <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li
            onClick={(e) => {
              handleChangePage(e, pageInfo.current_page - 1);
            }}
            className={`page-item ${!pageInfo.has_pre && "disabled"}`}
          >
            <a className="page-link" href="#">
              上一頁
            </a>
          </li>
          {/* 將類陣列物件轉換為陣列，其值會是undefined */}
          {Array.from({ length: pageInfo.total_pages }).map((_, index) => (
            <li
              onClick={(e) => {
                handleChangePage(e, index + 1);
              }}
              className={`page-item ${
                pageInfo.current_page === index + 1 && "active"
              }`}
              key={index}
            >
              <a className="page-link" href="#">
                {index + 1}
              </a>
            </li>
          ))}

          <li
            className={`page-item ${!pageInfo.has_next && "disabled"}`}
            onClick={(e) => {
              handleChangePage(e, pageInfo.current_page + 1);
            }}
          >
            <a className="page-link" href="#">
              下一頁
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Pagination;
