import { useEffect, useState } from "react"
import UslugeService from "../../services/usluge/UslugeService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import { NumericFormat } from "react-number-format"



export default function UslugePregled() {

    const navigate = useNavigate()
    const [usluge, setUsluge] = useState([])

    useEffect(() => {
        ucitajUsluge()
    }, [])

    async function ucitajUsluge() {
        await UslugeService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }

            setUsluge(odgovor.data)
        })
    }

    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati')) {
            return
        }
        await UslugeService.obrisi(sifra)
        ucitajUsluge()
    }


    return (
        <>
            <Link to={RouteNames.USLUGE_NOVE}
                className="btn btn-outline-success w-100 mb-3 mt-3">
                Dodavanje nove usluge
            </Link>
            <Table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Trajanje</th>
                        <th>Cijena</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {usluge && usluge.map((usluga) => (
                        <tr key={usluga.sifra}>
                            <td>{usluga.naziv}</td>
                            <td>{usluga.trajanje}</td>
                            <td className="text-end">
                                <NumericFormat
                                    value={usluga.cijena}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix={' €'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                />
                            </td>
                            <td>
                                <Button onClick={() => { navigate(`/usluge/${usluga.sifra}`) }}>
                                    ✏️Promjena
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={() => { obrisi(usluga.sifra) }}>
                                    🗑️Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}