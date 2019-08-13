import { IProduct } from './product.model';
import { IOrder } from './order.model';
import { SelectionModel } from '@angular/cdk/collections';

export interface ICompany {
    _id?: String;
    name: String;
    products: IProduct[];
}
