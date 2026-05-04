import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import KorisniciService from "../../services/korisnici/KorisniciService";
import { ShemaKorisnik } from "../../schemas/ShemaKorisnik"
import { useState } from "react";

export default function KorisnikNovi() {

    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    async function dodaj(korisnik) {
        await KorisniciService.dodaj(korisnik).then(() => {
            navigate(RouteNames.KORISNICI)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({})
        const objektPodataka = Object.fromEntries(podaci)

        const rezultat = ShemaKorisnik.safeParse(objektPodataka)

        if (!rezultat.success) {
            const noveGreske = {}

            rezultat.error.issues.forEach((issue) => {
                const kljuc = issue.path[0]
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message
                }
            })
            setErrors(noveGreske)
            return
        }
        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            brojTelefona: podaci.get('brojTelefona')
        })
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors }
            delete noveGreske[nazivPolja]
            setErrors(noveGreske)
        }
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
                                <Form.Control type="text" name="ime"  placeholder="Unesite ime"
                                    isInvalid={!!errors.ime}
                                    onFocus={() => ocistiGresku('ime')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.ime}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="prezime">
                                <Form.Label className="fw-bold">Prezime</Form.Label>
                                <Form.Control type="text" name="prezime"  placeholder="Unesite prezime"
                                    isInvalid={!!errors.prezime}
                                    onFocus={() => ocistiGresku('prezime')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.prezime}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="brojTelefona">
                                <Form.Label className="fw-bold">Broj telefona</Form.Label>
                                <Form.Control type="tel" name="brojTelefona" placeholder="09x / xxx xxxx"
                                    isInvalid={!!errors.brojTelefona}
                                    onFocus={() => ocistiGresku('brojTelefona')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.brojTelefona}
                                </Form.Control.Feedback>
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