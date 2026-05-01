import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import KorisniciService from "../../services/korisnici/KorisniciService";
import { useEffect, useState } from "react";
import { ShemaKorisnik } from "../../schemas/ShemKorisnik"

export default function KorisnikPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [korisnik, setKorisnik] = useState({})
    const [errors, setErrors] = useState({})

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

        setErrors({});
        const objektPodataka = Object.fromEntries(podaci);

        const rezultat = ShemaKorisnik.safeParse(objektPodataka);

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
        promjeni({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            brojTelefona: podaci.get('brojTelefona')
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
            <Container className="mt-4">
                <h2>Promjena korisnika</h2>
                <hr />

                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <Form onSubmit={odradiSubmit}>
                            <Form.Group controlId="ime" className="mb-3">
                                <Form.Label>Ime</Form.Label>
                                <Form.Control type="text" name="ime" required defaultValue={korisnik.ime}
                                    isInvalid={!!errors.ime}
                                    onFocus={() => ocistiGresku('ime')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.ime}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="prezime" className="mb-3">
                                <Form.Label>Prezime</Form.Label>
                                <Form.Control type="text" name="prezime" required defaultValue={korisnik.prezime}
                                    isInvalid={!!errors.prezime}
                                    onFocus={() => ocistiGresku('prezime')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.prezime}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="brojTelefona" className="mb-3">
                                <Form.Label>Broj telefona</Form.Label>
                                <Form.Control type="tel" name="brojTelefona" required defaultValue={korisnik.brojTelefona}
                                    isInvalid={!!errors.brojTelefona}
                                    onFocus={() => ocistiGresku('brojTelefona')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.brojTelefona}
                                </Form.Control.Feedback>
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