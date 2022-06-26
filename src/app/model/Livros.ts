export class Livro {
  id: string;
  livro: string;
  autor: string;
  editora: string;
  tipo: string;
  categoria: string;

  constructor(
    livro: string,
    autor: string,
    editora: string,
    tipo: string,
    categoria: string
  ) {
    this.id = String(Math.round(Math.random() * 1000));
    this.livro = livro;
    this.autor = autor;
    this.editora = editora;
    this.tipo = tipo;
    this.categoria = categoria;
  }

  public static clone(liv: Livro) {
    let l: Livro = new Livro(
      liv.livro,
      liv.autor,
      liv.editora,
      liv.tipo,
      liv.categoria
    );
    l.livro = liv.livro;
    l.autor = liv.autor;
    l.editora = liv.editora;
    l.tipo = liv.tipo;
    l.categoria = liv.categoria;
    return l;
  }
}
