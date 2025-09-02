export interface IProgramme {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
}

export default class Programme implements IProgramme {
  id: number;
  title: string;
  description: string;
  releaseDate: string;

  constructor(data: IProgramme) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.releaseDate = data.releaseDate;
  }
}