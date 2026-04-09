import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import KorisniciService from "../../services/korisnici/KorisniciService"
import { Button, Col, Form, Row, Container, Card } from "react-bootstrap"
import { RouteNames } from "../../constants"

export default function RezervacijaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [rezervacija, setRezervacija] = useState({})
    const [korisnici, setKorisnici] = useState([])

    useEffect(() => {
        ucitajRezervaciju()
        ucitajKorisnike()
    }, [])

    async function ucitajRezervaciju() {
        await RezervacijaService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setRezervacija(odgovor.data)
        })
    }

    async function ucitajKorisnike() {
        await KorisniciService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za korisnike')
                return
            }
            setKorisnici(odgovor.data)
        })
    }

    async function promjeni(rezervacija) {
        await RezervacijaService.promjeni(params.sifra, rezervacija).then(() => {
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

        promjeni({
            korisnik: odabraniKorisnik,
            datum: odabraniDatum
        })
    }

    return (
        <>
            <h3>Promjena rezervacije</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-4">Podaci o rezervaciji</Card.Title>



                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="korisnik" className="mb-3">
                                        <Form.Label className="fw-bold">Korisnik</Form.Label>
                                        <Form.Select name="korisnik" required value={rezervacija.korisnik || ''} onChange={(e) => setRezervacija({ ...rezervacija, korisnik: parseInt(e.target.value) })}>
                                            <option value="">Odaberite korisnika</option>
                                            {korisnici && korisnici.map((korisnici) => (
                                                <option key={korisnici.sifra} value={korisnici.sifra}>
                                                    {korisnici.ime}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group controlId="datum" className="mb-3">
                                        <Form.Label className="fw-bold">Datum</Form.Label>
                                        <Form.Control type="datetime-local" name="datum"

                                            defaultValue={rezervacija.datum ? rezervacija.datum.slice(0,16):""}
                                            onClick={(e) => e.target.showPicker()}
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
                                    Promjeni rezervaciju
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </Form>
        </>
    )
}