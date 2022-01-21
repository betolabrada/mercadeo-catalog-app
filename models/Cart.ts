import ProductCart from "./ProductCart";

export default class Cart {
    public constructor(public products: ProductCart[]) {}

    public addToCart(product: ProductCart) {
        this.products.push(product);
    }

    public removeFromCart(product: ProductCart) {
        const index = this.products.findIndex((x: ProductCart) => 
            x.product.id === product.product.id
        );
        this.products.splice(index, 1);
    }

    public getTotalPrice() {
        return this.products.length <= 0 ? 0 : this.products
            .map(x => x.product.price * x.quantity)
            .reduce((prev, cur) => prev + cur);
    }
}
