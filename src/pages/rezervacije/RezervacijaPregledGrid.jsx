import { Button, Card, Row, Col, Container } from "react-bootstrap"
import FormatDatuma from "../../components/FormatDatuma"

export default function RezervacijaPregledGrid({ rezervacije, navigate, brisanje, dohvatiImeKorisnika, dohvatiBrojUsluga}) {

    return (
        <Container className="py-3 px-0">
            <Row>
                {rezervacije && rezervacije.map((rezervacija) => (
                    <Col key={rezervacija.sifra} xs={12} md={6} lg={4} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Header className="bg-white fw-bold text-primary">
                                {dohvatiImeKorisnika(rezervacija.korisnik) || 'Nepoznat korisnik'}
                            </Card.Header>

                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">Datum:</span>
                                    <span>
                                        <FormatDatuma datum={rezervacija.datum}/>
                                    </span>
                                </div>

                                <div className="mb-2">
                                    <small className="text-muted d-block">Napomena:</small>
                                    <p className="mb-0 text-truncate" style={{ maxHeight: '50px' }}>
                                        {rezervacija.napomena || 'Bez napomene'}
                                    </p>
                                </div>

                                <div className="mt-3">
                                    <span className="badge bg-info text-dark">
                                        Broj usluga:{dohvatiBrojUsluga(rezervacija) || 0}
                                    </span>
                                </div>
                            </Card.Body>

                            <Card.Footer className="bg-light d-flex gap-2">
                                <Button
                                    variant="outline-primary"
                                    className="flex-fill"
                                    onClick={() => navigate(`/rezervacije/${rezervacija.sifra}`)}
                                >
                                    ✏️Uredi
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    className="flex-fill"
                                    onClick={() => brisanje(rezervacija.sifra)}
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