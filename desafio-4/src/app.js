import express from 'express';
//importo libreria handlebars
import { engine } from 'express-handlebars';
//importo dirname para obtener la ruta de mis archivos y path para unir diferentes rutas
import { __dirname } from './utils.js';
import path from 'path';

import { productsRoutes } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';

const port = 8080;
const app = express();
app.use(express.json());


app.listen(port, () => {console.log(`app listening at http://localhost:${port}`);})
//rutas
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRouter)

//configuracion de handlebars, motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));//src/views



app.get('/', (req, res) => {
    res.render('form')
})

