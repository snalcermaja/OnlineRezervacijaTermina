export default function FormatDatuma({datum,prikazZadano='-'}){
    if(!datum){
        return prikazZadano
    }
    const d = new Date(datum) 
    if(isNaN(d.getTime())){
        return prikazZadano
    }
    return Intl.DateTimeFormat('hr-HR',{
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(d) 
}