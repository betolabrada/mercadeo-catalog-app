export default class Product {
    constructor(
        public id: number,
        public nombre: string,
        public precio: string,
        public imageSrc: string,
        public imageAlt: string,
        public presentacion: string,
        public href: string = "#",
        public categoria: string,
        public marca: string,
        public nota: string,
    ) {}
}
