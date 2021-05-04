function Cart(props) {
  const { quantity = 0 } = props;
  return (
    <div className="cart brown darken-1 white-text">
      <i className="material-icons">shopping_cart</i>
      {quantity ? <span className="cart-quantity">{quantity}</span>: null}
    </div>
  );
}

export { Cart };
