export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  colors: string[] = [
    'black',
    'white',
    'red',
  ];

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    image: string,
    colors?: string[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    if (colors) {
      this.colors = colors;
    }
  }
}
