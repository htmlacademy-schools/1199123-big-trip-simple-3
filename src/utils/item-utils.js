export const getItemById = (items, id) => (items.find((item) => item.id === id));

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const capitalizeType = (type) => type.charAt(0).toUpperCase() + type.slice(1);
