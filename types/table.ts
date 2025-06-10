type SortOrder = 'ascend' | 'descend';

interface ColumnSorter<T> {
  compare?: (a: T, b: T) => number; // Hàm so sánh custom
  multiple?: number; // Ưu tiên khi sort nhiều cột
  defaultOrder?: SortOrder; // Thứ tự mặc định khi sort
  localeAware?: boolean; // Dùng localeCompare cho chuỗi
  sortKey?: keyof T | ((record: T) => any); // Lấy giá trị cần sort
}

export type Sorter<T> =
  | boolean
  | ((a: T, b: T) => number)
  | ColumnSorter<T>;

// Types
export interface ColumnType<T = any> {
  title?: React.ReactNode | (({ sortOrder, sortColumn, filters }: any) => React.ReactNode);
  dataIndex?: string | string[];
  key?: string;
  align?: 'left' | 'right' | 'center';
  width?: string | number;
  minWidth?: number;
  fixed?: boolean | 'left' | 'right';
  ellipsis?: boolean | { showTitle?: boolean };
  className?: string;
  hidden?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sorter?: Sorter<T>;
  filters?: { text: string; value: any }[];
  filterMultiple?: boolean;
  filterDropdown?: (props: {
    selectedKeys: string | string[];
    setSelectedKeys: (keys: string[]) => void;
    confirm: () => void;
    clearFilters?: () => void;
  }) => React.ReactNode;
  filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode);
  onFilter?: (value: any, record: T) => boolean;
  filterSearch?: ((input: string, record: any) => boolean) | boolean;
  onCell?: (record: T, rowIndex?: number) => any;
  onHeaderCell?: (column: ColumnType<T>) => any;
}

export interface RowSelection<T = any> {
  type?: 'checkbox' | 'radio';
  selectedRowKeys?: (string | number)[];
  columnWidth?: string | number;
  columnTitle?: React.ReactNode;
  getCheckboxProps?: (record: T) => any;
  hideSelectAll?: boolean;
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
  onSelect?: (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
}

export interface ExpandableConfig<T = any> {
  expandedRowKeys?: (string | number)[];
  defaultExpandedRowKeys?: (string | number)[];
  expandedRowRender?: (record: T, index: number, indent: number, expanded: boolean) => React.ReactNode;
  expandRowByClick?: boolean;
  expandIcon?: (props: { expanded: boolean; onExpand: Function; record: T }) => React.ReactNode;
  onExpand?: (expanded: boolean, record: T) => void;
  onExpandedRowsChange?: (expandedRowKeys: (string | number)[]) => void;
  rowExpandable?: (record: T) => boolean;
  indentSize?: number;
  showExpandColumn?: boolean;
  columnWidth?: string | number;
  columnTitle?: React.ReactNode;
}

export interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  pageSizeOptions?: number[];
  onChange: (page: number, pageSize?: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  position?: 'start' | 'center' | 'end'
}

export interface TableProps<T = any> {
  columns: ColumnType<T>[];
  dataSource?: T[];
  rowKey?: string | ((record: T) => string);
  className?: string;
  size?: 'large' | 'middle' | 'small';
  bordered?: boolean;
  loading?: boolean;
  pagination?: PaginationConfig | boolean | {
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    pageSizeOptions?: number[];
    position?: 'start' | 'center' | 'end'
  };
  rowSelection?: RowSelection<T>;
  expandable?: ExpandableConfig<T>;
  scroll?: { x?: string | number | true; y?: string | number };
  showHeader?: boolean;
  title?: (currentPageData?: T[]) => React.ReactNode;
  footer?: (currentPageData?: T[]) => React.ReactNode;
  rowClassName?: string | ((record: T, index: number) => string);
  rowHoverable?: boolean;
  sticky?: boolean | { offsetHeader?: number; offsetScroll?: number };
  virtual?: boolean;
  onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;
  onRow?: (record: T, index?: number) => any;
  onHeaderRow?: (columns: ColumnType<T>[], index?: number) => any;
}