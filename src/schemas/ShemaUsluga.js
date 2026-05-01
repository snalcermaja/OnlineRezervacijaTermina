import { z } from 'zod'

export const ShemaUsluga = z.object({
    naziv: z.string()
    .trim()
    .min(1, 'Naziv usluge je obavezan'),

    cijena: z.coerce.number({
        errorMap: () => ({ message: 'Cijena mora biti broj'})
    })
    .positive('Cijena mora biti veća od 0')
    .max(1000, 'Cijena ne može biti veća od 100')
})