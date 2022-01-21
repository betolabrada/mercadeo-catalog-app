import Product from "./Product";

export default class ProductCart {
    constructor(
        public product: Product,
        public quantity: number
    ) {}
}
