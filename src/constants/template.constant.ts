/**
 *
 * @param pageSize default page size
 * @returns
 */
// eslint-disable-next-line
export const PageData = (pageSize: number = 10, testContent: any[] = []) => ({
  content: testContent,
  empty: true,
  first: true,
  last: true,
  number: 0,
  numberOfElements: 0,
  size: pageSize,
  totalElements: 0,
  totalPages: 0,
});
