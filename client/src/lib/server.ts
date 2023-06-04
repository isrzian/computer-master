import axios from 'axios'

export const server = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
})

export const getRecords = async <T>({
  pathname,
  params,
}: {
  pathname: '/material' | '/client' | '/order'
  params?: Record<string, string | number>
}) => {
  return server
    .get<{
      total: number
      items: Array<T & { id: number }>
    }>(pathname, {
      params,
    })
    .then((res) => res.data)
}
