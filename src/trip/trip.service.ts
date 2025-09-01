import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripService {
  constructor(private database: DatabaseService) {}

  async create(createTripDto: CreateTripDto) {
    return this.database.trip.create({
      data: {
        name: createTripDto.name,
        destination: createTripDto.destination,
        budget: createTripDto.budget, 
        startDate: new Date(createTripDto.startDate),
        endDate: createTripDto.endDate
      },
    });
  }

  async findAll() {
    return this.database.trip.findMany();
  }

  async findOne(id: number) {
   return this.database.trip.findUnique({ where: { id } });
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    return this.database.trip.update({
      where: { id },
      data: {
        name: updateTripDto.name,
        destination: updateTripDto.destination,
        budget: updateTripDto.budget, 
        startDate: updateTripDto.startDate,
        endDate: updateTripDto.endDate
      },
    });
  }

  async remove(id: number) {
    return this.database.trip.delete({ where: { id } });
  }
}
