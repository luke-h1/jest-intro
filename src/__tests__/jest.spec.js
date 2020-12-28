import { specialChars } from '@testing-library/user-event';
import pizzas from '../data';

test('the pizza data is correct', () => {
  expect(pizzas).toMatchSnapshot();
  expect(pizzas).toHaveLength(4);
  expect(pizzas.map((pizza) => pizza.name)).toEqual([
    'Chicago Pizza',
    'Neapolitan Pizza',
    'New York Pizza',
    'Sicilian Pizza',
  ]);
});

for (let i = 0; i < pizzas.length; i += 1) {
  test(`Pizza[${i}] should have properties (id, name, image, desc, price)`, () => {
    expect(pizzas[i]).toHaveProperty('id');
    expect(pizzas[i]).toHaveProperty('name');
    expect(pizzas[i]).toHaveProperty('image');
    expect(pizzas[i]).toHaveProperty('desc');
    expect(pizzas[i]).toHaveProperty('price');
  });
}

test('mock implementation of a basic function', () => {
  const mock = jest.fn(() => 'I am a mock function');
  expect(mock('calling my mock function')).toBe('I am a mock function');
  expect(mock).toHaveBeenCalledWith('calling my mock function');
});

test('mock return value of a function one time', () => {
  const mock = jest.fn();
  mock.mockReturnValueOnce('hello').mockReturnValueOnce('there');

  mock();
  mock();
  expect(mock).toHaveBeenCalledTimes(2);
  mock('hello', 'there', 'Luke');
  expect(mock).toHaveBeenCalledWith('hello', 'there', 'Luke');

  mock('Luke');
  expect(mock).toHaveBeenLastCalledWith('Luke');
});

test('mock implementation of a function', () => {
  const mock = jest.fn().mockImplementation(() => 'United Kingdom');
  expect(mock('location')).toBe('United Kingdom');
  expect(mock).toHaveBeenCalledWith('location');
});

test('spying using original implementation', () => {
  const pizza = {
    name: (n) => `Pizza name: ${n}`,
  };
  const spy = jest.spyOn(pizza, 'name');
  expect(pizza.name('Cheese')).toBe('Pizza name: Cheese');
  expect(spy).toHaveBeenCalledWith('Cheese');
});

test('spying using mock implementation', () => {
  const pizza = {
    name: (n) => `Pizza name: ${n}`,
  };
  const spy = jest.spyOn(pizza, 'name');
  spy.mockImplementation((n) => `Crazy pizza`);
  expect(pizza.name('Cheese')).toBe('Crazy pizza');
  spy.mockRestore();
  expect(pizza.name('Cheese')).toBe('Pizza name: Cheese');
});

test('pizza returns new york last', () => {
  const pizza1 = pizzas[0];
  const pizza2 = pizzas[1];
  const pizza3 = pizzas[2];
  const pizza = jest.fn((currentPizza) => currentPizza.name);
  pizza(pizza1); // chicago pizza
  pizza(pizza2); // neo pizza
  pizza(pizza3); // NYC pizza
  expect(pizza).toHaveLastReturnedWith('New York Pizza');
});

test('pizza data has new york pizza & matches as an object', () => {
  const newYorkPizza = {
    id: 3,
    name: 'New York Pizza',
    image: '/images/ny-pizza.jpg',
    desc:
      'New York-style pizza has slices that are large and wide with a thin crust that is foldable yet crispy. It is traditionally topped with tomato sauce and mozzarella cheese.',
    price: 8,
  };
  expect(pizzas[2]).toMatchObject(newYorkPizza);
});

test('expect a promise to resolve', async () => {
  const user = {
    getFullName: jest.fn(() => Promise.resolve('Luke Howsam')),
  };
  await expect(user.getFullName('Luke Howsam')).resolves.toBe('Luke Howsam');
});

test('expect a promise to reject', async () => {
  const user = {
    getFullName: jest.fn(() =>
      Promise.reject(new Error('something went wrong'))
    ),
  };
  await expect(user.getFullName('Luke Howsam')).rejects.toThrow(
    'something went wrong'
  );
});
