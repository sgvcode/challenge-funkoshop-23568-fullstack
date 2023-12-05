const ItemModel = require('../models/itemModel');

const getAllItems = async () => {
    return await ItemModel.getAll();
}

const getOne = async (id) => {
    return await ItemModel.getOne({ product_id: id });
}

const getLicences = async (licence_id) => {
    return await ItemModel.getLicences(licence_id);
}

const getItem = async (id) => {
    return await ItemModel.getItem({ product_id: id });
}

const createItem = async (item, files) => {
    const itemSchema = {
        product_name: item.name,
        product_description: item.description,
        price: item.price,
        stock: item.stock,
        discount: item.discount,
        sku: item.sku,
        dues: item.dues,
        image_front: '/' + files[0].filename,
        image_back: '/' + files[1].filename,
        licence_id: item.collection,
        category_id: item.category
    }
    return await ItemModel.createItem([Object.values(itemSchema)]);
}

const editItem = async (item, files, id) => {
    const itemSchema = {
        product_name: item.name,
        product_description: item.description,
        price: item.price,
        stock: item.stock,
        discount: item.discount,
        sku: item.sku,
        dues: item.dues,
        licence_id: item.collection,
        category_id: item.category
    };
    if (files && files[0] && files[1]) {
        // Verifica si existen archivos y están definidos antes de asignar las imágenes
        itemSchema.image_front = '/' + files[0].filename;
        itemSchema.image_back = '/' + files[1].filename;
    }

    return await ItemModel.editItem(itemSchema, { product_id: id });
}

const deleteItem = async (id) => {
    return await ItemModel.deleteItem({ product_id: id });
}

// Paginación de productos
const getPaginated = async (page, limit) => {
    try {
        const totalItemsResponse = await ItemModel.getTotalItems();
        const totalItems = totalItemsResponse.data;

        const totalPages = Math.ceil(totalItems / limit);

        const offset = (page - 1) * limit;
        const response = await ItemModel.getPaginated(offset, limit);

        return {
            isError: false,
            data: response.data,
            totalPages
        };
    } catch (error) {
        console.error('Error en getPaginated:', error);
        return {
            isError: true,
            message: 'Error al obtener datos paginados.'
        };
    }
};

const getTotalItems = async () => {
    try {
        const totalItems = await ItemModel.getTotalItems();
        return totalItems;
    } catch (error) {
        console.error(`Error al obtener el total de elementos: ${error}`);
        throw error;
    }
};

module.exports = {
    getAllItems,
    getOne,
    getItem,
    createItem,
    editItem,
    deleteItem,
    getLicences,
    getPaginated,
    getTotalItems
}