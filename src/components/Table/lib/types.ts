export interface ITableColumn<T extends ITableRow = ITableRow> {
  id: keyof T;
  label: string;
  minWidth?: number;
  row?: (data: T) => React.ReactNode;
}

export interface ITableRow {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
