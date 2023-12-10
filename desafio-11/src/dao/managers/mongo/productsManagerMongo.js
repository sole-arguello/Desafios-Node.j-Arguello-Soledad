import { logger } from '../../../helpers/logger.js';
import { productsModel } from './models/products.model.js';

export class ProductsManagerMongo{

    constructor(){
        this.model = productsModel
    }

    //metodo para obtener productos del paginate
    async getProductsPaginate(query, options){
        try {
            logger.info('paso por manager getProductsPaginate');
            const result = await this.model.paginate(query, options);
           
            return result
        } catch (error) {
            logger.error('error en manager getProductsPaginate',error.message);
            throw new Error('No se pudo obtener el listado de  producto',error.message);
        }
    }

    async createProduct(infoProduct){
        try {
            
            //uso el modelo definido y el metodo de mongo
            const resultado = await this.model.create(infoProduct);
            logger.info('paso por manager createProduct');
            return resultado
        } catch (error) {
            //mensaje interno
            logger.error('Error en manager createProduct',error.message);
            //nmensaje al cliente
            throw new Error('No se pudo crea el producto',error.message);
        }
    }
    async getProducts(){
        try {
            //uso el modelo definido y el metodo de mongo
            const resultado = await this.model.find().lean();//soluciona el bloqueo de handelbarspara mostrar en home
            logger.info('paso por manager getProducts');
            return resultado
        } catch (error) {
            //mensaje interno
            logger.error('error en manager getProducts',error.message);
            //nmensaje al cliente
            throw new Error('No se pudo obtener el listado de  producto',error.message);
        }
    }
    async getProductById(prodcutId){
        try {
           
            //uso el modelo definido y el metodo de mongo
            const resultado = await this.model.findById(prodcutId);//tambien se puede usar findOne({_id: id})
            logger.error('paso por manager getProductById');
            return resultado
        } catch (error) {
            //mensaje interno
            logger.info('error en manager getProductById',error.message);
            //nmensaje al cliente
            throw new Error('No se pudo obtener el producto',error.message);
        }
    }
    async updateProduct(prodcutId, newProduct){
        try {
            logger.info('paso por manager updateProduct');
            //uso el modelo definido y el metodo de mongo
            const resultado = await this.model.findOneAndUpdate({_id: prodcutId}, newProduct, {new: true});//tambien se puede usar updateOne({_id: id}, product)
            if(!resultado){
                logger.error('No se pudo encontrar el producto, para actualizarlo');
                throw new Error('No se pudo encontrar el producto, para actualizarlo');
            }
            
            return resultado
        } catch (error) {
            //mensaje interno
            logger.error('Error en manager updateProduct',error.message);
            //nmensaje al cliente
            throw new Error('No se pudo actualizar el producto',error.message);
        }
    }
    async deleteProduct(prodcutId){
        try {
            //uso el modelo definido y el metodo de mongo
            const resultado = await this.model.findByIdAndDelete(prodcutId);//tambien se puede usar deleteOne({_id: id})
            if(!resultado){
                logger.error('No se pudo encontrar el producto a eliminar');
                throw new Error('No se pudo encontrar el producto a eliminar');
            }
            logger.info('paso por manager deleteProduct');
            return resultado
        } catch (error) {
            //mensaje interno
            logger.error('Error en manager deleteProduct',error.message);
            //nmensaje al cliente
            throw new Error('No se pudo encontrar el producto, para actualizarlo',error.message);
        }
    }
}