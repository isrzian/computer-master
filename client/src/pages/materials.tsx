import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { material } from '../lib/schema'
import Input from '../components/Input'
import { Fragment, useRef, useState } from 'react'
import Textarea from '../components/Textarea'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getRecords, server } from '../lib/server'
import Material from '../components/Material'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { pageSizeAtom } from '../lib/atoms'
// import { useDebounce } from 'use-debounce'
import { useAtom } from 'jotai'
import { isThereMoreData } from '../lib/isThereMoreData'
import Spinner from '../components/Spinner'
import { FaWindowClose } from 'react-icons/fa'

export default function Materials() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [animator] = useAutoAnimate({
    // I am a bad guy.
    disrespectUserMotionPreference: true,
  })

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useAtom(pageSizeAtom)

  // const [searchQuery, setSearchQuery] = useState<string>('')
  // const [debouncedQuery] = useDebounce(searchQuery, 300)

  const { control, handleSubmit, reset } = useForm<z.infer<typeof material>>({
    resolver: zodResolver(material),
  })

  const materials = useQuery({
    queryKey: ['materials', pageSize, page],
    queryFn: () =>
      getRecords<z.infer<typeof material>>({
        pathname: '/material',
        params: {
          pageSize,
          page,
        },
      }),
    keepPreviousData: true,
  })

  const { mutate, isLoading } = useMutation({
    mutationKey: ['materials/create'],
    mutationFn: async (data: z.infer<typeof material>) => {
      Promise.allSettled([
        await server.post(`/material`, data),
        await new Promise((resolve) => setTimeout(resolve, 600)),
      ])
    },
    onSuccess: () => {
      materials.refetch()
      reset({
        name: '',
        description: '',
        cost: undefined,
        count: undefined,
      })
      dialogRef.current?.close()
    },
  })

  if (!materials.data) return null

  return (
    <>
      <div className="flex flex-col gap-5 lg:gap-10">
        <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
          <h1 className="text-2xl font-bold">Материалы</h1>
          <button
            className="w-full rounded-lg border border-pink-600 px-5 py-2.5 font-bold outline-none transition-colors hover:bg-pink-600 lg:w-fit"
            onClick={() => dialogRef.current?.showModal()}
          >
            Добавить материал
          </button>
        </div>
        <div className="h-0.5 w-full bg-zinc-800" role="separator" />
        {/* <input
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2.5 px-5 py-2.5 text-white outline-none"
          placeholder="Поиск"
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
        <Fragment>
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
            {materials.data && (
              <span className="self-start font-bold">
                Всего материалов: {materials.data?.total}
              </span>
            )}
          </div>
          {materials.data && materials.data.items.length > 0 && (
            <div
              className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              ref={animator}
            >
              {materials.data.items.map((material) => (
                <Material key={material.id} {...material} />
              ))}
            </div>
          )}
          {materials.data && materials.data.total > pageSize && (
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
                    !materials.isPreviousData &&
                    isThereMoreData({
                      total: materials.data.total,
                      page,
                      pageSize,
                    })
                  ) {
                    setPage((current) => current + 1)
                  }
                }}
                disabled={
                  materials.isPreviousData ||
                  !isThereMoreData({
                    total: materials.data.total,
                    page,
                    pageSize,
                  })
                }
              >
                Следующая страница
              </button>
            </div>
          )}
        </Fragment>
      </div>
      <dialog
        ref={dialogRef}
        className="container h-fit space-y-5 rounded-lg border border-zinc-700 bg-zinc-800 outline-none drop-shadow-md xl:max-w-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="py-2.5 text-xl font-bold text-white">
            Добавить новый материал
          </h2>
          <button className="w-fit" onClick={() => dialogRef.current?.close()}>
            <FaWindowClose className="h-6 w-6 text-zinc-500 transition-colors hover:text-zinc-600" />
          </button>
        </div>
        <form
          className="flex w-full flex-col gap-2.5"
          onSubmit={handleSubmit((data) => mutate(data))}
        >
          <Input name="name" placeholder="Название" control={control} />
          <Textarea
            name="description"
            placeholder="Описание"
            control={control}
          />
          <Input
            name="count"
            placeholder="Количество"
            control={control}
            type="number"
          />
          <Input
            name="cost"
            placeholder="Стоимость"
            control={control}
            type="number"
          />
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
