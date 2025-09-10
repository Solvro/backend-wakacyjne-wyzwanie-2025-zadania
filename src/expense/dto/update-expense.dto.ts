import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
       @ApiPropertyOptional()
       trip_id?: number;
       @ApiPropertyOptional()
       desc?:    string;
       @ApiPropertyOptional()
       price?:   number;

}
