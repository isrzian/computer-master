import { z } from 'zod'
import { client } from '../lib/schema'
import { useRef } from 'react'
import { FaRegEdit, FaWindowClose } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { server } from '../lib/server'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Input from './Input'
import Spinner from './Spinner'

export default function Client({
  id,
  initials,
  phone,
  email,
  passportSeries,
  passportNumber,
}: z.infer<typeof client> & { id: number | string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const { control, handleSubmit } = useForm<z.infer<typeof client>>({
    resolver: zodResolver(client),
    defaultValues: {
      initials,
      phone,
      email,
      passportSeries,
      passportNumber,
    },
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationKey: [`clients/${id}/edit`],
    mutationFn: async (data: z.infer<typeof client>) => {
      Promise.allSettled([
        await server.post(`/client/${id}`, data),
        await new Promise((resolve) => setTimeout(resolve, 600)),
      ])
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['clients'])
      dialogRef.current?.close()
    },
  })

  return (
    <>
      <div className="relative flex flex-col gap-5 rounded-xl bg-black/10 p-5 backdrop-blur-md">
        <div className="flex flex-col">
          <div className="flex flex-row items-baseline justify-between">
            <h2 className="py-2.5 text-lg font-bold">{initials}</h2>
            <button
              onClick={() => dialogRef.current?.showModal()}
              className="w-fit text-zinc-500 outline-none transition-colors hover:text-zinc-200"
            >
              <FaRegEdit />
            </button>
          </div>
          <span className="font-medium">Эл. адрес: {email}</span>
          <span className="font-medium">Телефон: {phone}</span>
          <span className="font-medium">
            Паспортные данные: {passportSeries} {passportNumber}
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
                'Сохранить изменения'
              )}
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
