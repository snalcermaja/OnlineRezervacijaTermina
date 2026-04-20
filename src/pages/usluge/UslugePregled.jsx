import { useEffect, useState } from "react"
import UslugeService from "../../services/usluge/UslugeService"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import useBreakpoint from "../../hooks/useBreakpoint"
import UslugaPregledGrid from "./UslugaPregledGrid"
import UslugaPregledTablica from "./UslugaPregledTablica"



export default function UslugePregled() {

    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const [usluge, setUsluge] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const pageSize = 8

    useEffect(() => {
        ucitajUsluge(currentPage)
    }, [currentPage])

    async function ucitajUsluge(page) {
        await UslugeService.getPage(page, pageSize).then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }

            setUsluge(odgovor.data)
            setTotalPages(odgovor.totalPages)
            setTotalItems(odgovor.totalItems)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return
        await UslugeService.obrisi(sifra)

        const newTotalItems = totalItems - 1
        const newTotalPages = Math.ceil(newTotalItems / pageSize);

        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages)
        } else {
            ucitajUsluge(currentPage)
        }
    }

    function handlePageChange(page) {
        setCurrentPage(page)
    }


    return (
        <>
            <Link to={RouteNames.USLUGE_NOVE}
                className="btn btn-outline-success w-100 mb-3 mt-3">
                Dodavanje nove usluge
            </Link>
            {['xs', 'sm', 'md'].includes(sirina) ? (
                <UslugaPregledGrid
                    usluge={usluge}
                    navigate={navigate}
                    brisanje={brisanje}
                    handlePageChange={handlePageChange}
                    totalPages={totalPages}
                />
            ) : (
                <UslugaPregledTablica
                    usluge={usluge}
                    navigate={navigate}
                    brisanje={brisanje}
                    handlePageChange={handlePageChange}
                    totalPages={totalPages}
                />
            )}
        </>
    )
}