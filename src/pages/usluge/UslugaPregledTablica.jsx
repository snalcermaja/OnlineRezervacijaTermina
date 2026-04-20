import { Button, Table, Pagination } from "react-bootstrap"
import { NumericFormat } from "react-number-format"

export default function UslugaPregledTablica({ usluge, navigate, brisanje, handlePageChange, currentPage, totalPages }) {


    return (
        <>
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

            {
                totalPages > 1 && (

                    <div className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.First
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                            />
                            <Pagination.Prev
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            />

                            {[...Array(totalPages)].map((_, index) => {
                                const pageNumber = index + 1
                                    return (
                                        <Pagination.Item
                                            key={pageNumber}
                                            active={pageNumber === currentPage}
                                            onClick={() => handlePageChange(pageNumber)}
                                        >
                                            {pageNumber}
                                        </Pagination.Item>
                                    );
                            })}

                            <Pagination.Next
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            />
                            <Pagination.Last
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    </div>
                )}
        </>
    )
}