import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import KorisniciService from "../../services/korisnici/KorisniciService"
import { Button, Col, Form, Row, Container, Card, Table } from "react-bootstrap"
import { RouteNames } from "../../constants"
import UslugeService from "../../services/usluge/UslugeService"

export default function RezervacijaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [rezervacija, setRezervacija] = useState({})
    const [korisnici, setKorisnici] = useState([])
    const [usluge, setUsluge] = useState([])
    const [odabraneUsluge, setOdabraneUsluge] = useState([])
    const [pretragaUsluga, setPretragaUsluga] = useState('')
    const [prikaziAutocomplete, setPrikaziAutocomplete] = useState(false)
    const [odabraniIndex, setOdabraniIndex] = useState(-1)

    const [odabraniKorisnik, setOdabraniKorisnik] = useState(0)
    const [odabraniDatum, setOdabraniDatum] = useState('')
    const [unesenaNapomena, setUnesenaNapomena] = useState('')

    useEffect(() => {
        ucitajRezervaciju()
        ucitajKorisnike()
        ucitajUsluge()
    }, [])

    useEffect(() => {
        if (rezervacija.usluge && usluge.length > 0) {
            const odabrani = usluge.filter(p => rezervacija.usluge.includes(p.sifra))
            setOdabraneUsluge(odabrani)
        }

        if (rezervacija.sifra) {
        setOdabraniKorisnik(rezervacija.korisnikSifra || 0)
        setOdabraniDatum(rezervacija.datum || '')
        setUnesenaNapomena(rezervacija.napomena || '')
    }
    }, [rezervacija, usluge])

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

    async function ucitajUsluge() {
        await UslugeService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za usluge')
                return
            }
            setUsluge(odgovor.data)
        })
    }

    function dodajUslugu(usluga) {
        if (!odabraneUsluge.find(p => p.sifra === usluga.sifra)) {
            setOdabraneUsluge([...odabraneUsluge, usluga])
        }
        setPretragaUsluga('')
        setPrikaziAutocomplete(false)
        setOdabraniIndex(-1)
    }

    function ukloniUslugu(sifra) {
        setOdabraneUsluge(odabraneUsluge.filter(p => p.sifra !== sifra))
    }

    function filtrirajUsluge() {
        if (!pretragaUsluga) return []
        return usluge.filter(p =>
            !odabraneUsluge.find(op => op.sifra === p.sifra) &&
            (p.ime.toLowerCase().includes(pretragaUsluga.toLowerCase()))
        )
    }

    function handleKeyDown(e) {
        const filtriraneUsluge = filtrirajUsluge()

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOdabraniIndex(prev =>
                prev < filtriraneUsluge.length - 1 ? prev + 1 : prev
            )
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setOdabraniIndex(prev => prev > 0 ? prev - 1 : 0)
        } else if (e.key === 'Enter' && odabraniIndex >= 0 && filtriraneUsluge.length > 0) {
            e.preventDefault()
            dodajUslugu(filtriraneUsluge[odabraniIndex])
        } else if (e.key === 'Escape') {
            setPrikaziAutocomplete(false)
            setOdabraniIndex(-1)
        }
    }

    async function promjeni(rezervacija) {
        await RezervacijaService.promjeni(params.sifra, rezervacija).then(() => {
            navigate(RouteNames.REZERVACIJE)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);
        const korisnikRaw = podaci.get('korisnik');

        if (!korisnikRaw || korisnikRaw === "") {
            alert("Morate odabrati korisnika!");
            return;
        }

        const odabraniKorisnik = parseInt(korisnikRaw);
        if (isNaN(odabraniKorisnik) || odabraniKorisnik <= 0) {
            alert("Odabrani korisnik nije valjan!");
            return;
        }

        promjeni({
            korisnik: odabraniKorisnik,
            datum: odabraniDatum,
            napomena: unesenaNapomena,
            usluga: unesenaUsluga.map(p => p.sifra)
        });
    }

    return (
        <>
            <h3>Promjena rezervacije</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">
                    <Row>
                        <Col md={6}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Podaci o rezervaciji</Card.Title>

                                    <Form.Group controlId="korisnik" className="mb-3">
                                        <Form.Label className="fw-bold">Korisnik</Form.Label>
                                        <Form.Select name="korisnik" required value={odabraniKorisnik}
                                        onChange={(e) => setOdabraniKorisnik(e.target.value)}>
                                            <option value="">Odaberite korisnika</option>
                                            {korisnici && korisnici.map((korisnik) => (
                                                <option key={korisnik.sifra} value={korisnik.sifra}>
                                                    {korisnik.ime}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Card.Body>
                            </Card>

                            <Form.Group controlId="datum" className="mb-3">
                                <Form.Label className="fw-bold">Datum</Form.Label>
                                <Form.Control type="datetime-local" name="datum"
                                    value={odabraniDatum}
                                    onClick={(e) => e.target.showPicker()}
                                />
                            </Form.Group>

                            <Form.Group controlId="napomena" className="mb-3">
                                <Form.Label className="fw-bold">Napomena</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="napomena"
                                    placeholder="Unesite dodatne napomene..." 
                                    value={unesenaNapomena}/>
                            </Form.Group>
                        </Col>



                        <Col md={6}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Usluge</Card.Title>

                                    <Form.Group className="mb-3 position-relative">
                                        <Form.Label className="fw-bold">Dodaj uslugu</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Pretraži uslugu..."
                                            value={pretragaUsluga}
                                            onChange={(e) => {
                                                setPretragaUsluga(e.target.value)
                                                setPrikaziAutocomplete(e.target.value.length > 0)
                                                setOdabraniIndex(-1)
                                            }}
                                            onFocus={() => setPrikaziAutocomplete(pretragaUsluga.length > 0)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {prikaziAutocomplete && filtrirajUsluge().length > 0 && (
                                            <div className="position-absolute w-100 bg-white border rounded shadow-sm" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                                                {filtrirajUsluge().map((usluga, index) => (
                                                    <div
                                                        key={usluga.sifra}
                                                        className="p-2 cursor-pointer"
                                                        style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: index === odabraniIndex ? '#007bff' : 'white',
                                                            color: index === odabraniIndex ? 'white' : 'black'
                                                        }}
                                                        onClick={() => dodajUslugu(usluga)}
                                                        onMouseEnter={(e) => {
                                                            setOdabraniIndex(index)
                                                        }}
                                                    >
                                                        {usluga.naziv}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Form.Group>

                                    {odabraneUsluge.length > 0 && (
                                        <div style={{ overflow: 'auto', maxHeight: '300px' }}>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Naziv</th>
                                                        <th style={{ width: '80px' }}>Akcija</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {odabraneUsluge.map(usluga => (
                                                        <tr key={usluga.sifra}>
                                                            <td>{usluga.naziv}</td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => ukloniUslugu(usluga.sifra)}
                                                                >
                                                                    Obriši
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>

                                    )}
                                    {odabraneUsluge.length === 0 && (
                                        <p className="text-muted">Nema odabranih usluga</p>
                                    )}
                                </Card.Body>
                            </Card>
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
                </Container >
            </Form >
        </>
    )
}