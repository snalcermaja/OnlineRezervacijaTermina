import { korisnici } from "./KoriniciPodaci"



async function get() {
    return {data: korisnici}
}

export default{
    get
}