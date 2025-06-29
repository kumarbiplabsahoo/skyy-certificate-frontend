import styles from './TopFilter.module.css';
import { FiSearch, FiDownload, FiCalendar, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';

export default function TopFilter({ 
  onSearch, 
  onDateFilter, 
  onExportPDF, 
  onExportXLSX, 
  onExportCSV,
  onBulkDelete,
  selectedCount = 0,
  isAllSelected
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  const applyDateFilter = () => {
    if (dateRange.from && dateRange.to) {
      onDateFilter(dateRange);
    }
  };

  return (
    <div className={styles.filterContainer}>
      {/* Bulk Delete Button (left side) */}
      {isAllSelected && (
        <button 
          onClick={onBulkDelete}
          className={styles.bulkDeleteButton}
          aria-label="Bulk delete"
        >
          <FiTrash2 className={styles.deleteIcon} />
          <span>Delete ({selectedCount})</span>
        </button>
      )}

      {/* Search Input */}
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search certificates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <FiSearch className={styles.searchIcon} />
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Date Range Filter */}
      <div className={styles.dateFilter}>
        <div className={styles.dateInputGroup}>
          <FiCalendar className={styles.dateIcon} />
          <input
            type="date"
            name="from"
            value={dateRange.from}
            onChange={handleDateChange}
            className={styles.dateInput}
            placeholder="From"
          />
          <span className={styles.dateSeparator}>to</span>
          <input
            type="date"
            name="to"
            value={dateRange.to}
            onChange={handleDateChange}
            className={styles.dateInput}
            placeholder="To"
          />
          <button 
            type="button" 
            onClick={applyDateFilter}
            className={styles.dateApplyButton}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Export Buttons */}
      <div className={styles.exportButtons}>
        <button 
          onClick={onExportPDF} 
          className={styles.exportButton}
          aria-label="Export PDF"
        >
          <FiDownload className={styles.exportIcon} />
          <span>PDF</span>
        </button>
        <button 
          onClick={onExportXLSX} 
          className={styles.exportButton}
          aria-label="Export Excel"
        >
          <FiDownload className={styles.exportIcon} />
          <span>Excel</span>
        </button>
        <button 
          onClick={onExportCSV} 
          className={styles.exportButton}
          aria-label="Export CSV"
        >
          <FiDownload className={styles.exportIcon} />
          <span>CSV</span>
        </button>
      </div>
    </div>
  );
}