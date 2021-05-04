import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import { Cart } from "./Cart";
import {BasketList} from './BasketList';

export function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);

  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);/* ищем индекс если есть вернет индекс если нет то -1 */

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };/* если не был добавлен */
      setOrder([...order, newItem]);
    } else {
        const newOrder = order.map((orderItem, index) => {
            if(index === itemIndex) {
                return {
                    ...orderItem,
                    quantity: orderItem.quantity + 1
                }/* если не был добавлен  */
            }else{
                return orderItem;
            }/* проверка был ли добавлен */
        })
        setOrder(newOrder)
    }
  };/* функция получила обьект с айди названием и ценой,*/

  const handleBasketShow = () => {
      setBasketShow(!isBasketShow)
  }/* показ корзины */

  useEffect(function getGoods() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.featured && setGoods(data.featured);
        setLoading(false);
      });
  }, []); /* вывод товаров на экран */


const removeFromBasket = (itemId) => {
  const newOrder = order.filter(el => el.id !== itemId)
  setOrder(newOrder);/* удаление товара из корзины */
}
  return (
    <main className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? (<Preloader /> ): (
          <GoodsList goods={goods}
          addToBasket={addToBasket}
       />)}

       {
         isBasketShow && <BasketList 
         order={order} /* берем из setOrder */ 
         removeFromBasket={removeFromBasket}
         handleBasketShow={handleBasketShow}/>
       }
    </main>
  );
}
