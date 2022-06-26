export class Categoria {
  id: string;
  categoria: string;

  constructor(categoria: string) {
    this.id = String(Math.round(Math.random() * 100));
    this.categoria = categoria;
  }

  public static clone(cat: Categoria) {
    let c: Categoria = new Categoria(cat.categoria);
    c.id = cat.id;
    c.categoria = cat.categoria;
    return c;
  }
}
