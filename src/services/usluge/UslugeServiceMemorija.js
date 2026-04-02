import { usluge } from "./UslugePodaci";


async function get(){
    return {success: true, data: [...usluge]} 
}

async function getBySifra(sifra) {
    return {success: true, data: usluge.find(s => s.sifra === parseInt(sifra))}
}

// 2/4 Create od CRUD
async function dodaj(usluga){
    if(usluge.length===0){
        usluga.sifra=1
    }else{
        usluga.sifra = usluge[usluge.length - 1].sifra + 1
    }
    
    usluge.push(usluga)
}


async function promjeni(sifra,usluga) {
    const index = nadiIndex(sifra)
    usluge[index] = {...usluge[index], ...usluga}
}

function nadiIndex(sifra){
    return usluga.findIndex(s=>s.sifra === parseInt(sifra))
}


async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        usluge.splice(index, 1);
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