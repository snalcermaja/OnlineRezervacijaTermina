import { Button, Table } from "react-bootstrap"
import { FaEdit, FaFilePdf, FaTrash } from "react-icons/fa"

export default function RezervacijaPregledGrid({ rezervacije, navigate, brisanje, dohvatiImeKorisnika, dohvatiBrojUsluga, generirajPDFZaRezervaciju }) {
    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Korisnik</th>
                        <th>Datum</th>
                        <th>Napomena</th>
                        <th>Broj usluga</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {rezervacije && rezervacije.map((rezervacija) => (
                        <tr key={rezervacija.sifra}>
                            <td>{dohvatiImeKorisnika(rezervacija.korisnik) || 'Nema imena'}</td>
                            <td>
                                {rezervacija.datum ? new Date(rezervacija.datum).toLocaleString('hr-HR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }) : 'Nema datuma'}
                            </td>
                            <td>{rezervacija.napomena || 'Bez napomene'}</td>
                            <td className="text-center">{dohvatiBrojUsluga(rezervacija) || 0}</td>
                            <td>
                                <Button onClick={() => { navigate(`/rezervacije/${rezervacija.sifra}`) }} title="✏️Promjeni">
                                    <FaEdit />
                                </Button>
                                &nbsp;&nbsp;
                                <FaTrash
                                    onClick={() => brisanje(rezervacija.sifra)}
                                    title="Obriši"
                                    style={{ cursor: 'hand' }}
                                    color="red" />
                                &nbsp;&nbsp;
                                <Button variant="info" onClick={() => generirajPDFZaRezervaciju(rezervacija)} title="Generiraj PDF">
                                    <FaFilePdf />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}