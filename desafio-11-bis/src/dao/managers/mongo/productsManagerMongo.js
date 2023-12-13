import { productsModel } from './models/products.model.js';

export class ProductsManagerMongo{

    constructor(){
        this.model = productsModel
    }

    //metodo para obtener productos del paginate
    async getProductsPaginate(query, options){
        try {
            console.log('paso por manager getProductsPaginate');
            const result = await this.model.paginate(query, options);
           
            return result
        } catch (error) {
            console.log('error en manager getProductsPaginate',error.message);
            throw new Error('No se pudo obtener el listado de  producto',error.message);
        }
    }

    async createProduct(infoProduct){
        try {
            console.log('paso por manager createProduct');
            //uso el modelo definido y el metodo de mongo
            const resultado = await this.model.create(infoProduct);
            
            return resultado
        } catch (error) {
            //mensaje interno
            console.log('Error en manager createProduct',error.message);
            //nmensaje al cliente
            throw new Error('No se pudo crea el producto',error.message);
        }
    }
    async getProducts(){
        try {
            console.log('paso por manager getProducts');
            //uso el modelo definido y el metodo de mongo
            const resultado = await this.model.find().lean();//soluciona el bloqueo de handelbarspara mostrar en home
            
            return resultado
        } catch (error) {
            //mensaje interno
            console.log('error en manager getProducts',error.message);
            //nmensaje al cliente
            throw new Error('No se pudo obtener el listado de  producto',error.message);
        }
    }
    async getProductById(prodcutId){
        try {
            console.log('paso por manager getProductById');
            //uso el modelo definido y el metodo de mongo
            const resultado = await this.model.findById(prodcutId);//tambien se puede usar findOne({_id: id})
           
            return resultado
        } catch (error) {
            //mensaje interno
            console.log('error en manager getProductById',error.message);
            //nmensaje al cliente
            throw new Error('No se pudo obtener el producto',error.message);
        }
    }
    async updateProduct(prodcutId, newProduct){
        try {
            console.log('paso por manager updateProduct');
            //uso el modelo definido y el metodo de mongo
            const resultado = await this.model.findOneAndUpdate({_id: prodcutId}, newProduct, {new: true});//tambien se puede usar updateOne({_id: id}, product)
            if(!resultado){
                throw new Error('No se pudo encontrar el producto, para actualizarlo');
            }
            
            return resultado
        } catch (error) {
            //mensaje interno
            console.log('Error en manager updateProduct',error.message);
            //nmensaje al cliente
            throw new Error('No se pudo actualizar el producto',error.message);
        }
    }
    async deleteProduct(prodcutId){
        try {
            console.log('paso por manager deleteProduct');
            //uso el modelo definido y el metodo de mongo
            const resultado = await this.model.findByIdAndDelete(prodcutId);//tambien se puede usar deleteOne({_id: id})
            if(!resultado){
                throw new Error('No se pudo encontrar el producto a eliminar');
            }
            
            return resultado
        } catch (error) {
            //mensaje interno
            console.log('Error en manager deleteProduct',error.message);
            //nmensaje al cliente
            throw new Error('No se pudo encontrar el producto, para actualizarlo',error.message);
        }
    }
}