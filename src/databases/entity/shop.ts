import { BaseEntity } from "typeorm";
import { Entity } from "../../domains/abstracts/Entity";

@Entity()
export class Product {
  id: number;
  name: string;
}

