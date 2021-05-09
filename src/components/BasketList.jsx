import {BasketItem} from './BasketItem';

function BasketList(props) {
  const {  
        order = [] ,
        handleBasketShow = Function.prototype,
        removeFromBasket=Function.prototype,
        decQuantity,
        incQuantity
       } = props;
  const totalPrice = order.reduce((sum, el) => {
      return sum + el.price * el.quantity
  }, 0)
  return (
    <ul className='collection basket-list'>
    <li className='collection-item active'>Корзина</li>
    {order.length ? (
        order.map((item) => (
            <BasketItem
                key={item.id}
                removeFromBasket={removeFromBasket}
                decQuantity={decQuantity}
                incQuantity={incQuantity}
                {...item}
            />
        ))
    ) : (
        <li className='collection-item'>Корзина пуста</li>
    )}
    <li className='collection-item active'>
        Общая стоимость: {totalPrice} руб.
    </li>
  
    <i
        className='material-icons basket-close'
        onClick={handleBasketShow}
    >
        close
    </i>
    <li className='collection-item'>
        <button className="waves-effect waves-light btn">Оформить</button>
    </li>
</ul>
  );
}
export {BasketList};


