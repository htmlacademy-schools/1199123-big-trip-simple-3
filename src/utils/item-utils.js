export const getItemById = (items, id) => (items.find((item) => item.id === id));

export const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];

export const getRandomPrice = () => Math.floor(Math.random() * 1000) + 100;

export const getRandomSliceFromItems = (items) => {
  const n = Math.floor(Math.random() * (items.length + 1));
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export const createIDgenerator = () => {
  let id = 1;
  return () => ++id;
};

export const getRandomPictureId = () => Math.floor(Math.random() * 5) + 1;

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const capitalizeType = (type) => type.charAt(0).toUpperCase() + type.slice(1);
