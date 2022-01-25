import ProductCart from "./ProductCart";

export default class Cart {
    public constructor(public products: ProductCart[]) {}

    public addToCart(product: ProductCart) {
        const index = this.products.findIndex((x: ProductCart) => 
            x.product.id === product.product.id
        );
        console.log(index);
        
        if (index < 0) {
            this.products.push(product);
        }
        else {
            this.products[index].quantity += product.quantity;
        }
    }

    public removeFromCart(product: ProductCart) {
        const index = this.products.findIndex((x: ProductCart) => 
            x.product.id === product.product.id
        );
        console.log(index);
        
        this.products.splice(index, 1);
    }

    public getTotalPrice() {
        return this.products.length <= 0 ? 0 : this.products
            .map(x => x.product.precio * x.quantity)
            .reduce((prev, cur) => prev + cur);
    }
}
