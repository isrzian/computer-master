import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { client } from '../lib/schema'
import Input from '../components/Input'
import { useRef, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getRecords, server } from '../lib/server'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { pageSizeAtom } from '../lib/atoms'
// import { useDebounce } from 'use-debounce'
import { useAtom } from 'jotai'
import { isThereMoreData } from '../lib/isThereMoreData'
import Client from '../components/Client'
import Spinner from '../components/Spinner'
import { FaWindowClose } from 'react-icons/fa'

export default function Clients() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [animator] = useAutoAnimate({
    // I am a bad guy.
    disrespectUserMotionPreference: true,
  })

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useAtom(pageSizeAtom)

  // const [searchQuery, setSearchQuery] = useState<string>('')
  // const [debouncedQuery] = useDebounce(searchQuery, 300)

  const { control, handleSubmit, reset } = useForm<z.infer<typeof client>>({
    resolver: zodResolver(client),
  })

  const clients = useQuery({
    queryKey: ['clients', pageSize, page],
    queryFn: () =>
      getRecords<z.infer<typeof client>>({
        pathname: '/client',
        params: {
          pageSize,
          page,
        },
      }),
    keepPreviousData: true,
    enabled: !!page && !!pageSize,
  })

  const { mutate, isLoading } = useMutation({
    mutationKey: ['clients/create'],
    mutationFn: async (data: z.infer<typeof client>) => {
      Promise.allSettled([
        await server.post(`/client`, data),
        await new Promise((resolve) => setTimeout(resolve, 600)),
      ])
    },
    onSuccess: () => {
      clients.refetch()
      reset({})
      dialogRef.current?.close()
    },
  })

  return (
    <>
      <div className="flex flex-col gap-5 lg:gap-10">
        <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
          <h1 className="text-2xl font-bold">Клиенты</h1>
          <button
            className="w-full rounded-lg border border-pink-600 px-5 py-2.5 font-bold outline-none transition-colors hover:bg-pink-600 lg:w-fit"
            onClick={() => dialogRef.current?.showModal()}
          >
            Добавить клиента
          </button>
        </div>
        <div className="h-0.5 w-full bg-zinc-800" role="separator" />
        {/* <input
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2.5 px-5 py-2.5 text-white outline-none"
          placeholder="Поиск"
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
        <div className="flex flex-col items-center justify-between gap-5 lg:flex-row-reverse">
          <select
            className="w-full self-end rounded-lg border border-zinc-700 bg-zinc-800 p-2.5 text-white outline-none lg:w-fit"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setPage(1)
            }}
          >
            {[4, 8, 16].map((option) => (
              <option key={`${option}_page_size`} value={option}>
                Показывать {option} на странице
              </option>
            ))}
          </select>
          {clients.data && (
            <span className="self-start font-bold">
              Всего клиентов: {clients.data?.total}
            </span>
          )}
        </div>
        {clients.data && clients.data.items.length > 0 && (
          <div
            className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            ref={animator}
          >
            {clients.data.items.map((client) => (
              <Client key={client.id} {...client} />
            ))}
          </div>
        )}
        {clients.data && clients.data.total > pageSize && (
          <div className="flex flex-col items-center justify-center gap-2.5 py-5 lg:flex-row">
            <button
              type="button"
              className="w-full select-none rounded-lg bg-pink-600 px-5 py-2.5 font-bold text-white outline-none disabled:pointer-events-none disabled:opacity-50 lg:w-fit"
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
              disabled={page === 1}
            >
              Предыдущая страница
            </button>
            <button
              type="button"
              className="w-full select-none rounded-lg bg-pink-600 px-5 py-2.5 font-bold text-white outline-none disabled:pointer-events-none disabled:opacity-50 lg:w-fit"
              onClick={() => {
                if (
                  !clients.isPreviousData &&
                  isThereMoreData({
                    total: clients.data.total,
                    page,
                    pageSize,
                  })
                ) {
                  setPage((current) => current + 1)
                }
              }}
              disabled={
                clients.isPreviousData ||
                !isThereMoreData({
                  total: clients.data.total,
                  page,
                  pageSize,
                })
              }
            >
              Следующая страница
            </button>
          </div>
        )}
      </div>
      <dialog
        ref={dialogRef}
        className="container h-fit space-y-5 rounded-lg border border-zinc-700 bg-zinc-800 outline-none drop-shadow-md xl:max-w-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="py-2.5 text-xl font-bold text-white">
            Добавить нового клиента
          </h2>
          <button className="w-fit" onClick={() => dialogRef.current?.close()}>
            <FaWindowClose className="h-6 w-6 text-zinc-500 transition-colors hover:text-zinc-600" />
          </button>
        </div>
        <form
          className="flex w-full flex-col gap-2.5"
          onSubmit={handleSubmit((data) => mutate(data))}
        >
          <Input name="initials" placeholder="Ф.И.О." control={control} />
          <Input name="email" placeholder="Эл. адрес" control={control} />
          <Input name="phone" placeholder="Номер телефона" control={control} />
          <div className="flex flex-col gap-2.5 lg:flex-row">
            <div className="w-full lg:w-1/3">
              <Input
                name="passportSeries"
                placeholder="Номер паспорта"
                control={control}
              />
            </div>
            <div className="w-full lg:w-2/3">
              <Input
                name="passportNumber"
                placeholder="Серия паспорта"
                control={control}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-end gap-2.5 py-5 lg:flex-row">
            <button
              type="button"
              className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-5 py-2.5 font-bold text-white outline-none transition-all hover:bg-zinc-700 lg:w-fit"
              onClick={() => dialogRef.current?.close()}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 font-bold text-white outline-none transition-all hover:bg-pink-700 lg:w-fit"
            >
              {isLoading ? (
                <Spinner className="h-6 w-6 animate-spin fill-white text-zinc-900" />
              ) : (
                'Добавить'
              )}
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
