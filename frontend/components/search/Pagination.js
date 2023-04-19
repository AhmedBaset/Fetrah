import { useRouter } from "next/router";
import classes from "./ManUserCard.module.css";
function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const MAX_PAGES = 1; // maximum number of pages to show

  totalPages = Math.ceil(totalPages);
  // create an array of page numbers from 1 to totalPages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // calculate the start and end indices of the pages to show
  let start = Math.max(0, currentPage - Math.floor(MAX_PAGES / 2));
  let end = Math.min(totalPages - 1, start + MAX_PAGES - 1);

  // adjust the start index if there are fewer pages to show
  start = Math.max(0, end - MAX_PAGES + 1);

  // create an array of page numbers to show
  const visiblePages = pages.slice(start, end + 1);

  const handlePageNumberClick = (page) => {
    const queryParams = { ...router.query, p: page };
    const stringParameters = Object.entries(queryParams).map(
      ([key, value]) => `${key}=${value}`
    );

    window.location.href = `${router.pathname}?${stringParameters.join("&")}`;
  };

  const renderPageLink = (page) => (
    <li key={page} className={classes["pli"]}>
      <div
        onClick={() => {
          handlePageNumberClick(page);
        }}
        className={
          parseInt(page) === parseInt(currentPage)
            ? classes["pa"]
            : classes["pa"]
        }
      >
        {page}
      </div>
    </li>
  );

  return (
    <ul className={classes["pul"]}>
      {currentPage > Math.ceil(MAX_PAGES / 2) && (
        <>
          {renderPageLink(1)}
          {start > 1 && <li>...</li>}
        </>
      )}

      {visiblePages.map(renderPageLink)}
      {currentPage < totalPages - Math.ceil(MAX_PAGES / 2) && (
        <>
          {end < totalPages - 1 && <li>...</li>}
          {renderPageLink(totalPages)}
        </>
      )}
    </ul>
  );
}

export default Pagination;
