import { useEffect, useState } from "react"
import { Form, Button, Row, Col, Container, Card, Table } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { useLocation, useNavigate } from "react-router-dom"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import KorisniciService from "../../services/korisnici/KorisniciService"
import UslugeService from "../../services/usluge/UslugeService"
import { ShemaRezervacija } from "../../schemas/ShemaRezervacija"

export default function RezervacijaNova() {

    const navigate = useNavigate()
    const location = useLocation()
    const [korisnici, setKorisnici] = useState([])
    const [usluge, setUsluge] = useState([])
    const [odabraneUsluge, setOdabraneUsluge] = useState([])
    const [pretragaUsluga, setPretragaUsluga] = useState('')
    const [prikaziAutocomplete, setPrikaziAutocomplete] = useState(false)
    const [odabraniIndex, setOdabraniIndex] = useState(-1)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        ucitajKorisnike()
        ucitajUsluge()
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
            (p.naziv.toLowerCase().includes(pretragaUsluga.toLowerCase())
            ))
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

    async function dodaj(rezervacija) {
        await RezervacijaService.dodaj(rezervacija)
        if (location.state?.comingFrom === 'home') {
            navigate('/')
        } else {
            navigate(RouteNames.REZERVACIJE)
        }
    }

    async function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        
        setErrors({});
        const objektPodataka = Object.fromEntries(podaci);

        const rezultat = ShemaRezervacija.safeParse(objektPodataka);

        if (!rezultat.success) {
            const noveGreske = {};

            rezultat.error.issues.forEach((issue) => {
                const kljuc = issue.path[0];
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message;
                }
            });

            setErrors(noveGreske);
            return;
        }

        const odabraniKorisnik = parseInt(podaci.get('korisnik'))
        const odabraneUsluge = parseInt(podaci.get('usluga'))

        dodaj({
            korisnik: odabraniKorisnik,
            datum: new Date(podaci.get('datum')).toISOString(),
            napomena: napomena,
            usluge: odabraneUsluge.map(p => p.sifra)
        })
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors };
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
        }
    }

    return (
        <>
            <h3>Unos nove rezervacije</h3>
            <Form onSubmit={odradiSubmit}>
                <Container fluid className="mt-4 px-4">
                    <Row className="g-4">
                        <Col md={6}>
                            <Card className="shadow-sm h-100">
                                <Card.Body className="p-4">
                                    <Card.Title className="mb-4 text-primary">Podaci o rezervaciji</Card.Title>

                                    <Form.Group className="mb-4" controlId="korisnik">
                                        <Form.Label className="fw-bold">Korisnik</Form.Label>
                                        <Form.Select name="korisnik" required isInvalid={!!errors.korisnik} onFocus={() => ocistiGresku('korisnik')}>
                                            <option value="">Odaberite korisnika</option>
                                            {korisnici && korisnici.map((korisnik) => (
                                                <option key={korisnik.sifra} value={korisnik.sifra}>
                                                    {korisnik.ime} {korisnik.prezime}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.korisnik}
                                        </Form.Control.Feedback>


                                        <Form.Group className="mb-4" controlId="datum">
                                            <Form.Label className="fw-bold">Datum</Form.Label>
                                            <Form.Control type="datetime-local" name="datum"
                                                onClick={(e) => e.target.showPicker()}
                                                isInvalid={!!errors.datum}
                                                onFocus={() => ocistiGresku('datum')}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.datum}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-0" controlId="napomena">
                                            <Form.Label className="fw-bold">Napomena</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="napomena"
                                                placeholder="Unesite dodatne napomene..."
                                            />
                                        </Form.Group>
                                    </Form.Group>
                                    <div className="mt-3 border-top pt-2 text-end">
                                        <h4 className="fw-bold">
                                            Ukupno: {odabraneUsluge.reduce((suma, usluge) => suma + parseFloat(usluge.cijena), 0).toLocaleString('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€
                                        </h4>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card className="shadow-sm h-100">
                                <Card.Body className="p-4">
                                    <Card.Title className="mb-4 text-primary">Usluge</Card.Title>

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
                                                        className="p-2 cursor-pointer d-flex justify-content-between align-items-center"
                                                        style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: index === odabraniIndex ? '#90abc7' : 'white',
                                                            color: index === odabraniIndex ? 'white' : 'black',

                                                            borderBottom: '1px solid #dee2e6',
                                                            transition: 'background-color 0.2s'
                                                        }}
                                                        onClick={() => dodajUslugu(usluga)}
                                                        onMouseEnter={(e) => {
                                                            setOdabraniIndex(index)
                                                        }}
                                                    >
                                                        <span>{usluga.naziv}</span>

                                                        <span style={{ fontWeight: 'bold' }}>
                                                            {Number(usluga.cijena).toLocaleString('hr-HR', { minimumFractionDigits: 2 })} €
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Form.Group>
                                    <div className="mt-4">
                                        {odabraneUsluge.length > 0 ? (
                                            <div style={{ overflow: 'auto', maxHeight: '300px' }}>
                                                <Table striped bordered hover size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th>Naziv</th>
                                                            <th>Cijena</th>
                                                            <th style={{ width: '80px' }}>Akcija</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {odabraneUsluge.map(usluga => (
                                                            <tr key={usluga.sifra}>
                                                                <td className="text-start">{usluga.naziv}</td>
                                                                <td className="text-start">{Number(usluga.cijena).toLocaleString('hr-Hr', { minimumFractionDigits: 2 })}€</td>
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
                                        ) : (
                                            <p className="text-muted italic">Nema odabranih usluga</p>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>



                    <hr />

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                        <Button
                            type="button"
                            className="btn btn-danger px-4"
                            onClick={() => {
                                if (location.state?.comingFrom === 'home') {
                                    navigate('/')
                                } else {
                                    navigate(RouteNames.REZERVACIJE)
                                }
                            }}>
                            Odustani
                        </Button>

                        <Button type="submit" variant="success">
                            Dodaj novu rezervaciju
                        </Button>
                    </div>
                </Container>
            </Form>
        </>
    )
}