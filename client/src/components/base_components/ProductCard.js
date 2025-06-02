function DishCard(props) {
    return (
        <div class="dish_card">
            <div class="discount">
                <p>{props.discount}</p>
            </div>
            <img src={`/api/images/${props.image_path}`}/>
            <h3>{props.name}</h3>
            <p class="description">{props.description}</p>
            <p class={props.discount_end_date!=null?"bold":""}>{`Дата окончания: ${props.discount_end_date}`}</p>
            <div class="dish_card_bottom">
                <p class="bold">{Math.round(props.price * props.discount / 100)}</p>
                <button class="small">В корзину</button>
            </div>
        </div>
    );
}

export default DishCard;