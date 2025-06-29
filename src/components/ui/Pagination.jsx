import styles from "../../assets/styles/ui/Pagination.module.css";
import clsx from "clsx";

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  recordsPerPage,
  totalRecords,
  maxVisiblePages = 5, // Number of visible page buttons (excluding ellipsis)
}) => {
  const startIndex = (currentPage - 1) * recordsPerPage + 1;
  const endIndex = Math.min(currentPage * recordsPerPage, totalRecords);

  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    const pages = [];

    // Always show first page
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push("...");
      }
    }

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Always show last page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      <span className={styles.pageInfo}>
        Showing {startIndex} - {endIndex} of {totalRecords}
      </span>
      <div className={styles.pagination}>
        <button
          className={clsx(styles.pageButton, styles.prevNext)}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        {getPageNumbers().map((item, index) =>
          item === "..." ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={item}
              className={clsx(
                styles.pageButton,
                item === currentPage && styles.active
              )}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          )
        )}
        <button
          className={clsx(styles.pageButton, styles.prevNext)}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
