import clsx from 'clsx'
import { TextareaHTMLAttributes } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

interface TextareaProps<FormValues extends FieldValues = FieldValues>
  extends Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      'name' | 'defaultValue'
    >,
    UseControllerProps<FormValues> {}

export default function Textarea<FormValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  shouldUnregister,
  ...textareaProps
}: TextareaProps<FormValues>) {
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
      <textarea
        {...textareaProps}
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
