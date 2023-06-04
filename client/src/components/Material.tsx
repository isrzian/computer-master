import { Fragment } from 'react'
import { z } from 'zod'
import { material } from '../lib/schema'
import clsx from 'clsx'

export default function Material({
  name,
  description,
  count,
  cost,
}: z.infer<typeof material>) {
  return (
    <div
      className={clsx(
        'relative flex flex-col gap-5 rounded-xl bg-black/10 p-5 backdrop-blur-md',
        {
          'pointer-events-none opacity-50': count === 0,
        },
      )}
    >
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
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
  )
}
