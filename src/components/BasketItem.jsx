function BasketItem(props) {
    const {
        id,
        name,
        price,
        quantity,
        removeFromBasket = Function.prototype,
        decQuantity,
        incQuantity
    } = props;


    return  <li className="collection-item">
        {name} <i onClick={()=> decQuantity(id)} className="material-icons basket-quantity">remove</i>x {quantity} <i onClick={()=> incQuantity(id)} className="material-icons basket-quantity">add</i> = {price}
        <span className="secondary-content" onClick={()=> removeFromBasket(id)}>
        <i className="material-icons basket-delete">clear</i></span>
  </li>
}

export {BasketItem};