function GoodsItem(props) {
  const { id, name, description, price, full_background } = props;
 
  return (
    <div className="card hoverable" id={id}>
      <div className="card-image">
        <img src={full_background} alt={name} />
      </div>
      <h6 className="card-title center-align">{name}</h6>
      <div className="card-content center-align blue-text text-grey">
        <p style={{fontSize: '1.1rem'}}>
         {description}
        </p>
        <div className="card-action">
          <button className="btn amber accent-4">Купить</button>
          <span className="right purple-text text-darken-2" style={{fontSize: '1.8rem'}}>{price} руб.</span>
        </div>
      </div>
    </div>
  );
}
export {GoodsItem};