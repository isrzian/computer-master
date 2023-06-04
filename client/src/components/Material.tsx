import { Fragment, useRef } from 'react'
import { z } from 'zod'
import { material } from '../lib/schema'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { server } from '../lib/server'
import Input from './Input'
import Spinner from './Spinner'
import Textarea from './Textarea'
import { FaRegEdit, FaWindowClose } from 'react-icons/fa'

export default function Material({
  id,
  name,
  description,
  count,
  cost,
}: z.infer<typeof material> & { id: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { control, handleSubmit } = useForm<z.infer<typeof material>>({
    resolver: zodResolver(material),
    defaultValues: {
      name,
      description,
      count,
      cost,
    },
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationKey: [`materials/${id}/edit`],
    mutationFn: async (data: z.infer<typeof material>) => {
      Promise.allSettled([
        await server.post(`/material/${id}`, data),
        await new Promise((resolve) => setTimeout(resolve, 600)),
      ])
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['materials'])
      dialogRef.current?.close()
    },
  })

  return (
    <>
      <div
        className={clsx(
          'relative flex flex-col gap-5 rounded-xl bg-black/10 p-5 backdrop-blur-md',
        )}
      >
        <div>
          <div className="flex flex-row items-baseline justify-between">
            <h2 className="text-xl font-bold">{name}</h2>
            <button
              onClick={() => dialogRef.current?.showModal()}
              className="w-fit text-zinc-500 outline-none transition-colors hover:text-zinc-200"
            >
              <FaRegEdit />
            </button>
          </div>
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex flex-col gap-0">
          <span>
            {count === 0 ? (
              'Материал закончился'
            ) : (
              <Fragment>
                <span>Количество: </span>
                <span className="font-bold">{count} шт.</span>
              </Fragment>
            )}
          </span>
          <span>
            <span>Стоимость: </span>
            <span className="font-bold">₽{cost}</span>
          </span>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="container h-fit space-y-5 rounded-lg border border-zinc-700 bg-zinc-800 outline-none drop-shadow-md xl:max-w-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="py-2.5 text-xl font-bold text-white">
            Редактирование
          </h2>
          <button className="w-fit" onClick={() => dialogRef.current?.close()}>
            <FaWindowClose className="h-6 w-6 text-zinc-500 transition-colors hover:text-zinc-200" />
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
                <Spinner className="h-6 w-6 animate-spin fill-white text-zinc-700" />
              ) : (
                'Сохранить изменения'
              )}
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
