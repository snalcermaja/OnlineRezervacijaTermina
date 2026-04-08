import { rezervacije } from "./RezervacijaPodaci";



async function get(){
    return {success: true, data: [...rezervacije]} 
}

async function getBySifra(sifra) {
    return {success: true, data: rezervacije.find(g => g.sifra === parseInt(sifra))}
}


async function dodaj(rezervacija){
    if(rezervacije.length===0){
        rezervacija.sifra=1
    }else{
        rezervacija.sifra = rezervacije[rezervacije.length - 1].sifra + 1
    }
    
    rezervacije.push(rezervacija)
}


async function promjeni(sifra,rezervacija) {
    const index = nadiIndex(sifra)
    rezervacije[index] = {...rezervacije[index], ...rezervacija}
}

function nadiIndex(sifra){
    return rezervacije.findIndex(g=>g.sifra === parseInt(sifra))
}


async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        rezervacije.splice(index, 1);
    }
    return;
}


export default{
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}