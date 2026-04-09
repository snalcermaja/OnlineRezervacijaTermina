import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
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
            <h2>
                Unos nove usluge
            </h2>
            <hr />

            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" name="cijena" required />
                </Form.Group>

                <hr style={{ marginTop: '50px', border: '0' }} />

                <Row>
                    <Col>
                        <Link to={RouteNames.USLUGE} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>

                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj uslugu
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}