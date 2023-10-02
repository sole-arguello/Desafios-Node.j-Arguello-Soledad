import express from 'express';
import { __dirname } from './utils.js';//importo dirname para obtener la ruta de mis archivos y path para unir diferentes rutas
import path from 'path';
import { engine } from 'express-handlebars'; //importo libreria handlebars y socket.io
import { Server } from 'socket.io';
import{ connectDB } from './config/dbConnection.js';//importo connectDB
//import { chatService } from './dao/index.js'; //importo el servicio de caht para uasrlo en socket
import { productsService } from './dao/index.js';//importo el servicio de caht para uasrlo en socket


//importo rutas http y las de handlebars
import { viewsRouter } from './routes/views.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';

const port = 8080;//configuro puerto
const app = express();

//midleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

//configuro para websocket del lado del server
const httpSever = app.listen(port, () => {console.log(`app listening at http://localhost:${port}`);})//http
const io = new Server(httpSever);//web socket
connectDB() //conexion base de datos mongo


io.on('connection', async (socket) => {
    console.log('Cliente Conectado');
    try {
        //obtengo todos los productos y los envio al cliente
        const products = await productsService.getProducts();
        //envio los productos al cliente
        socket.emit('productsArray', products);
    } catch (error) {
        console.log('Error al obtener los productos', error.message);
        
    }

    //recibo los productos del cliente, los creo y envio al server
    socket.on('newProduct', async (productData) => {
        try {
            //creo los productos 
            await productsService.createProduct(productData);
            //obtengo y actualizo los productos
            const products = await productsService.getProducts();
            //emito la lista actualizada
            socket.emit('productsArray', products);
            
        } catch (error) {
            console.error('Error al crear un producto:', error.message);
        }
    })

     // Manejar la eliminación de un producto
    socket.on('deleteProduct', async (productId) => {
        try {
            // Eliminar el producto de la lista de productos por su ID
            await productsService.deleteProduct(productId);
            // Obtener la lista actualizada de productos
            const updatedProducts = await productsService.getProducts();
            // Emitir la lista actualizada de productos al cliente
            socket.emit('productsArray', updatedProducts);
        } catch (error) {
            // Manejar errores, por ejemplo, si el producto no se encuentra
            console.error('Error al eliminar un producto:', error.message);
        }
    });
  
})


//configuracion de handlebars, motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));//src/views



//rutas trabajadas con mongo
app.use(viewsRouter); 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter)


