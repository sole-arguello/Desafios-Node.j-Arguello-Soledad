import express from 'express';
//importo libreria handlebars y socket.io
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
//importo dirname para obtener la ruta de mis archivos y path para unir diferentes rutas
import { __dirname } from './utils.js';
import path from 'path';
//importo los productos
import { productsService } from './persistence/index.js';
//importo rutas propias y las de handlebars
import { productsRoutes } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { viewsRouter } from './routes/views.routes.js';


const port = 8080;
const app = express();
app.use(express.json());

//midleware
app.use(express.static(path.join(__dirname, '/public')));

//configuro para websocket del lado del server
const httpSever = app.listen(port, () => {console.log(`app listening at http://localhost:${port}`);})
const io = new Server(httpSever);
io.on('connection', async (socket) => {
    console.log('Cliente Conectado');
    //obtengo todos los productos
    const products = await productsService.getProducts();
    //envio los productos al cliente
    socket.emit('productsArray', products);
})

//configuracion de handlebars, motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));//src/views



//rutas
app.use(viewsRouter)
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRouter)



