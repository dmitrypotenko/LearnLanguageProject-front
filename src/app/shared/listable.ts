export interface Listable {

  getOrder(): number;

  getName(): string;

  completed(): boolean;
}
