import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Shipwreck Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vanilla'],
        },
    ];

    findAll() {
        return this.coffees;
    }

    findOne(id: string) {
        const coffee = this.coffees.find(coffee => coffee.id === +id);
        if(!coffee) {
            throw new NotFoundException(`Coffee #${id}, not found`);
        }
        return coffee;
    }

    create(coffeeDto: any) {
        this.coffees.push(coffeeDto);
    }

    update(id: string, coffeeDto: any) {
        const existingCoffee = this.findOne(id);
        if (existingCoffee) {
            // update the existing entity
        }
    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if (coffeeIndex >= 0) {
          this.coffees.splice(coffeeIndex, 1);
        }
      }
}
