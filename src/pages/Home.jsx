import 'bootstrap/dist/css/bootstrap.min.css'
import slika01 from "../images/slika01.jpg"
import slika02 from "../images/slika02.jpg"
import slika03 from "../images/slika03.jpg"


export default function Home() {
    return (
        <>
            <div className="container mt-4">

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