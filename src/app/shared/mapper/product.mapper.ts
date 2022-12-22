import {Injectable} from "@angular/core";
import {Product} from "@models/product.model";
import {ProductDto} from "../dto/product/product.dto";

@Injectable({
  providedIn: "root",
})
export class ProductMapper {
  dtoToModel(dto: ProductDto): Product {
    if (!dto) {
      throw new Error("Unable run the mapping");
    }
    return {
      id: dto.id,
      productName: dto.productName,
      price: dto.price,
      quantity: dto.quantity,
      isImported: dto.isImported,
      category: dto.category
    };
  }
}
