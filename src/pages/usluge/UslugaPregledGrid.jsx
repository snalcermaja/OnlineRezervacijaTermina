import { Button, Card, Row, Col, Container } from "react-bootstrap"
import { NumericFormat } from "react-number-format"

export default function UslugaPregledGrid({ usluge, navigate, brisanje }) {
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
                                    onClick={() => navigate(`/korisnici/${usluga.sifra}`)}
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
        </Container>
    )
}