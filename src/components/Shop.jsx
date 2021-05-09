import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import { Cart } from "./Cart";
import {BasketList} from './BasketList';
import {Alert} from './Alert';

export function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('');/* алерт что добавили в корзину */

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
    setAlertName(item.name)/* алерт */
  };/* функция получила обьект с айди названием и ценой,*/

  const handleBasketShow = () => {
      setBasketShow(!isBasketShow)
  }/* показ корзины */

  const incQuantity = (itemId) => {
      const newOrder = order.map(el => {
        if(el.id === itemId) {
          const newQuantity = el.quantity + 1;
          return {
            ...el,
            quantity: newQuantity
          }
        }else{
          return el;
        }
      });
      setOrder(newOrder)
  }/* увеличение товара в корзине */
  const decQuantity = (itemId) => {
    const newOrder = order.map(el => {
      if(el.id === itemId) {
        const newQuantity = el.quantity - 1;
        return {
          ...el,
          quantity: newQuantity >=0 ? newQuantity : 0,
        }
      }else{
        return el;
      }
    });
    setOrder(newOrder)
  }/* уменьшение товара в корзине */

  const closeAlert = () => {
    setAlertName('')
  }

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
         handleBasketShow={handleBasketShow}
         incQuantity={incQuantity}
         decQuantity={decQuantity}/>
       }
       {
         alertName && <Alert name={alertName} closeAlert={closeAlert}/>
       }
    </main>
  );
}
