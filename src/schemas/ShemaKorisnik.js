import { z } from 'zod'

export const ShemaKorisnik = z.object({
  ime: z.string()
    .trim()
    .min(1, "Ime je obavezno i ne smije sadržavati samo razmake!")
    .min(2, "Ime mora imati najmanje 2 znaka!")
    .max(20, "Ime može imati najviše 20 znakova!"),
    
  prezime: z.string()
    .trim()
    .min(1, "Prezime je obavezno i ne smije sadržavati samo razmake!")
    .min(2, "Prezime mora imati najmanje 2 znaka!")
    .max(20, "Prezime može imati najviše 20 znakova!"),

    brojTelefona: z.string()
    .trim()
    .min(1, 'Broj telefona je obavezan!')
    .regex(/^[0-9+\-\/ ]+$/, 'Neispravan format broja telefona (dozvoljeni brojevi, +, -, / i razmaci)')
    .min(6, 'Broj telefona mora imati najmanje 6 znakova!')
    .max(15, 'Broj telefona može imat najviše 15 znakova!')
    })