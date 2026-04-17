import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import UslugeService from "../../services/usluge/UslugeService";

export default function UslugaNova() {

    const navigate = useNavigate()

    async function dodaj(usluga) {
        await UslugeService.dodaj(usluga).then(() => {
            navigate(RouteNames.USLUGE)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            cijena: podaci.get('cijena')
        })
    }

    return (
        <>
            <Container className="mt-4">
                <h2>Unos nove usluge</h2>
                <hr />

                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <Form onSubmit={odradiSubmit}>
                            <Form.Group className="mb-3" controlId="ime">
                                <Form.Label className="fw-bold">Naziv</Form.Label>
                                <Form.Control type="text" name="naziv" required placeholder="Unesite naziv usluge" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="cijena">
                                <Form.Label className="fw-bold">Cijena</Form.Label>
                                <Form.Control type="number" name="cijena" required placeholder="0,00" />
                            </Form.Group>

                            <hr style={{ marginTop: '30px', marginBottom: '30px', border: '0' }} />

                            <div className="d-flex justify-content-between">
                                <Link to={RouteNames.USLUGE} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success" className="px-4">
                                    Dodaj uslugu
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}