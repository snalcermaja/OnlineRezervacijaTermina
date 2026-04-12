import 'bootstrap/dist/css/bootstrap.min.css'
import slika01 from "../images/slika01.jpg"
import slika02 from "../images/slika02.jpg"
import slika03 from "../images/slika03.jpg"
import { useState, useEffect } from 'react'
import KorisniciService from '../services/korisnici/KorisniciService'
import UslugeService from '../services/usluge/UslugeService'
import RezervacijaService from '../services/rezervacije/RezervacijaService'



export default function Home() {

    const [brojKorisnika, setBrojKorisnika] = useState(0);
    const [brojUsluga, setBrojUsluga] = useState(0);
    const [brojRezervacija, setBrojRezervacija] = useState(0);


    const [animatedKorisnici, setAnimatedKorisnici] = useState(0);
    const [animatedUsluge, setAnimatedUsluge] = useState(0);
    const [animatedRezervacije, setAnimatedRezervacije] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const korisniciRezultat = await KorisniciService.get();
                const uslugeRezultat = await UslugeService.get();
                const rezervacijeRezultat = await RezervacijaService.get();

                setBrojKorisnika(korisniciRezultat.data.length);
                setBrojUsluga(uslugeRezultat.data.length);
                setBrojRezervacija(rezervacijeRezultat.data.length);
            } catch (e) {
                console.error("Greška pri dohvaćanju podataka", e);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (animatedKorisnici < brojKorisnika) {
            const timer = setTimeout(() => {
                setAnimatedKorisnici(prev => prev + 1);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [animatedKorisnici, brojKorisnika]);

    useEffect(() => {
        if (animatedUsluge < brojUsluga) {
            const timer = setTimeout(() => {
                setAnimatedUsluge(prev => prev + 1);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [animatedUsluge, brojUsluga]);

    useEffect(() => {
        if (animatedRezervacije < brojRezervacija) {
            const timer = setTimeout(() => {
                setAnimatedRezervacije(prev => prev + 1);
            }, 50); 
            return () => clearTimeout(timer);
        }
    }, [animatedRezervacije, brojRezervacija]);

    return (
        <>
            <div className="container mt-4">

                <div className="row mb-5 justify-content-center">
                    <div className="col-md-3">
                        <div className="card shadow-sm border-0 text-center bg-light" style={{ borderRadius: '15px' }}>
                            <div className="card-body">
                                <h6 className="text-muted text-uppercase small">Korisnici</h6>
                                <h3 className="fw-bold text-secondary">{brojKorisnika}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm border-0 text-center bg-light" style={{ borderRadius: '15px' }}>
                            <div className="card-body">
                                <h6 className="text-muted text-uppercase small">Usluge</h6>
                                <h3 className="fw-bold text-secondary">{brojUsluga}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm border-0 text-center bg-light" style={{ borderRadius: '15px' }}>
                            <div className="card-body">
                                <h6 className="text-muted text-uppercase small">Rezervacije</h6>
                                <h3 className="fw-bold text-secondary">{brojRezervacija}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className='text-secondary'>Harmony Massage Studio</h1>
                <hr />

                <p className='fw-semibold'>Dobrodošli u naš studio za masažu</p>

                <p>U našem studiju posvećeni smo vašem opuštanju i zdravlju. Nudimo profesionalne masaže koje pomažu u smanjenju stresa, opuštanju mišića i vraćanju energije tijelu.</p>

                <p>Uz ugodnu atmosferu i individualan pristup svakom klijentu, naš cilj je da se nakon svake masaže osjećate bolje.</p>

                <p>Bilo da tražite trenutak mira nakon napornog dana ili želite redovitu njegu tijela, naš studio je mjesto gdje vaše tijelo i um dolaze na prvo mjesto.</p>

                <p>Rezervirajte svoj termin i priuštite si vrijeme za sebe.</p>

                <div className="row mt-4">

                    <div className="col-md-4">
                        <img src={slika02} className="img-fluid rounded shadow" />
                    </div>

                    <div className="col-md-4">
                        <img src={slika01} className="img-fluid rounded shadow" />
                    </div>

                    <div className="col-md-4">
                        <img src={slika03} className="img-fluid rounded shadow" />
                    </div>

                </div>

            </div>
        </>
    )
}