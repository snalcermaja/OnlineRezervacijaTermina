import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import UslugeService from "../../services/usluge/UslugeService";
import { useEffect, useState } from "react";

export default function UslugaPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [usluga,setUsluga] = useState({})

    async function ucitajUsluga() {
            await UslugeService.getBySifra(params.sifra).then((odgovor)=>{
                if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
                const s = odgovor.data

                setUsluga(s)
            })
        }

    useEffect(()=>{
        ucitajUsluga()
    },[])

    async function promjeni(usluga) {
        await UslugeService.promjeni(params.sifra,usluga).then(()=>{
          navigate(RouteNames.USLUGE)
        })
    }

    function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
            naziv: podaci.get('naziv'),
            trajanje: podaci.get('trajanje'),
            cijena: podaci.get('cijena')
        }) 
    }

    return(
        <>
        <h2>
            Unos nove usluge
        </h2>

        <Form onSubmit={odradiSubmit}>
            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required 
                defaultValue={usluga.naziv} />
            </Form.Group>

            <Form.Group controlId="trajanje">
                <Form.Label>Trajanje</Form.Label>
                <Form.Control type="number" name="trajanje" required 
                defaultValue={usluga.prezime} />
            </Form.Group>

            <Form.Group controlId="cijena">
                <Form.Label>Cijena</Form.Label>
                <Form.Control type="tel" name="cijena" required
                defaultValue={usluga.cijena} />
            </Form.Group>

            <hr style={{marginTop: '50px',border: '0'}}/>

            <Row>
                <Col>
                    <Link to={RouteNames.USLUGE} className="btn btn-danger">
                    Odustani
                    </Link>
                </Col>

                <Col>
                    <Button type="submit" variant="success">
                        Promjeni uslugu
                    </Button>
                </Col>
            </Row>
        </Form>
        </>
    )
}