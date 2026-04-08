import { useEffect, useState } from "react"
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import UslugaService from "../../services/usluge/UslugeService"

export default function RezervacijaNova() {

    const navigate = useNavigate()
    const [usluge, setUsluga] = useState([])

    useEffect(() => {
        ucitajUsluge()
    }, [])

    async function ucitajUsluge() {
        await UslugaService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za usluge')
                return
            }
            setUsluga(odgovor.data)
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


        if (!podaci.get('naziv') || podaci.get('naziv').trim().length === 0) {
            alert("Naziv je obavezan i ne smije sadržavati samo razmake!");
            return;
        }

        
        if (podaci.get('naziv').trim().length < 3) {
            alert("Naziv rezervacije mora imati najmanje 3 znaka!");
            return;
        }

        
        if (!podaci.get('usluga') || podaci.get('usluga') === "") {
            alert("Morate odabrati uslugu!");
            return;
        }

        
        const odabraniUsluga = parseInt(podaci.get('usluga'));
        if (isNaN(odabraniUsluga) || odabraniUsluga <= 0) {
            alert("Odabrani usluga nije valjan!");
            return;
        }

        dodaj({
            naziv: podaci.get('naziv'),
            usluga: odabraniUsluga
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
                                    <Form.Group controlId="naziv" className="mb-3">
                                        <Form.Label className="fw-bold">Naziv</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="naziv"
                                            placeholder="Unesite naziv rezervacije"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="usluga" className="mb-3">
                                        <Form.Label className="fw-bold">Usluga</Form.Label>
                                        <Form.Select name="usluga" required>
                                            <option value="">Odaberite uslugu</option>
                                            {usluge && usluge.map((usluga) => (
                                                <option key={usluga.sifra} value={usluga.sifra}>
                                                    {usluga.naziv}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr />

                            
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <Link to={RouteNames.GRUPE} className="btn btn-danger px-4">
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