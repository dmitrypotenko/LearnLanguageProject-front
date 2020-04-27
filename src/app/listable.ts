export interface Listable {

  getId(): number;

  getOrder(): number;

  getName(): string;

  completed(): boolean;
}
