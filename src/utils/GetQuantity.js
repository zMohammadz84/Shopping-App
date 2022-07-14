const getQuantity = (cart, product) => {
  if (cart.length) {
    const productWanted = cart.find((p) => p._id === product._id);
    return productWanted.quantity;
  }
};

export default getQuantity;
