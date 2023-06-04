import { NavLink } from 'react-router-dom'
import { FaUserCog, FaBoxOpen, FaBusinessTime } from 'react-icons/fa'
import clsx from 'clsx'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md sm:hidden">
      <div className="container mx-auto flex w-full items-center justify-center px-2.5">
        <nav className="grid grid-cols-3 py-2.5">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              clsx(
                'relative flex w-fit select-none flex-col items-center justify-center gap-1 px-5 py-2.5 text-center font-bold',
                {
                  isActive: isActive,
                },
              )
            }
            draggable={false}
          >
            <FaBusinessTime className="icon h-6 w-6 transition-colors" />
            <span className="text-xs">Заказы</span>
          </NavLink>
          <NavLink
            to={'/clients'}
            className={({ isActive }) =>
              clsx(
                'relative flex w-fit select-none flex-col items-center justify-center gap-1 px-5 py-2.5 text-center font-bold',
                {
                  isActive: isActive,
                },
              )
            }
            draggable={false}
          >
            <FaUserCog className="icon h-6 w-6 transition-colors" />
            <span className="text-xs">Клиенты</span>
          </NavLink>
          <NavLink
            to={'/materials'}
            className={({ isActive }) =>
              clsx(
                'relative flex w-fit select-none flex-col items-center justify-center gap-1 px-5 py-2.5 text-center font-bold',
                {
                  isActive: isActive,
                },
              )
            }
            draggable={false}
          >
            <FaBoxOpen className="icon h-6 w-6 transition-colors" />
            <span className="text-xs">Материалы</span>
          </NavLink>
        </nav>
      </div>
    </footer>
  )
}
