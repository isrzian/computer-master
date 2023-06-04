import clsx from 'clsx'
import { useController, FieldValues, UseControllerProps } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import Select, { Props as SelectProps, GroupBase } from 'react-select'

interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option extends {
    value: number
    label: string
  } = {
    value: number
    label: string
  },
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Omit<SelectProps<Option, IsMulti, Group>, 'name' | 'defaultValue'>,
    UseControllerProps<FormValues> {
  href: string
  tooltip: string
}

const controlStyles = {
  base: 'border border-zinc-600 rounded-lg bg-zinc-700 hover:cursor-pointer text-white',
  focus: 'border-zinc-600 ring-1 ring-zinc-500',
  nonFocus: 'border-zinc-600 hover:border-zinc-500',
}
const placeholderStyles = 'text-zinc-400 pl-1 py-0.5'
const selectInputStyles = 'pl-1 py-0.5'
const valueContainerStyles = 'p-1 gap-1'
const singleValueStyles = 'leading-7 ml-1 text-white'
const multiValueStyles =
  'bg-zinc-800 text-white border border-zinc-600 rounded-lg items-center py-0.5 pl-2 pr-1 gap-1.5'
const multiValueLabelStyles = 'leading-6 py-0.5'
const multiValueRemoveStyles =
  'border border-zinc-200 bg-white hover:bg-pink-50 hover:text-pink-800 text-zinc-500 hover:border-pink-300 rounded-lg mx-2.5'
const indicatorsContainerStyles = 'p-1 gap-1'
const clearIndicatorStyles =
  'text-zinc-500 p-1 rounded-md hover:bg-red-50 hover:text-pink-800'
const indicatorSeparatorStyles = 'bg-zinc-600'
const dropdownIndicatorStyles = 'p-1 hover:bg-zinc-800 text-zinc-500 rounded-md'
const menuStyles =
  'p-1 mt-2 border border-zinc-600 bg-zinc-700 rounded-lg text-white/50'
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-zinc-500 text-sm'
const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded',
  focus: 'bg-zinc-800 active:bg-zinc-200',
  selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-zinc-300",
}
const noOptionsMessageStyles =
  'text-zinc-600 p-2 bg-zinc-700 border border-dashed border-zinc-600 rounded-sm'

function Multiselect<
  FormValues extends FieldValues = FieldValues,
  Option extends {
    value: number
    label: string
  } = {
    value: number
    label: string
  },
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  name,
  href,
  tooltip,
  options,
  control,
  rules,
  shouldUnregister,
  ...selectProps
}: ControlledSelectProps<FormValues, Option, IsMulti, Group>) {
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
      <Select
        {...selectProps}
        defaultValue={field.value ?? undefined}
        onBlur={field.onBlur}
        onChange={field.onChange}
        ref={field.ref}
        options={options}
        unstyled
        noOptionsMessage={() => 'Ничего не найдено'}
        styles={{
          input: (base) => ({
            ...base,
            'input:focus': {
              boxShadow: 'none',
            },
          }),
          multiValueLabel: (base) => ({
            ...base,
            whiteSpace: 'normal',
            overflow: 'visible',
          }),
          control: (base) => ({
            ...base,
            transition: 'none',
          }),
        }}
        classNames={{
          control: ({ isFocused }) =>
            clsx(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base,
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) =>
            clsx(
              isFocused && optionStyles.focus,
              isSelected && optionStyles.selected,
              optionStyles.base,
            ),
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
      />
      {href && (
        <NavLink
          to={href}
          className="w-fit self-end rounded-lg border border-zinc-600 bg-zinc-800 px-5 py-2.5 text-sm font-bold text-white outline-none transition-all hover:bg-zinc-700"
        >
          {tooltip}
        </NavLink>
      )}
      {!!error && <span className="italic text-red-500">{error.message}</span>}
    </div>
  )
}

export default Multiselect
