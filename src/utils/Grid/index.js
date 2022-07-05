import { merge } from 'lodash';
import { getGridRecords, deleteGridRecord } from './actions';

class Grid {
  /**
   * Get instance for utitlity
   * @param object
   * @return object
   */
  static getInstance(argsObj) {
    return new Grid(argsObj);
  }

  /**
   * Class initializer
   *
   * @param object
   * @param callback
   * @return void
   */
  constructor(argsObj) {
    this.url = argsObj.url; // Current action URL
    this.action = argsObj.action || getGridRecords; // Current action method
    this.dispatch = argsObj.dispatch;
    this.actionType = argsObj.actionType; // Action type
    this.extraParams = argsObj.extraParams || {};
    this.currentPage = parseInt(argsObj.currentPage) || 1; // Current page number
    this.rowsPerPage = 100; // Records per page
    this.sortByFieldName = 'createdAt'; // Table head column sort by field name
    this.sortType = 'DESC'; // Default sort type -1 (-1 - DESC, 1 - ASC)
  }

  /**
   * build the query
   * @return object
   */
  getQueryParams() {
    return {
      filter: merge(
        {
          // add key only if data available
          ...(this.sortByFieldName && {
            sort: this.sortType,
            sortBy: this.sortByFieldName
          }),
          page: this.currentPage - 1,
          size: this.rowsPerPage
        },
        this.extraParams
      )
    };
  }

  // Handle grid column filter keyDown
  handleColFiltersKeyDown = (e) => {
    // Call table header filter when user press 'Enter key'
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
      this.extraParams = {
        ...this.extraParams,
        [e.target.name]: e.target.value.trim()
      };
      this.handleFilter();
    }
  };

  // Handle grid column filter select input change
  handleColFiltersSelectChange(name, value) {
    this.updateColFiltersState(name, value);
  }

  // Handle grid column filter change
  handleColSorting = (columnName, sortType = 'descend') => {
    // ascend/descend keyword is from antd table sort. Convert to ASC and DESC
    if (this.sortByFieldName !== columnName) {
      this.sortByFieldName = columnName;
    }
    this.sortType = sortType === 'ascend' ? 'ASC' : 'DESC';
    this.getRecords();
  };

  // Handle the pagination click
  handlePaginateClick = (page, pageRows) => {
    this.currentPage = page;
    if (this.rowsPerPage !== pageRows) {
      this.resetPagination();
    }
    this.rowsPerPage = parseInt(pageRows);
    this.getRecords();
  };

  // Set additional parameters into queryparams
  setExtraParams(extraParams) {
    this.extraParams =
      extraParams && typeof extraParams === 'object'
        ? merge(this.extraParams, extraParams)
        : null;
  }

  // Method to remove extra param
  removeExtraParam(key = null) {
    if (!key) {
      this.extraParams = null;
    } else {
      delete this.extraParams[key];
    }
  }

  // Get the records for table
  getRecords(extraParams) {
    if (extraParams) {
      this.setExtraParams(extraParams);
    }
    return this.dispatch(
      this.action({
        url: this.url,
        actionType: this.actionType,
        queryParams: this.getQueryParams(extraParams)
      })
    );
  }

  // Handle the delete funtionality
  deleteRecord(deleteModalObj) {
    if (typeof deleteModalObj !== 'object') {
      // This is the error statement to the developers
      console.error('The "Delete Record" method arguments must be an object.');
      return;
    }

    const action = deleteModalObj.action || deleteGridRecord;
    return this.dispatch(action(deleteModalObj));
  }

  // Handle the column based filter
  handleFilter() {
    this.resetPagination();
    this.getRecords();
  }

  // Reset the pagination
  resetPagination = () => {
    this.currentPage = 1;
    this.rowsPerPage = 10;
  };

  // Make nessasray changes and get record after delete
  getRecordsAfterDelete() {
    this.getRecords();
  }
}

export default Grid;
