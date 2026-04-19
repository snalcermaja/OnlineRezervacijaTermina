import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

export default function RezervacijaPDFGenerator({ rezervacija, korisnik, usluga }) {

    const fetchFontAsBase64 = async (url) => {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Font nije pronađen: ${url}`)
        const blob = await response.blob()
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result.split(',')[1])
            reader.readAsDataURL(blob)
        })
    }

    const generirajPDF = async () => {
        const [regBase64, boldBase64] = await Promise.all([
            fetchFontAsBase64('/fonts/Roboto-Regular.ttf'),
            fetchFontAsBase64('/fonts/Roboto-Bold.ttf')
        ]);

        const doc = new jsPDF();

        doc.addFileToVFS('Roboto-Regular.ttf', regBase64);
        doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');

        doc.addFileToVFS('Roboto-Bold.ttf', boldBase64);
        doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');

        doc.setFont('Roboto', 'normal')
        doc.setFontSize(20)
        doc.setTextColor(100, 149, 237)
        doc.text('Harmony Massage Studio', 20, 20)

        doc.setFontSize(10);
        doc.setTextColor(102, 102, 102);
        doc.text('EVIDENCIJA KORISNIKA, REZERVACIJA I USLUGA', 20, 27);

        doc.setFont('Roboto', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text('POPIS REZERVACIJA', 20, 45);

        doc.setDrawColor(46, 125, 50);
        doc.setLineWidth(0.5);
        doc.line(20, 48, 190, 48);

        let yPosition = 60;

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Podaci o rezervaciji:', 20, yPosition);
        yPosition += 10;

        doc.setFontSize(11)
        doc.setFont(undefined, 'normal')
        doc.text(`Broj usluga: ${rezervacija.usluge ? rezervacija.usluge.length : 0}`, 25, yPosition)
        yPosition += 15

        doc.setFontSize(14)
        doc.setFont(undefined, 'bold')
        doc.text('Podaci o korisniku:', 20, yPosition)
        yPosition += 10

        doc.setFontSize(11)
        doc.setFont(undefined, 'normal')
        doc.text(`Ime: ${korisnik.ime}`, 25, yPosition)
        yPosition += 7
        doc.text(`Prezime: ${korisnik.prezime}`, 25, yPosition)
        yPosition += 7
        doc.text(`Broj telefona: ${korisnik.brojTelefona}`, 25, yPosition)
        yPosition += 7

        doc.setFontSize(14)
        doc.setFont(undefined, 'bold')
        doc.text('Popis usluga:', 20, yPosition)
        yPosition += 10

        if (usluga && usluga.length > 0) {
            const tableData = usluga.map(usluga => [
                usluga.naziv,
                usluga.cijena
            ])

            autoTable(doc, {
                startY: yPosition,
                head: [['Naziv', 'Cijena']],
                body: tableData,
                tableWidth: 'auto',


                margin: { left: 15, right: 15 },

                styles: {
                    font: 'Roboto',
                    fontStyle: 'normal',
                    fontSize: 10,
                    overflow: 'linebreak'
                },

                headStyles: {
                    font: 'Roboto',
                    fontStyle: 'bold',
                    fillColor: [46, 125, 50]
                },

                columnStyles: {
                    0: { cellWidth: 35 },
                    1: { cellWidth: 35 }
                }
            });
        } else {
            doc.setFontSize(11);
            doc.setFont(undefined, 'italic');
            doc.text('Nema usluga u ovoj rezervaciji.', 25, yPosition);
        }

        const pageCount = doc.internal.getNumberOfPages()
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i)
            doc.setFontSize(8)
            doc.setTextColor(128, 128, 128)
            doc.text(
                `Stranica ${i} od ${pageCount}`,
                doc.internal.pageSize.getWidth() / 2,
                doc.internal.pageSize.getHeight() - 10,
                { align: 'center' }
            );
            doc.text(
                `Generirano: ${new Date().toLocaleString('hr-HR')}`,
                20,
                doc.internal.pageSize.getHeight() - 10
            )
        }

        const pdfBlob = doc.output('blob')
        const pdfUrl = URL.createObjectURL(pdfBlob)
        window.open(pdfUrl, '_blank')
    }

    return generirajPDF
}