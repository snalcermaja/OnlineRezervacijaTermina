import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import KorisniciService from "../../services/korisnici/KorisniciService";
import { useEffect, useState } from "react";

export default function KorisnikPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [korisnik,setKorisnik] = useState({})

    async function ucitajKorisnik() {
            await KorisniciService.getBySifra(params.sifra).then((odgovor)=>{

                const s = odgovor.data

                setKorisnik(s)
            })
        }

    useEffect(()=>{
        ucitajKorisnik()
    },[])

    async function promjeni(korisnik) {
        await KorisniciService.promjeni(params.sifra,korisnik).then(()=>{
          navigate(RouteNames.KORISNICI)
        })
    }

    function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
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
                <Form.Control type="text" name="ime" required 
                defaultValue={korisnik.ime} />
            </Form.Group>

            <Form.Group controlId="prezime">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="prezime" required 
                defaultValue={korisnik.prezime} />
            </Form.Group>

            <Form.Group controlId="brojTelefona">
                <Form.Label>Broj telefona</Form.Label>
                <Form.Control type="tel" name="brojTelefona" required
                defaultValue={korisnik.brojTelefona} />
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
                        Promjeni korisnika
                    </Button>
                </Col>
            </Row>
        </Form>
        </>
    )
}