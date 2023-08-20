// Agregar o quitar productos en el carrito Opc 1
const addOne = document.querySelector("#addOne");
const substractOne = document.querySelector("#substractOne");
const quantityOne = document.querySelector("#quantityOne");

addOne.addEventListener('click', () => quantityOne.value = Number(quantityOne.value) + 1);

substractOne.addEventListener('click', () => {
    const currentQuantityOne = Number(quantityOne.value); // Obtén el valor actual del input
    if (currentQuantityOne > 0) {
        quantityOne.value = currentQuantityOne - 1;
    } else {
        quantityOne.value = 0;
    }
});

// Agregar o quitar productos en el carrito Opc 2
const addTwo = document.querySelector("#addTwo");
const substractTwo = document.querySelector("#substractTwo");
const quantityTwo = document.querySelector("#quantityTwo");

addTwo.addEventListener('click', () => quantityTwo.value = Number(quantityTwo.value) + 1);

substractTwo.addEventListener('click', () => {
    const currentQuantityTwo = Number(quantityTwo.value); // Obtén el valor actual del input
    if (currentQuantityTwo > 0) {
        quantityTwo.value = currentQuantityTwo - 1;
    } else {
        quantityTwo.value = 0;
    }
});