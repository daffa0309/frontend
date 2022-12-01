import { Observable } from 'rxjs';

export interface DataService<T> {
  /**
   * Get all items of type to the API.
   * @param params - *(Optional)* Query Params to be passed to the API URL.
   */
  getAll?: (params?: { [key: string]: any }, ...args: any) => Observable<T[] | T>;

  /**
   * Search by the text string.
   * @param text - The ID of the item from database.
   */
  search?: (text?: string, ...args: any) => Observable<T[]>;

  /**
   * Get item by the ID number.
   * @param id - The ID of the item from database.
   * @param params - *(Optional)* Query params to be passed to the API URL, if needed.
   */
  getById?: (id: number, params?: { [key: string]: any }, ...args: any) => Observable<T>;

  /**
   * Get item by multiple ID numbers.
   * @param id - The ID of items from database.
   * @param params - *(Optional)* Query params to be passed to the API URL, if needed.
   */
  getByMultipleId?: (
    id: number[],
    params?: { [key: string]: any },
    ...args: any
  ) => Observable<T[]>;

  /**
   * Create a new record to to the table.
   * @param data - Data payload, in JSON format. Adjust to the API request requirements.
   */
  create?: (data: { [key: string]: any }) => Observable<any>;

  /**
   * Create multiple records to to the table.
   * @param data - Data payload, in JSON format. Adjust to the API request requirements.
   */
  createMultiple?: (data: any[]) => Observable<any>;

  /**
   * Updates a record inside a table.
   * @param id - The ID of the item from database.
   * @param data - Data payload to be updated. Objects should be only the fields that wanted to be updated.
   */
  update?: (id: number, data: { [key: string]: any }) => Observable<any>;

  /**
   * Sends a delete request to database, generally hide the item using `VISIBLE` column.
   * @param id - The ID of the item from database.
   */
  delete?: (id: number) => Observable<any>;

  [reqFunc: string]: any;
}
