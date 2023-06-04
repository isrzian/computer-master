import { z } from 'zod'
import { client } from '../lib/schema'

export default function Client({
  initials,
  phone,
  email,
  passportSeries,
  passportNumber,
}: z.infer<typeof client>) {
  return (
    <>
      <div className="relative flex flex-col gap-5 rounded-xl bg-black/10 p-5 backdrop-blur-md">
        <div className="flex flex-col">
          <h2 className="py-2.5 text-lg font-bold">{initials}</h2>
          <span className="font-medium">Эл. адрес: {email}</span>
          <span className="font-medium">Телефон: {phone}</span>
          <span className="font-medium">
            Паспортные данные: {passportSeries} {passportNumber}
          </span>
        </div>
      </div>
    </>
  )
}
