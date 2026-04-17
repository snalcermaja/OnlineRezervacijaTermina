import { Button, Table } from "react-bootstrap"
import { NumericFormat } from "react-number-format"

export default function UslugaPregledTablica({ usluge, navigate, brisanje }) {


    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>
                        Naziv
                    </th>
                    <th>
                        Cijena
                    </th>
                    <th>Akcija</th>
                </tr>
            </thead>
                <tbody>
                    {usluge && usluge.map((usluga) => (
                        <tr key={usluga.sifra}>
                            <td className="lead">{usluga.naziv}</td>

                            <td className='text-end'>
                            <NumericFormat
                                value={usluga.cijena}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                suffix=' €'
                                prefix='='
                                decimalScale={2}
                                fixedDecimalScale
                            />
                        </td>

                            <td className="text-center">
                                <Button onClick={() => navigate(`/usluge/${usluga.sifra}`)}>
                                    ✏️Promjeni
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={() => brisanje(usluga.sifra)}>
                                    🗑️Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </Table>
    )
}