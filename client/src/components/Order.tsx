import { useRef } from 'react'
import { z } from 'zod'
import { client, completeOrder, order } from '../lib/schema'
import clsx from 'clsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { server } from '../lib/server'
import { FaWindowClose } from 'react-icons/fa'
import Spinner from './Spinner'

export default function Order({
  id,
  phoneView,
  phoneModel,
  phonePassword,
  phoneColor,
  imei,
  isDone,
  materialsIds,
  clientId,
}: z.infer<typeof order> & { id: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const currentClient = useQuery({
    queryKey: [`client/${clientId}`],
    queryFn: () =>
      server
        .get<z.infer<typeof client>>(`client/${clientId}`)
        .then((res) => res.data),
    enabled: !!clientId,
  })

  const { mutate, isLoading } = useMutation({
    mutationKey: [`orders/${id}/complete`],
    mutationFn: async (data: z.infer<typeof completeOrder>) =>
      server.post(`/order/${id}`, data),
  })

  // const currrentMaterials = useQueries({
  //   queries:
  //     materialsIds && materialsIds.length > 0
  //       ? materialsIds.map((materialId) => {
  //           return {
  //             queryKey: [`material/${materialId}`],
  //             queryFn: () =>
  //               server
  //                 .get<z.infer<typeof material>>(`material/${materialId}`)
  //                 .then((res) => res.data),
  //           }
  //         })
  //       : [],
  // })

  return (
    <>
      <div className="relative flex flex-col gap-2.5 rounded-xl bg-black/10 p-5 backdrop-blur-md">
        <div>
          <span className="text-xs text-zinc-500">Номер заказа {id}</span>
          <h2 className="text-lg font-bold">{phoneModel}</h2>
          <p className="text-sm">IMEI {imei}</p>
        </div>
        <div className="flex flex-row items-center gap-2 py-2.5">
          <div
            role="status"
            className={clsx('h-2.5 w-2.5 rounded-full', {
              'animate-pulse bg-yellow-400': !isDone,
              'bg-green-400': isDone,
            })}
          />
          <span>{isDone ? 'Заказ завершен' : 'Заказ в работе'}</span>
        </div>
        <button
          className="rounded-lg bg-pink-600 px-5 py-2.5 font-bold outline-none transition-all hover:bg-pink-700"
          onClick={() => dialogRef.current?.showModal()}
        >
          Подробнее
        </button>
      </div>
      <dialog
        ref={dialogRef}
        className="container h-fit space-y-5 rounded-lg border border-zinc-700 bg-zinc-800 outline-none drop-shadow-md xl:max-w-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="py-2.5 text-xl font-bold text-white">
            Информация о заказе №{id}
          </h2>
          <button className="w-fit" onClick={() => dialogRef.current?.close()}>
            <FaWindowClose className="h-6 w-6 text-zinc-500 transition-colors hover:text-zinc-600" />
          </button>
        </div>
        <div className="h-0.5 w-full bg-zinc-700" role="separator" />
        {currentClient.data && (
          <div className="flex flex-col gap-0 text-white">
            <h3 className="text-lg font-bold">Клиент</h3>
            <span>{currentClient.data.initials}</span>
          </div>
        )}
        <div className="flex flex-col gap-0 text-white">
          <h3 className="py-2.5 text-lg font-bold">Информация об устройстве</h3>
          <span>Модель: {phoneModel}</span>
          <span>Цвет корпуса: {phoneColor}</span>
          <span>IMEI: {imei}</span>
          <span>Пароль: {phonePassword}</span>
          <p>Состояние устройства при поступлении: {phoneView.toLowerCase()}</p>
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
            type="button"
            onClick={() =>
              mutate({
                phoneView,
                phoneModel,
                phonePassword,
                phoneColor,
                imei,
                materialsIds,
                clientId,
                isDone: !isDone,
              })
            }
            className="flex w-full items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 font-bold text-white outline-none transition-all hover:bg-pink-700 lg:w-fit"
          >
            {isLoading ? (
              <Spinner className="h-6 w-6 animate-spin fill-white text-zinc-900" />
            ) : isDone ? (
              'Повторно открыть заказ'
            ) : (
              'Завершить заказ'
            )}
          </button>
        </div>
      </dialog>
    </>
  )
}
