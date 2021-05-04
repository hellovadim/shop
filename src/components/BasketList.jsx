import {BasketItem} from './BasketItem';

function BasketList(props) {
  const { order = [] , handleBasketShow = Function.prototype} = props;
  const totalPrice = order.reduce((sum, el) => {
      return sum + el.price * el.quantity
  }, 0)
  return (
    <ul className="collection basket-list">
      <li className="collection-item active">
        Корзина <i className="material-icons basket-close" onClick={handleBasketShow}>clear</i>
      </li>
     {
          order.lenght === 0 ?  <li className='collection-item'>Корзина пуста</li> : order.map(item => (
            <BasketItem key={item.id} {...item}/>
        ))
     }
      <li className="collection-item active">
        Общая стоимость: {totalPrice} руб.
      </li>
    </ul>
  );
}
export {BasketList};