
export class ProductsRepository {

    constructor(dao){
        this.dao = dao
    }
    async getProductsPaginate(query, options) {
        return productsPaginate = await this.dao.getProductsPaginate(query, options);
    }
    async createProduct(infoProduct) {
        return newProduct = await this.dao.createProduct(infoProduct);
    }
    async getProducts() {
        return products = await this.dao.getProducts();
    }
    async getProductById(prodcutId) {
        return idProduct = await this.dao.getProductById(prodcutId);
    }
    async updateProduct(prodcutId, newProduct) {
        return productUpdated = await this.dao.updateProduct(prodcutId, newProduct);
    }
    async deleteProduct(prodcutId) {
        return productDeleted = await this.dao.deleteProduct(prodcutId);
    }
}