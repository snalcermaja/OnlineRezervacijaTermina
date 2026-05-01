import { z } from 'zod'

export const ShemaRezervacija = z.object({
    korisnik: z.coerce.number()
    .positive('Obavezan odabir korisnika'),

    datum: z.string.min(1, 'Datum i vrijeme su obavezni'),

    napomena: z.string()
    .max(500, 'Napomena može imat najviše 500 znakova')
    .optional()
    .or(z.literal('')),

    usluge: z.array(z.number())
    .min(1, 'Morate odabradi uslugu')
})