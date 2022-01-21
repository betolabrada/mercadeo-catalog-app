export default class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public imageSrc: string,
        public imageAlt: string,
        public contentDescription: string,
        public href: string = "#"
    ) {}
}
