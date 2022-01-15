const products = [
    { id: 1, name: 'PlayStation 5', price: 499 },
    { id: 2, name: 'Xbox One X', price: 399 },
    { id: 3, name: 'Nintendo Switch', price: 299 },
    { id: 4, name: 'Game Boy', price: 99 },
    { id: 5, name: 'Mega Drive', price: 29 },
];

export const getProducts = (filter = '') => products.filter(product => product.name.toLowerCase().includes(filter.toLowerCase()));
export const getProductById = (id) => products.find(product => product.id === id);