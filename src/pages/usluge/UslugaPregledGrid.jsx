import { Button, Card, Row, Col, Container, Pagination } from "react-bootstrap"
import { NumericFormat } from "react-number-format"

export default function UslugaPregledGrid({ usluge, navigate, brisanje, handlePageChange, currentPage, totalPages }) {
    return (
        <Container className="py-3 px-0">
            <Row>
                {usluge && usluge.map((usluga) => (
                    <Col key={usluga.sifra} xs={12} md={6} className="mb-4">
                        <Card className="shadow-sm h-100">

                            <Card.Header className="d-flex justify-content-between align-items-center bg-white">
                                <span className="fw-bold text-primary" style={{ fontSize: '1.1rem' }}>
                                    {usluga.naziv}
                                </span>
                            </Card.Header>

                            <Card.Body>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Cijena:</span>
                                    <span className="fw-bold text-dark">
                                        <NumericFormat
                                            value={usluga.cijena}
                                            displayType={'text'}
                                            thousandSeparator='.'
                                            decimalSeparator=','
                                            suffix=' €'
                                            decimalScale={2}
                                            fixedDecimalScale
                                        />
                                    </span>
                                </div>
                            </Card.Body>

                            <Card.Footer className="bg-light d-flex gap-2">
                                <Button
                                    variant="outline-primary"
                                    className="flex-fill"
                                    onClick={() => navigate(`/usluge/${usluga.sifra}`)}
                                >
                                    ✏️Uredi
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    className="flex-fill"
                                    onClick={() => brisanje(usluga.sifra)}
                                >
                                    🗑️Obriši
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

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

                )
            }
        </Container>
    )
}