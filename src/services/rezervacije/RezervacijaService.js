import RezervacijaServiceLocalStorage from "./RezervacijaServiceLocalStorage";
import RezervacijaServiceMemorija from "./RezervacijaServiceMemorija";
import { DATA_SOURCE } from "../../constants";

let Servis = null;


switch (DATA_SOURCE) {
    case 'memorija':
        Servis = RezervacijaServiceMemorija;
        break;
    case 'localStorage':
        Servis = RezervacijaServiceLocalStorage;
        break;
    default:
        Servis = null;
}


const PrazanServis = {
    get: async () => ({ success: false, data: []}),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (rezervacija) => { console.error("Servis nije učitan"); },
    promjeni: async (sifra, rezervacija) => { console.error("Servis nije učitan"); },
    obrisi: async (sifra) => { console.error("Servis nije učitan"); }
};


const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (rezervacija) => AktivniServis.dodaj(rezervacija),
    promjeni: (sifra, rezervacija) => AktivniServis.promjeni(sifra, rezervacija),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};