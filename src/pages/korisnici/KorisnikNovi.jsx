import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import KorisniciService from "../../services/korisnici/KorisniciService";

export default function KorisnikNovi(){

    const navigate = useNavigate()

    async function dodaj(korisnik) {
        await KorisniciService.dodaj(korisnik).then(()=>{
          navigate(RouteNames.KORISNICI)
        })
    }

    function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            brojTelefona: podaci.get('brojTelefona')
        }) 
    }

    return(
        <>
        <h2>
            Unos novog korisnika
        </h2>

        <Form onSubmit={odradiSubmit}>
            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime" required />
            </Form.Group>

            <Form.Group controlId="prezime">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="prezime" required />
            </Form.Group>

            <Form.Group controlId="brojTelefona">
                <Form.Label>Broj telefona</Form.Label>
                <Form.Control type="tel" name="brojTelefona" required />
            </Form.Group>

            <hr style={{marginTop: '50px',border: '0'}}/>

            <Row>
                <Col>
                    <Link to={RouteNames.KORISNICI} className="btn btn-danger">
                    Odustani
                    </Link>
                </Col>

                <Col>
                    <Button type="submit" variant="success">
                        Dodaj korisnika
                    </Button>
                </Col>
            </Row>
        </Form>
        </>
    )
}