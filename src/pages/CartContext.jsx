import { createContext, useContext } from "react";

const CartContext = createContext();

const Cart = () => {
    const {cart} = useContext(CartContext);
    const {cartQuantities} = useContext(CartContext);
    const {setCartQuantities} = useContext(CartContext);
    const {setCart} = useContext(CartContext);

    const handleDecrease = (id) => {
        setCartQuantities(prev => ({...prev, [id] : Math.max(1, prev[id] - 1)}));
    }

    const handleIncrease = (id) => {
        setCartQuantities(prev => ({...prev, [id] : Math.max(1, prev[id] + 1)}));
    }

    const handleRemove= (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
        setCartQuantities(prev => {
            const updated = {...prev};
            delete updated[id];
            return updated;
        })
    }
    return(
        <div className="cart-display">
            {
                cart.length === 0 &&
                <h1>Your Cart is empty!!!</h1>
            }
            {cart.length > 0 &&
                cart.map((item, index) => (
                    <div className="cart-item" key={index}>
                       <img src={item.image} alt={item.title} />
                        <h1>{item.title}</h1>
                        <h2>$ {item.price}</h2>
                        <div className="quantity">
                            <button className="decrease" onClick={() => handleDecrease(item.id)}>-</button>
                            <input
                                type="number"
                                value={cartQuantities[item.id]}
                                readOnly
                            />
                            <button className="increase" onClick={() => handleIncrease(item.id)}>+</button>
                        </div>
                            <button className="remove" onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                ))
            }
        </div>
    );
}

export{ Cart, CartContext };