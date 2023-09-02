//importo modulo externo express para crear la aplicacion
import express from "express"

//creo el puerto
const port = 8080
//creo la aplicacion
const app = express()

//levanto el servidor y pongo a escuchar el puerto
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})
