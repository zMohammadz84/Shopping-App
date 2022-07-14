function CheckInCart(product, { cart }) {
  return cart.find((p) => p._id === product._id);
}

export default CheckInCart;
