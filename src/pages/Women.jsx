import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const Women = () => {
    const [womenclothing, setWomenClothing] =  useState([]);
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(true);
    const {addToCart} = useContext(CartContext);
    useEffect(() => {
         async function fetchDetails() {
            const response = await fetch("https://fakestoreapi.com/products/category/women's%20clothing");
            const data = await response.json();
            setWomenClothing(data);
            const initial = {}

            data.forEach(item => {
                initial[item.id] = 1;
            });
            setQuantities(initial);
            setLoading(false);
        }
        fetchDetails();
    }, []);

    const handleDecrease = (id) => {
        setQuantities(prev => ({...prev, [id]: Math.max(1, prev[id] - 1)}));
    }
    const handleIncrease = (id) => {
        setQuantities(prev => ({...prev, [id]: Math.max(1, prev[id] + 1)}));
    }

    if(loading){
        return( 
        <div className="clothing-display">
        <p>Loading...</p>
        </div>)
    }

    return (
        <div className="clothing-display">
            {
                womenclothing.map((item, index) => (
                    <div className="item" key={index}>
                        <img src={item.image} alt={item.title} />
                        <h1>{item.title}</h1>
                        <h2>$ {item.price}</h2>
                         <div className="quantity">
                            <button className="decrease" onClick={() => handleDecrease(item.id)}>-</button>
                            <input
                                type="number"
                                value={quantities[item.id]}
                                readOnly
                            />
                            <button className="increase" onClick={() => handleIncrease(item.id)}>+</button>
                        </div>
                        <button onClick={() => addToCart(item, quantities[item.id])}>Add to cart</button>
                    </div>
                ))
            }
        </div>
    )
}

export {Women};