import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

interface InputProps<FormValues extends FieldValues = FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'defaultValue'>,
    UseControllerProps<FormValues> {}

export default function Input<FormValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  shouldUnregister,
  ...inputProps
}: InputProps<FormValues>) {
  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  })

  return (
    <div className="flex flex-col gap-2.5">
      <input
        {...inputProps}
        className={clsx(
          'rounded-lg bg-zinc-700 p-2.5 text-white outline-none',
          {
            'border border-red-600': !!error,
            'border border-zinc-600 hover:border-zinc-500': !error,
          },
        )}
        defaultValue={field.value ?? undefined}
        onBlur={field.onBlur}
        onChange={field.onChange}
        ref={field.ref}
      />
      {!!error && (
        <span className="font-medium text-red-500">{error.message}</span>
      )}
    </div>
  )
}
