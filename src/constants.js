export const IME_APLIKACIJE='Online rezervacija termina'

export const RouteNames = {
    HOME: '/',
    KORISNICI: '/korisnici',
    KORISNICI_NOVI: '/korisnici/novi',
    KORISNICI_PROMJENA: '/korisnici/:sifra',

    USLUGE: '/usluge',
    USLUGE_NOVE: '/usluge/nove',
    USLUGE_PROMJENA: '/usluge/:sifra',

    REZERVACIJE: '/rezervacije',
    REZERVACIJE_NOVE: '/rezervacije/nove',
    REZERVACIJE_PROMJENA: '/rezervacije/:sifra',

    OPERATERI: '/operateri',
    OPERATERI_NOVI: '/operateri/novi',
    OPERATERI_PROMJENA: '/operateri/:sifra',
    OPERATERI_PROMJENA_LOZINKE: '/operateri/:sifra/lozinka',

    GENERIRANJE_PODATAKA: '/generiraj-podatke',
    APLIKACIJE_POLAZNIKA: '/aplikacije-polaznika',

    LOGIN: '/login',
    REGISTRACIJA: '/registracija',

    NADZORNA_PLOCA: '/nadzorna-ploca',

    TEST: 'test'
}

export const DATA_SOURCE = 'localStorage'

export const PrefixStorage = {
    korisnici: 'korisnici',
    usluge: 'usluge',
    REZERVACIJE: 'rezervacije',
    OPERATERI: 'operateri'
}