function OutletInfo(props) {
    return (
        <div>
            <h3>{`${props.town} (${props.distinct})`}</h3>
            <div>
                <img src={`/api/images/AddressIcon.svg`}/>
                <p>{props.address}</p>
            </div>
        </div>
    )
}

export default OutletInfo;