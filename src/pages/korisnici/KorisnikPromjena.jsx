import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import KorisniciService from "../../services/korisnici/KorisniciService";
import { useEffect, useState } from "react";

export default function KorisnikPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [korisnik, setKorisnik] = useState({})

    async function ucitajKorisnik() {
        await KorisniciService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije inplementiran service')
                return
            }

            const s = odgovor.data

            setKorisnik(s)
        })
    }

    useEffect(() => {
        ucitajKorisnik()
    }, [])

    async function promjeni(korisnik) {
        await KorisniciService.promjeni(params.sifra, korisnik).then(() => {
            navigate(RouteNames.KORISNICI)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            brojTelefona: podaci.get('brojTelefona')
        })
    }

    return (
        <>
            <Container className="mt-4">
                <h2>Promjena korisnika</h2>
                <hr />

                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <Form onSubmit={odradiSubmit}>
                            <Form.Group controlId="ime" className="mb-3">
                                <Form.Label>Ime</Form.Label>
                                <Form.Control type="text" name="ime" required defaultValue={korisnik.ime} />
                            </Form.Group>

                            <Form.Group controlId="prezime" className="mb-3">
                                <Form.Label>Prezime</Form.Label>
                                <Form.Control type="text" name="prezime" required defaultValue={korisnik.prezime} />
                            </Form.Group>

                            <Form.Group controlId="brojTelefona" className="mb-3">
                                <Form.Label>Broj telefona</Form.Label>
                                <Form.Control type="tel" name="brojTelefona" required defaultValue={korisnik.brojTelefona} />
                            </Form.Group>

                            <hr style={{ marginTop: '30px', marginBottom: '30px', border: '0' }} />

                            <div className="d-flex justify-content-start align-items-start mt-4">
                                <Link to={RouteNames.KORISNICI} className="btn btn-danger me-3">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success">
                                    Promijeni korisnika
                                </Button>
                            </div>

                        </Form>
                    </Col>
                </Row>
            </Container >
        </>
    )
}