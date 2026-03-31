import KorisniciServiceLocalStorage from "./KorisniciServiceLocalStorage";
import KorisniciServiceMemorija from "./KorisniciServiceMemorija";
import { DATA_SOURCE } from "../../constants";

let Servis = null;


switch (DATA_SOURCE) {
    case 'memorija':
        Servis = KorisniciServiceMemorija;
        break;
    case 'localStorage':
        Servis = KorisniciServiceLocalStorage;
        break;
    default:
        Servis = null;
}


const PrazanServis = {
    get: async () => ({ success: false, data: []}),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (korisnik) => { console.error("Servis nije učitan"); },
    promjeni: async (sifra, korisnik) => { console.error("Servis nije učitan"); },
    obrisi: async (sifra) => { console.error("Servis nije učitan"); }
};


const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (korisnik) => AktivniServis.dodaj(korisnik),
    promjeni: (sifra, korisnik) => AktivniServis.promjeni(sifra, korisnik),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
    }