import { useRef } from 'react'
import { z } from 'zod'
import { client, material, order } from '../lib/schema'
import clsx from 'clsx'
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { getRecords, server } from '../lib/server'
import { FaRegFilePdf, FaWindowClose } from 'react-icons/fa'
import Spinner from './Spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Multiselect from './Multiselect'
import Input from './Input'
import Textarea from './Textarea'
import { status } from '../lib/status'

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
  const currentClient = useQuery({
    queryKey: [`client/${clientId}`],
    queryFn: () =>
      server
        .get<z.infer<typeof client> & { id: number }>(`client/${clientId}`)
        .then((res) => res.data)
        .then((data) => {
          return { value: data.id, label: data.initials }
        }),
    enabled: !!clientId,
  })

  const currrentMaterials = useQueries({
    queries:
      materialsIds && materialsIds.length > 0
        ? materialsIds.map((materialId) => {
            return {
              queryKey: [`material/${materialId}`],
              queryFn: () =>
                server
                  .get<z.infer<typeof material> & { id: number }>(
                    `material/${materialId}`,
                  )
                  .then((res) => res.data),
            }
          })
        : [],
  })

  const actualMaterials = currrentMaterials.map((material) => {
    return {
      value: material.data?.id || 0,
      label: material.data?.name || '',
    }
  })

  const status = {
    label: isDone ? 'Заказ завершен' : 'Заказ в работе',
    value: isDone,
  }

  if (currentClient.isLoading) return null

  return (
    <Content
      id={id}
      phoneView={phoneView}
      phoneModel={phoneModel}
      phonePassword={phonePassword}
      phoneColor={phoneColor}
      imei={imei}
      isDone={isDone}
      materialsIds={materialsIds}
      clientId={clientId}
      clientInput={currentClient.data || { value: 0, label: '' }}
      materialsInput={actualMaterials}
      isDoneInput={status}
    />
  )
}

const Content = ({
  id,
  phoneView,
  phoneModel,
  phonePassword,
  phoneColor,
  imei,
  isDone,
  materialsIds,
  clientId,
  clientInput,
  materialsInput,
  isDoneInput,
}: z.infer<typeof order> & { id: number }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof order>>({
    resolver: zodResolver(
      order.omit({
        materialsIds: true,
        clientId: true,
        isDone: true,
      }),
    ),
    defaultValues: {
      phoneView,
      phoneModel,
      phonePassword,
      phoneColor,
      imei,
      materialsIds,
      clientId,
      clientInput,
      materialsInput,
      isDone,
      isDoneInput,
    },
  })

  const clients = useQuery({
    queryKey: ['clients/transformed'],
    queryFn: () =>
      getRecords<z.infer<typeof client>>({
        pathname: '/client',
      }).then((res) =>
        res.items.map((item) => {
          return {
            value: item.id,
            label: item.initials,
          }
        }),
      ),
    keepPreviousData: true,
  })

  const materials = useQuery({
    queryKey: ['materials/transformed'],
    queryFn: () =>
      getRecords<z.infer<typeof material>>({
        pathname: '/material',
      }).then((res) =>
        res.items.map((item) => {
          return {
            value: item.id,
            label: item.name,
          }
        }),
      ),
    keepPreviousData: true,
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationKey: [`order/${id}/edit`],
    mutationFn: async (data: z.infer<typeof order>) => {
      Promise.allSettled([
        await server.post(`/order/${id}`, data),
        await new Promise((resolve) => setTimeout(resolve, 600)),
      ])
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders'])
      dialogRef.current?.close()
    },
  })

  const report = useMutation({
    mutationKey: [`order/${id}/report`],
    mutationFn: async () => {
      Promise.allSettled([
        await server.get(`/order/generate/report`),
        await new Promise((resolve) => setTimeout(resolve, 600)),
      ])
    },
  })

  return (
    <>
      <div className="relative flex flex-col gap-2.5 rounded-xl bg-black/10 p-5 backdrop-blur-md">
        <div>
          <div className="flex flex-row items-baseline justify-between">
            <span className="text-xs text-zinc-500">Номер заказа {id}</span>
            <button
              onClick={() => report.mutate()}
              className="w-fit text-zinc-500 outline-none transition-colors hover:text-zinc-200"
            >
              <FaRegFilePdf />
            </button>
          </div>
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
          onClick={() => dialogRef.current?.showModal()}
          className="rounded-lg bg-pink-600 px-5 py-2.5 font-bold outline-none transition-all hover:bg-pink-700"
        >
          Информация о заказе
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
            <FaWindowClose className="h-6 w-6 text-zinc-500 transition-colors hover:text-zinc-200" />
          </button>
        </div>
        <form
          className="flex w-full flex-col gap-2.5"
          onSubmit={handleSubmit((data) =>
            mutate({
              ...data,
              isDone: data.isDoneInput?.value || false,
              materialsIds: data.materialsInput.map((item) => item.value),
              clientId: data.clientInput.value,
            }),
          )}
        >
          <Multiselect
            name="clientInput"
            href="/clients"
            tooltip="Добавить нового клиента"
            control={control}
            placeholder="Клиент"
            options={clients.data}
          />
          <Input
            name="phoneModel"
            placeholder="Модель устройства"
            control={control}
          />
          <Input
            name="phonePassword"
            placeholder="Пароль устройства"
            control={control}
          />
          <Input name="imei" placeholder="IMEI" control={control} />
          <Input
            name="phoneColor"
            placeholder="Цвет устройства"
            control={control}
          />
          <Textarea
            name="phoneView"
            placeholder="Внешний вид устройства при сдаче"
            control={control}
          />
          <Multiselect
            name="materialsInput"
            href="/materials"
            tooltip="Добавить новый материал"
            control={control}
            placeholder="Материалы изготовления"
            isMulti
            options={materials.data}
          />
          <Multiselect
            name="isDoneInput"
            tooltip="Статус заказа"
            control={control}
            placeholder="Статус заказа"
            options={status}
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
              onClick={() => console.log(errors)}
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
