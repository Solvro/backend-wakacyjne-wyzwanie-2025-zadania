import { DatabaseService } from 'src/database/database.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';


@Injectable()
export class ExpenseService {

       constructor(private database: DatabaseService){};

    async create(createExpenseDto: CreateExpenseDto) {
    	  return this.database.expense.create({
    	  	 data:
			{
	  		trip_id: CreateExpenseDto.trip_id,
  	  		desc:	   CreateExpenseDto.desc,
	 		price:   CreateExpenseDto.price,
			}
	 });
   }

  async findAll() {
    return this.database.expense.findMany();
  }


  async findOne(id: number) {
   	const expense: unknown = this.database.expense.findUnique({
      		  where: { id },
	});
    if(expense == null){
       	throw new NotFoundException("EXEPTION: No expense with this id found in database!");
    }
    else{
      	return expense;
    }
  }

async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense: unknown = this.database.expense.findUnique({
      where: { id },
    });
    if (expense == null) {
      throw new NotFoundException("EXEPTION: No expense with this id found in database!");
    }
    else {
      return this.database.expense.update({
        where: { id },
        data: {
	      trip_id: CreateExpenseDto.trip_id,
              desc:    CreateExpenseDto.desc,
              price:   CreateExpenseDto.price,
	      }
      });
    }
  }

async remove(id: number) {
    const expense: unknown = this.database.expense.findUnique({
      where: { id },
    });
    if (expense == null) {
      throw new NotFoundException("EXEPTION: No expense with this id found in database!");
    }
    else {
      return this.database.expense.delete({ where: { id } });
    }
  }
}