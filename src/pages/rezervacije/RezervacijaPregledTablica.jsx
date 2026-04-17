import { Button, Table } from "react-bootstrap"

export default function RezervacijaPregledGrid({ rezervacije, navigate, brisanje, dohvatiImeKorisnika, dohvatiBrojUsluga }) {
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
                    {rezervacije && rezervacije.map((rezervacija)=>(
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
                                    <Button onClick={() => { navigate(`/rezervacije/${rezervacija.sifra}`) }}>
                                        ✏️Promjeni
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button variant="danger" onClick={() => brisanje(rezervacija.sifra)}>
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