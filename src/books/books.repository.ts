import { EntityRepository, Repository } from "typeorm";
import { Book } from "./book.entity";

@EntityRepository(Book)
export class BooksRepository extends Repository<Book>{
    

}