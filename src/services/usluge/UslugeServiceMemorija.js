import { usluge } from "./UslugePodaci";


async function get() {
    return { success: true, data: [...usluge] }
}

async function getBySifra(sifra) {
    return { success: true, data: usluge.find(s => s.sifra === parseInt(sifra)) }
}

async function dodaj(usluga) {
    if (usluge.length === 0) {
        usluga.sifra = 1
    } else {
        usluga.sifra = usluge[usluge.length - 1].sifra + 1
    }

    usluge.push(usluga)
}


async function promjeni(sifra, usluga) {
    const index = nadiIndex(sifra)
    usluge[index] = { ...usluge[index], ...usluga }
}

function nadiIndex(sifra) {
    return usluge.findIndex(s => s.sifra === parseInt(sifra))
}


async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        usluge.splice(index, 1);
    }
    return;
}

async function getPage(page = 1, pageSize = 8) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = usluge.slice(startIndex, endIndex);
    const totalItems = usluge.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
        success: true,
        data: paginatedData,
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalItems: totalItems
    };
}


export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi,
    getPage
}