import { useEffect} from 'react';


function Alert(props) {
    const {name = '', closeAlert = Function.prototype } = props;
    
    useEffect(() => {
        const timerId = setTimeout(closeAlert, 3000)

        return () => {
            clearTimeout(timerId)
        }
         // eslint-disable-next-line
    }, [name])/* для того чтобы исчез алерт */

    return <div id="toast-container">
            <div className="toast">{name} добавлен в корзину</div>
    </div>
}
export {Alert}