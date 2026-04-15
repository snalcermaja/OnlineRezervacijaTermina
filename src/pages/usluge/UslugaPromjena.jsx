import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import UslugeService from "../../services/usluge/UslugeService";
import { useEffect, useState } from "react";

export default function UslugaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [usluga, setUsluga] = useState({})

    async function ucitajUsluga() {
        await UslugeService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            const s = odgovor.data

            setUsluga(s)
        })
    }

    useEffect(() => {
        ucitajUsluga()
    }, [])

    async function promjeni(usluga) {
        await UslugeService.promjeni(params.sifra, usluga).then(() => {
            navigate(RouteNames.USLUGE)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
            naziv: podaci.get('naziv'),
            cijena: podaci.get('cijena')
        })
    }

    return (
        <>
            <Container className="mt-4">
                <h2>Promjena usluge</h2>
                <hr />

                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <Form onSubmit={odradiSubmit}>
                            <Form.Group className="mb-3" controlId="naziv">
                                <Form.Label className="fw-bold">Naziv</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="naziv"
                                    required
                                    defaultValue={usluga.naziv}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="cijena">
                                <Form.Label className="fw-bold">Cijena</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="cijena"
                                    required
                                    defaultValue={usluga.cijena}
                                />
                            </Form.Group>

                            <hr style={{ marginTop: '30px', marginBottom: '30px', border: '0' }} />

                            <div className="d-flex justify-content-between">
                                <Link to={RouteNames.USLUGE} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success" className="px-4">
                                    Promijeni uslugu
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}