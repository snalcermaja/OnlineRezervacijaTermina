import { useEffect, useState } from "react"
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import KorisniciService from "../../services/korisnici/KorisniciService"

export default function RezervacijaNova() {

    const navigate = useNavigate()
    const [korisnici, setKorisnici] = useState([])

    useEffect(() => {
        ucitajKorisnike()
    }, [])

    async function ucitajKorisnike() {
        await KorisniciService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za korisnike')
                return
            }
            setKorisnici(odgovor.data)
        })
    }

    async function dodaj(rezervacija) {
        await RezervacijaService.dodaj(rezervacija).then(() => {
            navigate(RouteNames.REZERVACIJE)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        const odabraniKorisnik = parseInt(podaci.get('korisnik'))
        const odabraniDatum = podaci.get('datum')
        
        if (isNaN(odabraniKorisnik) || odabraniKorisnik <= 0) {
            alert("Odabrani korisnik nije valjan!");
            return;

        }

        dodaj({
            korisnik: odabraniKorisnik,
            datum: odabraniDatum
        })
    }

    return (
        <>
            <h3>Unos nove rezervacije</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-4">Podaci o rezervaciji</Card.Title>



                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="korisnik" className="mb-3">
                                        <Form.Label className="fw-bold">Korisnik</Form.Label>
                                        <Form.Select name="korisnik" required>
                                            <option value="">Odaberite korisnika</option>
                                            {korisnici && korisnici.map((korisnik) => (
                                                <option key={korisnik.sifra} value={korisnik.sifra}>
                                                    {korisnik.ime} 
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group controlId="datum" className="mb-3">
                                        <Form.Label className="fw-bold">Datum</Form.Label>
                                        <Form.Control type="datetime-local" name="datum"

                                            onClick={(e) => e.target.showPicker()}
                                            onFocus={(e) => e.target.showPicker()}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr />


                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <Link to={RouteNames.REZERVACIJE} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success">
                                    Dodaj novu rezervaciju
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </Form>
        </>
    )
}