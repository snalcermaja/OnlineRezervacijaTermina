import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import KorisniciService from "../../services/korisnici/KorisniciService";

export default function KorisnikNovi() {

    const navigate = useNavigate()

    async function dodaj(korisnik) {
        await KorisniciService.dodaj(korisnik).then(() => {
            navigate(RouteNames.KORISNICI)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            brojTelefona: podaci.get('brojTelefona')
        })
    }

    return (
        <>
            <Container className="mt-4">
                <h2>Unos novog korisnika</h2>
                <hr />

                <Row className="justify-content-center mt-4">
                    <Col md={6}> 
                        <Form onSubmit={odradiSubmit}>

                            <Form.Group className="mb-3" controlId="ime">
                                <Form.Label className="fw-bold">Ime</Form.Label>
                                <Form.Control type="text" name="ime" required placeholder="Unesite ime" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="prezime">
                                <Form.Label className="fw-bold">Prezime</Form.Label>
                                <Form.Control type="text" name="prezime" required placeholder="Unesite prezime" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="brojTelefona">
                                <Form.Label className="fw-bold">Broj telefona</Form.Label>
                                <Form.Control type="tel" name="brojTelefona" placeholder="09x / xxx xxxx" />
                            </Form.Group>

                            <hr style={{ marginTop: '30px', border: '0' }} />

                            <div className="d-flex justify-content-between mb-5">
                                <Link to={RouteNames.KORISNICI} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success" className="px-4">
                                    Dodaj korisnika
                                </Button>
                            </div>

                        </Form>
                    </Col>
                </Row>
            </Container>
            )
        </>
    )
}