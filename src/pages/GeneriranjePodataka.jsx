import { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import { Faker, hr, en } from '@faker-js/faker';
import KorisniciService from '../services/korisnici/KorisniciService';
import UslugeService from '../services/usluge/UslugeService';
import RezervacijaService from '../services/rezervacije/RezervacijaService';


export default function GeneriranjePodataka() {
    const [brojKorisnika, setBrojKorisnika] = useState(5);
    const [brojUsluga, setBrojUsluga] = useState(20);
    const [brojRezervacija, setBrojRezervacija] = useState(10);
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    
    const faker = new Faker({
        locale: [hr, en]
    });

    const generirajKorisnike = async (broj) => {

        for (let i = 0; i < broj; i++) {
            await KorisniciService.dodaj({
                ime: i%2===0? faker.person.firstName('male') : faker.person.firstName('female'),
                prezime: faker.person.lastName(),
                brojTelefona: faker.phone.number('09# ### ####')
            });
        }
    };

    const generirajUsluge = async (broj) => {
        const nazivUsluge = [
        'Masaža leđa',
        'Masaža tijela',
        'Sportska masaža',
        'Masaža svijećom',
        'Aroma masaža'
    ];

        for (let i = 0; i < broj; i++) {
            const usluga = {
                naziv: nazivUsluge[i % nazivUsluge.length] + (i >= nazivUsluge.length ? ` ${Math.floor(i / nazivUsluge.length) + 1}` : ''),
                cijena: faker.number.float({min: 20, max: 60, precision: 0.01}).toFixed(2)
            };
            await UslugeService.dodaj(usluga);
        }
    };

    const generirajRezervacije = async (broj) => {

        const rezultatKorisnici = await KorisniciService.get();
        const korisnici = rezultatKorisnici.data;

        
        if (korisnici.length === 0) {
            throw new Error('Nema dostupnih korisnika. Prvo generirajte korisnike.');
        }
        
        for (let i = 0; i < broj; i++) {
            const randomKorisnik = korisnici[faker.number.int({ min: 0, max: korisnici.length - 1 })];
  
            const rezervacije = {
                ime: randomKorisnik.ime.trim().split(/\s+/).slice(0, 2).map(rijec => rijec[0]).join('').toUpperCase(),   
                korisnik: randomKorisnik.sifra,
                datum: faker.date.soon().toISOString().split('T')[0],
                napomena: faker.lorem.sentence()
            };
            
            await RezervacijaService.dodaj(rezervacije);
        }
    };

    const handleGenerirajKorisnike = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajKorisnike(brojKorisnika);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojKorisnika} k!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju korisnika: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajUsluge = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            
            await generirajUsluge(brojUsluga);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojUsluga} usluga!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju usluga: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiUsluge = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve usluge?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await UslugeService.get();
            const usluge = rezultat.data;
            
            for (const usluga of usluge) {
                await UslugeService.obrisi(usluga.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${usluge.length} uslugu!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju usluga: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiKorisnike = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve korisnike?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await KorisniciService.get();
            const korisnici = rezultat.data;
            
            for (const korisnik of korisnici) {
                await KorisniciService.obrisi(korisnik.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${korisnici.length} korisnici!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju korisnika: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajRezervacije = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajRezervacije(brojRezervacija);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojRezervacija} rezervacija!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju rezervacija: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiRezervacije = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve rezervacije?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await RezervacijaService.get();
            const rezervacije = rezultat.data;
            
            for (const rezervacija of rezervacije) {
                await RezervacijaService.obrisi(rezervacija.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${rezervacije.length} rezervacija!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju rezervacija: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h1>Generiranje podataka</h1>
            <p className="text-muted">
                Koristite ovaj alat za generiranje testnih podataka s lažnim (fake) podacima na hrvatskom jeziku.
            </p>

            {poruka && (
                <Alert variant={poruka.tip} dismissible onClose={() => setPoruka(null)}>
                    {poruka.tekst}
                </Alert>
            )}

            <Row>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajKorisnike}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj korisnika</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="50"
                                value={brojKorisnika}
                                onChange={(e) => setBrojKorisnika(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj korisnika (1-50)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj korisnike'}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajUsluge}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj usluga</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="200"
                                value={brojUsluga}
                                onChange={(e) => setBrojUsluga(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj usluga (1-200)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj usluge'}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajRezervacije}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj rezervacija</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="100"
                                value={brojRezervacija}
                                onChange={(e) => setBrojRezervacija(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj rezervacija (1-100)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj rezervacije'}
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Alert variant="warning" className="mt-3">
                <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće. 
                Ako želite početi ispočetka, prvo obrišite postojeće podatke.
            </Alert>

            <hr className="my-4" />

            <h3>Brisanje podataka</h3>
            <p className="text-muted">
                Koristite ove opcije za brisanje svih podataka iz baze.
            </p>

            <Row className="mt-3">
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiKorisnike}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve korisnike'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiUsluge}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve usluge'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiRezervacije}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve rezervacije'}
                    </Button>
                </Col>
            </Row>

            <Alert variant="danger" className="mt-3">
                <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
            </Alert>
        </Container>
    );
}