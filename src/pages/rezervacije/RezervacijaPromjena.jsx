import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import UslugeService from "../../services/usluge/UslugeService"
import { Button, Col, Form, Row, Container, Card } from "react-bootstrap"
import { RouteNames } from "../../constants"

export default function RezervacijaPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [rezervacija, setRezervacija] = useState({})
    const [usluge, setUsluge] = useState([])

    useEffect(()=>{
        ucitajRezervaciju()
        ucitajUsluge()
    },[])

    async function ucitajRezervaciju() {
        await RezevacijaService.getBySifra(params.sifra).then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setRezervacija(odgovor.data)
        })
    }

    async function ucitajUsluge() {
        await UslugeService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za usluge')
                return
            }
            setUsluge(odgovor.data)
        })
    }

    async function promjeni(rezervacija) {
        await RezervacijaService.promjeni(params.sifra,rezervacija).then(()=>{
            navigate(RouteNames.REZERVACIJE)
        })
    }

    function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)

        
        if (!podaci.get('naziv') || podaci.get('naziv').trim().length === 0) {
            alert("Naziv je obavezan i ne smije sadržavati samo razmake!");
            return;
        }

        
        if (podaci.get('naziv').trim().length < 3) {
            alert("Naziv grupe mora imati najmanje 3 znaka!");
            return;
        }

        
        if (!podaci.get('usluga') || podaci.get('usluga') === "") {
            alert("Morate odabrati uslugu!");
            return;
        }

        
        const odabranaUsluga = parseInt(podaci.get('smjer'));
        if (isNaN(odabranaUsluga) || odabranaUsluga <= 0) {
            alert("Odabrana usluga nije valjana!");
            return;
        }

        promjeni({
            naziv: podaci.get('naziv'),
            usluga: odabranaUsluga
        })
    }

    return(
         <>
            <h3>Promjena rezervacije</h3>
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
                                            defaultValue={rezervacija.naziv}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="usluga" className="mb-3">
                                        <Form.Label className="fw-bold">Usluga</Form.Label>
                                        <Form.Select name="usluga" required value={rezervacija.usluga || ''} onChange={(e) => setRezervacija({...rezervacija, usluga: parseInt(e.target.value)})}>
                                            <option value="">Odaberite uslugu</option>
                                            {usluge && usluge.map((usluge) => (
                                                <option key={usluge.sifra} value={usluge.sifra}>
                                                    {usluge.naziv}
                                                </option>
                                            ))}
                                        </Form.Select>
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