import { EnumCategory } from "../common/enumerators";

export type CreateServiceOrderInput = {
  code: number;
  detail: string;
  date?: Date;
  itens: ItemInput[];
}

export type ItemInput = {
  category: EnumCategory;
  description: string;
  price: number;
}
