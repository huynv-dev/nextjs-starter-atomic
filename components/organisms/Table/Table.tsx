import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, Filter, Search } from 'lucide-react';
import { Pagination } from '@/components/molecules/Pagination/Pagination';
import { FilterDropdown } from './FilterDropdown';
import { ColumnType, Sorter, TableProps } from '@/types/table';
import classNames from 'classnames';

export default function Table<T extends Record<string, any>>({
  columns,
  dataSource = [],
  rowKey,
  className,
  size = 'large',
  bordered = true,
  loading = false,
  pagination = true,
  rowSelection,
  expandable,
  scroll,
  showHeader = true,
  title,
  footer,
  rowClassName,
  rowHoverable = true,
  onChange,
  onRow,
  onHeaderRow,
}: TableProps<T>) {
  // State management
  const [sortedInfo, setSortedInfo] = useState<{ columnKey?: string; order?: 'ascend' | 'descend' }>({});
  const [filteredInfo, setFilteredInfo] = useState<Record<string, any[]>>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(rowSelection?.selectedRowKeys || []);
  const [expandedRowKeys, setExpandedRowKeys] = useState<(string | number)[]>(expandable?.expandedRowKeys || expandable?.defaultExpandedRowKeys || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState<Record<string, boolean>>({});
  const selectAllRef = useRef<HTMLInputElement>(null);


  // Memoized processed data
  const processedData = useMemo(() => {
    let result = [...dataSource];

    // Apply filters
    Object.entries(filteredInfo).forEach(([columnKey, filterValues]) => {
      if (filterValues && filterValues.length > 0) {
        const column = columns.find(col => (col.key || col.dataIndex) === columnKey);
        if (column && column.onFilter) {
          result = result.filter(record =>
            filterValues.some(value => column.onFilter!(value, record))
          );
        }
      }
    });



    function getComparator<T>(sorter: Sorter<T>): ((a: T, b: T) => number) | undefined {
      if (typeof sorter === 'function') return sorter;
      if (typeof sorter === 'boolean') return;

      if (sorter?.compare) return sorter.compare;

      if (sorter.sortKey) {
        return (a, b) => {
          const aVal = typeof sorter.sortKey === 'function'
            ? sorter.sortKey(a)
            : a[sorter.sortKey as keyof T];

          const bVal = typeof sorter.sortKey === 'function'
            ? sorter.sortKey(b)
            : b[sorter.sortKey as keyof T];

          if (sorter.localeAware && typeof aVal === 'string' && typeof bVal === 'string') {
            return aVal.localeCompare(bVal);
          }

          if (aVal instanceof Date && bVal instanceof Date) {
            return aVal.getTime() - bVal.getTime();
          }

          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        };
      }

      return undefined;
    }

    // Apply sorting
    if (sortedInfo.columnKey && sortedInfo.order) {
      const column = columns.find(col => (col.key || col.dataIndex) === sortedInfo.columnKey);
      if (column && column.sorter) {
        const comparator = getComparator(column.sorter);
        if (comparator) {
          result.sort((a, b) => {
            const compareResult = comparator(a, b);
            return sortedInfo.order === 'ascend' ? compareResult : -compareResult;
          });
        }
      }
    }


    return result;
  }, [dataSource, filteredInfo, sortedInfo, columns]);

  // Paginated data
  const paginatedData = useMemo(() => {
    if (pagination === false) return processedData;
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage, pageSize, pagination]);


  const getNestedValue = (obj: any, path: string | string[]): any => {
    if (typeof path === 'string') {
      return obj[path];
    }
    return path.reduce((current, key) => current?.[key], obj);
  };

  const getRowKey = <T,>(record: T, rowKey: string | ((record: T) => string) | undefined, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    if (typeof rowKey === 'string') {
      return String(record[rowKey as keyof T]);
    }
    return String(index);
  };


  // Event handlers
  const handleSort = useCallback((column: ColumnType<T>) => {
    if (!column.sorter) return;

    const columnKey =
      (Array.isArray(column.key) ? column.key[0] : column.key) ||
      (Array.isArray(column.dataIndex) ? column.dataIndex[0] : column.dataIndex);

    let order: 'ascend' | 'descend' | undefined;

    if (sortedInfo.columnKey === columnKey) {
      order = sortedInfo.order === 'ascend' ? 'descend' : sortedInfo.order === 'descend' ? undefined : 'ascend';
    } else {
      order = 'ascend';
    }

    const newSortInfo = { columnKey: order ? columnKey : undefined, order };
    setSortedInfo(newSortInfo);

    onChange?.(
      pagination ? { current: currentPage, pageSize, total: processedData.length } : false,
      filteredInfo,
      newSortInfo,
      { currentDataSource: processedData, action: 'sort' }
    );
  }, [sortedInfo, onChange, currentPage, pageSize, processedData, filteredInfo, pagination]);


  const handleFilter = useCallback((columnKey: string, filterValues: any[]) => {
    const newFilteredInfo = { ...filteredInfo, [columnKey]: filterValues };
    if (filterValues.length === 0) {
      delete newFilteredInfo[columnKey];
    }

    setFilteredInfo(newFilteredInfo);
    setCurrentPage(1);

    onChange?.(
      pagination ? { current: 1, pageSize, total: processedData.length } : false,
      newFilteredInfo,
      sortedInfo,
      { currentDataSource: processedData, action: 'filter' }
    );
  }, [filteredInfo, onChange, pageSize, processedData, sortedInfo, pagination]);

  const handleRowSelection = useCallback((recordKey: string | number, record: T, selected: boolean) => {
    let newSelectedKeys: (string | number)[];

    if (rowSelection?.type === 'radio') {
      newSelectedKeys = selected ? [recordKey] : [];
    } else {
      newSelectedKeys = selected
        ? [...selectedRowKeys, recordKey]
        : selectedRowKeys.filter(key => key !== recordKey);
    }

    setSelectedRowKeys(newSelectedKeys);
    const selectedRows = dataSource.filter(record =>
      newSelectedKeys.includes(getRowKey(record, rowKey, dataSource.indexOf(record)))
    );

    rowSelection?.onChange?.(newSelectedKeys, selectedRows);
    rowSelection?.onSelect?.(record, selected, selectedRows, new Event('click'));
  }, [selectedRowKeys, rowSelection, dataSource, rowKey]);

  const handleSelectAll = useCallback((selected: boolean) => {
    const allKeys = paginatedData.map((record, index) => getRowKey(record, rowKey, index));
    const newSelectedKeys = selected
      ? [...new Set([...selectedRowKeys, ...allKeys])]
      : selectedRowKeys.filter((key: any) => !allKeys.includes(key));

    setSelectedRowKeys(newSelectedKeys);
    const selectedRows = dataSource.filter(record =>
      newSelectedKeys.includes(getRowKey(record, rowKey, dataSource.indexOf(record)))
    );

    rowSelection?.onChange?.(newSelectedKeys, selectedRows);
    rowSelection?.onSelectAll?.(selected, selectedRows, selected ? paginatedData : []);
  }, [paginatedData, selectedRowKeys, rowSelection, dataSource, rowKey]);

  const handleExpand = useCallback((recordKey: string | number, record: T, expanded: boolean) => {
    const newExpandedKeys = expanded
      ? [...expandedRowKeys, recordKey]
      : expandedRowKeys.filter(key => key !== recordKey);

    setExpandedRowKeys(newExpandedKeys);
    expandable?.onExpand?.(expanded, record);
    expandable?.onExpandedRowsChange?.(newExpandedKeys);
  }, [expandedRowKeys, expandable]);

  const handlePaginationChange = useCallback((page: number, size?: number) => {
    setCurrentPage(page);
    if (size !== undefined) {
      setPageSize(size);
    }

    onChange?.(
      { current: page, pageSize: size ?? pageSize, total: processedData.length },
      filteredInfo,
      sortedInfo,
      { currentDataSource: processedData, action: 'paginate' }
    );
  }, [onChange, processedData, filteredInfo, sortedInfo, pageSize]);


  // Render helpers
  const renderSortIcon = (column: ColumnType<T>) => {
    if (!column.sorter) return null;

    const columnKey = column.key || column.dataIndex;
    const isActive = sortedInfo.columnKey === columnKey;

    return (
      <span className="ml-1 inline-flex flex-col">
        <ChevronUp
          className={`h-3 w-3 ${isActive && sortedInfo.order === 'ascend' ? 'text-blue-500' : 'text-gray-400'}`}
        />
        <ChevronDown
          className={`h-3 w-3 -mt-1 ${isActive && sortedInfo.order === 'descend' ? 'text-blue-500' : 'text-gray-400'}`}
        />
      </span>
    );
  };

  const renderFilterIcon = (column: ColumnType<T>) => {
    if (!column.filters && !column.filterSearch) return null;

    const columnKey = (column.key || column.dataIndex) as string;
    const isFiltered = filteredInfo[columnKey]?.length > 0;


    return (
      <div className="relative mr-3 inline-block">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setFilterDropdownVisible(prev => ({
              ...prev,
              [columnKey!]: !prev[columnKey!]
            }));
          }}
          className={`p-1 hover:bg-gray-100 rounded ${isFiltered ? 'text-blue-500' : 'text-gray-400'}`}
        >
          {typeof column.filterIcon === 'function'
            ? column.filterIcon(isFiltered)
            : column.filterIcon || <Filter className="h-3 w-3" />}

        </button>
        <FilterDropdown
          column={column}
          filteredValue={filteredInfo[columnKey!] || []}
          onFilter={(values) => handleFilter(columnKey!, values)}
          visible={filterDropdownVisible[columnKey!] || false}
          onVisibleChange={(visible) => setFilterDropdownVisible(prev => ({
            ...prev,
            [columnKey!]: visible
          }))}
        />
      </div>
    );
  };




  const visibleColumns = columns.filter(col => !col.hidden);
  const hasRowSelection = !!rowSelection;
  const hasExpandable = !!expandable?.expandedRowRender;

  useEffect(() => {
    if (selectAllRef.current) {
      const allSelected = paginatedData.length > 0 && paginatedData.every(record =>
        selectedRowKeys.includes(getRowKey(record, rowKey, paginatedData.indexOf(record)))
      );
      const partiallySelected = selectedRowKeys.length > 0 && !allSelected;

      selectAllRef.current.indeterminate = partiallySelected;
    }
  }, [selectedRowKeys, paginatedData]);

  // Size classes
  const sizeClasses = {
    large: 'p-4',
    middle: 'p-3',
    small: 'p-2'
  };

  const maxHeight = typeof scroll?.y === 'string' || typeof scroll?.y === 'number' ? scroll.y : undefined;
  const maxWidth = typeof scroll?.x === 'string' || typeof scroll?.x === 'number' ? scroll.x : undefined;

  return (
    <div className={`${className || ''}`}>
      {title && (
        <div className="mb-4">
          {typeof title === 'function' ? title(paginatedData) : title}
        </div>
      )}



      <div
        className={`overflow-auto ${bordered ? 'border rounded-lg' : ''}`}
        style={{ maxHeight, maxWidth }}
      >
        <table
          className={`min-w-full border-collapse`}
          style={{ width: scroll?.x && scroll.x !== true ? scroll.x : undefined }}
        >
          {showHeader && (
            <thead className="bg-gray-50" {...(onHeaderRow ? onHeaderRow(visibleColumns) : {})}>
              <tr>
                {hasRowSelection && (
                  <th className={`${sizeClasses[size]} text-center border-b`} style={{ width: rowSelection.columnWidth || '32px' }}>
                    {rowSelection.type !== 'radio' && !rowSelection.hideSelectAll && (
                      <input
                        ref={selectAllRef}
                        type="checkbox"
                        checked={
                          paginatedData.length > 0 &&
                          paginatedData.every(record =>
                            selectedRowKeys.includes(getRowKey(record, rowKey, paginatedData.indexOf(record)))
                          )
                        }
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    )}
                    {rowSelection.columnTitle}
                  </th>
                )}

                {hasExpandable && expandable.showExpandColumn !== false && (
                  <th className={`${sizeClasses[size]} text-center border-b`} style={{ width: expandable.columnWidth || '32px' }}>
                    {expandable.columnTitle}
                  </th>
                )}

                {visibleColumns.map((column, index) => {
                  const columnKey = column.key || column.dataIndex || index;
                  const fixedClass =
                    column.fixed === 'left'
                      ? 'sticky left-0 z-100  bg-gray-50'
                      : column.fixed === 'right'
                        ? 'sticky right-0 z-100   bg-gray-50'
                        : '';
                  return (
                    <th
                      key={columnKey}
                      className={`
                        ${sizeClasses[size]} text-sm font-medium text-gray-700 border-b 
                        ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'} 
                        ${column.sorter ? 'cursor-pointer hover:bg-gray-100' : ''} 
                        ${column.className || ''}
                        ${fixedClass}`
                      }
                      style={{ width: column.width, minWidth: column.minWidth }}
                      onClick={() => handleSort(column)}
                      {...(column.onHeaderCell ? column.onHeaderCell(column) : {})}
                    >
                      <div className="flex items-center justify-evenly">
                        <span className={column.ellipsis ? 'truncate' : ''}>
                          {typeof column.title === 'function'
                            ? column.title({ sortOrder: sortedInfo.order, sortColumn: column, filters: filteredInfo })
                            : column.title
                          }
                        </span>
                        <div className="flex items-center">
                          {renderSortIcon(column)}
                          {renderFilterIcon(column)}
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
          )}

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={visibleColumns.length + (hasRowSelection ? 1 : 0) + (hasExpandable ? 1 : 0)}>
                  <div className="flex items-center justify-center py-8">
                    <div role="progressbar" className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((record, rowIndex) => {
                const recordKey = getRowKey(record, rowKey, rowIndex);
                const isSelected = selectedRowKeys.includes(recordKey);
                const isExpanded = expandedRowKeys.includes(recordKey);
                const canExpand = !expandable?.rowExpandable || expandable.rowExpandable(record);
                function objToClass(obj: Record<string, boolean | undefined>): string {
                  return Object.entries(obj)
                    .filter(([_, value]) => !!value)
                    .map(([key]) => key)
                    .join(' ');
                }
                const onRowProps = onRow ? onRow(record, rowIndex) : {};

                const combinedOnClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
                  if (onRowProps.onClick) {
                    onRowProps.onClick(event);
                  }
                  if (expandable?.expandRowByClick) {
                    handleExpand(recordKey, record, !isExpanded);
                  }
                };

                return (
                  <React.Fragment key={recordKey}>
                    <tr
                      className={classNames(
                        { 'hover:bg-gray-50': rowHoverable },
                        typeof rowClassName === 'function'
                          ? rowClassName(record, rowIndex)
                          : typeof rowClassName === 'object'
                            ? objToClass(rowClassName)
                            : rowClassName || '',
                        { 'bg-blue-50': isSelected }
                      )}
                      {...onRowProps}
                      onClick={combinedOnClick}
                    >

                      {hasRowSelection && (
                        <td className={`${sizeClasses[size]} text-center border-b`}>
                          <input
                            type={rowSelection.type || 'checkbox'}
                            checked={isSelected}
                            onChange={(e) => handleRowSelection(recordKey, record, e.target.checked)}
                            {...(rowSelection.getCheckboxProps ? rowSelection.getCheckboxProps(record) : {})}
                          />
                        </td>
                      )}

                      {hasExpandable && expandable.showExpandColumn !== false && (
                        <td className={`${sizeClasses[size]} text-center border-b`}>
                          {canExpand && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExpand(recordKey, record, !isExpanded);
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              {expandable.expandIcon ?
                                expandable.expandIcon({ expanded: isExpanded, onExpand: () => handleExpand(recordKey, record, !isExpanded), record }) :
                                <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                              }
                            </button>
                          )}
                        </td>
                      )}

                      {visibleColumns.map((column, colIndex) => {
                        const value = column.dataIndex ? getNestedValue(record, column.dataIndex) : undefined;
                        const fixedClass =
                          column.fixed === 'left'
                            ? 'sticky left-0 z-[1] bg-white'
                            : column.fixed === 'right'
                              ? 'sticky right-0 z-[1] bg-white'
                              : '';
                        return (
                          <td
                            key={column.key || column.dataIndex || colIndex}
                            className={`
                              ${sizeClasses[size]} text-sm text-gray-800 border-b 
                              ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
                              ${fixedClass}
                              ${column.className || ''}`
                            }
                            style={{ width: column.width, minWidth: column.minWidth }}
                            {...(column.onCell ? column.onCell(record, rowIndex) : {})}
                          >
                            <div className={column.ellipsis ? 'truncate' : ''}>
                              {column.render ? column.render(value, record, rowIndex) : value}
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {hasExpandable && isExpanded && canExpand && (
                      <tr>
                        <td
                          colSpan={visibleColumns.length + (hasRowSelection ? 1 : 0) + (hasExpandable ? 1 : 0)}
                          className="p-0 border-b"
                        >
                          <div style={{ paddingLeft: (expandable.indentSize || 15) * 2, backgroundColor: '#f9f9f9' }}>
                            {expandable.expandedRowRender!(record, rowIndex, 1, isExpanded)}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>

        </table>

        {paginatedData.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No data
          </div>
        )}
      </div>

      {
        footer && (
          <div className="mt-4">
            {typeof footer === 'function' ? footer(paginatedData) : footer}
          </div>
        )
      }


      {
        paginatedData.length !== 0 && pagination && (
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={processedData.length}
            onChange={handlePaginationChange}
            showSizeChanger={typeof pagination === 'object' ? pagination.showSizeChanger : false}
            showQuickJumper={typeof pagination === 'object' ? pagination.showQuickJumper : false}
            position={typeof pagination === 'object' ? pagination.position : 'end'}
          />
        )
      }
    </div >
  );
}
