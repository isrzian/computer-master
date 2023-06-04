import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Select from 'react-select'
import { routes } from '../lib/routes'

export default function Header() {
  const { pathname } = useLocation()
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <header className="static top-0 hidden bg-black/10 px-2.5 py-5 backdrop-blur-md sm:block">
        <div className="container mx-auto flex w-full items-center justify-center px-2.5">
          <nav className="hidden grid-cols-3 gap-2.5 sm:grid">
            {routes.map(({ label, href }) => (
              <NavLink
                key={label}
                to={href}
                className="relative select-none px-5 py-2.5 text-center font-bold"
                draggable={false}
              >
                {label}
                {pathname === href && (
                  <motion.div
                    layoutId="isActive"
                    transition={{
                      duration: 0.25,
                    }}
                    className="absolute inset-0 -z-10 rounded-lg bg-zinc-800"
                  />
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <dialog
        ref={dialogRef}
        className="min-w-[768px] rounded-lg border border-zinc-700 bg-zinc-800 outline-none drop-shadow-md"
      >
        <form className="flex w-full flex-col gap-2.5 p-5">
          <input
            placeholder="Модель устройства"
            className="rounded-lg border border-zinc-600 bg-zinc-700 p-2.5 text-white outline-none"
          />
          <input
            placeholder="IMEI"
            className="rounded-lg border border-zinc-600 bg-zinc-700 p-2.5 text-white outline-none"
          />
          <input
            placeholder="Цвет корпуса устройства"
            className="rounded-lg border border-zinc-600 bg-zinc-700 p-2.5 text-white outline-none"
          />
          <input
            placeholder="Состояние устройства"
            className="rounded-lg border border-zinc-600 bg-zinc-700 p-2.5 text-white outline-none"
          />
          <div>
            <Select
              className="tw-select-container"
              classNamePrefix="tw-select"
            />
          </div>
          <div className="flex flex-row items-center justify-end gap-2.5">
            <button className="w-fit rounded-lg border border-zinc-600 bg-zinc-800 px-5 py-2.5 text-white outline-none">
              Отмена
            </button>
            <button className="w-fit rounded-lg bg-pink-600 px-5 py-2.5 text-white outline-none">
              Создать заказ
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
