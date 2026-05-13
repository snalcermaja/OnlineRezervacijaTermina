import { useState, useEffect } from "react"
import RezervacijaService from "../services/rezervacije/RezervacijaService"
import useLoading from "../hooks/useLoading"
import { Container } from "react-bootstrap"
import Highcharts from 'highcharts'
import {HighchartsReact} from 'highcharts-react-official'

export default function NadzornaPloca() {

    const [podaci, setPodaci] = useState([])
    const { showLoading, hideLoading } = useLoading()




    async function getPodaci() {
        showLoading()
        const odgovor = await RezervacijaService.get()
        setPodaci(odgovor.data.map((rezervacije) => {
            return {
                y: rezervacije.usluge.length,
                name: rezervacije.naziv,
            }
        }))
        hideLoading()
    }

    useEffect(() => {
        getPodaci()
    }, [])

    const fixedOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: 'Broj usluga po rezervacijij',
            align: 'left',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
            enabled: false,
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>',
                },
            },
        },
    }


    return (
        <>
            <Container className='mt-4'>
                {podaci.length > 0 && (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            ...fixedOptions,
                            series: [
                                {
                                    name: 'Korisnici',
                                    colorByPoint: true,
                                    data: podaci,
                                },
                            ],
                        }}
                    />
                )}
            </Container>
        </>
    )
}