export class CartsManagerMongo {
    
    constructor(){}

    async getCarts() {
        try {
            const resultado = await this.model.find();
            return resultado;
        } catch (error) {
            console.log('get carrito', error.message);
            throw new Error('No se pudo obtener el listado de los carritos ', error.message);
        }
    }
    async createCart(productId){
        try {
            const cart = await this.model.create({ productId: [{ productId, quantity: 1 }] });
            return cart
        } catch (error) {
            console.log('crear carrito', error.message);
            throw new Error('No se pudo crear el carrito ', error.message);
        }
    }

    async addProduct(cartId, productId){
        try {
            const cart = await this.model.findOneAndUpdate({ _id: cartId })
            if(!cart){
                throw new Error("No es posible obtener los carritos");
            }
            const existProduct = cart.productId.find((product) => product.productId === productId);
            if(!existProduct){
                existProduct.quantity += quantity || 1
            }else{
                cart.product.push({ productId, quantity:  quantity || 1 });
            }
            await cart.save()
            return cart
        } catch (error) {
            console.log('agregar producto', error.message);
            throw new Error('No se pudo agregar el producto ', error.message);
        }
    }
}