export const isThereMoreData = ({
  total,
  pageSize,
  page,
}: {
  total?: number
  pageSize: number
  page: number
}) => {
  if (!total) return false
  return total - pageSize * page > 0
}
