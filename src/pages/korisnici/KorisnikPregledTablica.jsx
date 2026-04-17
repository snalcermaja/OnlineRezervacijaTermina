import { Button, Table } from "react-bootstrap"

export default function KorisniciPregledTablica({ korisnici, navigate, brisanje }) {


    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>
                        Ime
                    </th>
                    <th>
                        Prezime
                    </th>
                    <th>
                        Broj telefona
                    </th>
                    <th>Akcija</th>
                </tr>
            </thead>
                <tbody>
                    {korisnici && korisnici.map((korisnik) => (
                        <tr key={korisnik.sifra}>
                            <td className="lead">{korisnik.ime}</td>

                            <td>{korisnik.prezime}</td>

                            <td className="text-end">{korisnik.brojTelefona}</td>

                            <td className="text-center">
                                <Button onClick={() => navigate(`/korisnici/${korisnik.sifra}`)}>
                                    ✏️Promjeni
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={() => brisanje(korisnik.sifra)}>
                                    🗑️Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </Table>
    )
}