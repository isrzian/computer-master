import { z } from 'zod'

export const client = z.object({
  initials: z.string(),
  phone: z.string(),
  email: z.string().email(),
  passportSeries: z.string(),
  passportNumber: z.string(),
})

export const material = z.object({
  name: z.string(),
  description: z.string(),
  count: z.preprocess((value) => Number(value), z.number()),
  cost: z.preprocess((value) => Number(value), z.number()),
})

export const order = z.object({
  phoneModel: z.string(),
  phoneColor: z.string(),
  phonePassword: z.string(),
  phoneView: z.string(),
  imei: z.string(),
  materialsIds: z.array(z.number()),
  materialsInput: z
    .array(
      z.object({
        value: z.number(),
        label: z.string(),
      }),
    )
    .min(1),
  clientId: z.number(),
  clientInput: z.object({
    value: z.number(),
    label: z.string(),
  }),
  isDone: z.boolean().default(false),
  isDoneInput: z
    .object({
      value: z.boolean(),
      label: z.string(),
    })
    .optional(),
})

export const completeOrder = order.omit({
  materialsInput: true,
  clientInput: true,
})
