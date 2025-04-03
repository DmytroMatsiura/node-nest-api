import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffe } from './entitties/cofee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffe[] = [
    {
      id: 1,
      name: 'Arabica',
      brand: 'Nestle',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((coffee) => coffee.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }
    return coffee;
  }

  create(coffee: Coffe) {
    this.coffees.push(coffee);
  }

  update(id: string, coffee: Coffe) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      Object.assign(existingCoffee, coffee);
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === +id);
    if (coffeeIndex > -1) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
