

import useCart from "@/hooks/useLocalStorage";
import Image from "next/image";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export interface StateProps {
    productData: [];
    favoriteData: [];
    userInfo: null | string;
    next: any;
}

export interface StoreProduct {
    brand: string;
    category: string;
    description: string;
    image: string;
    isNew: boolean;
    oldPrice: number;
    price: number;
    title: string;
    _id: number;
    quantity: number;
  }
  

export const Cart = () => {

    // @ts-ignore
    const {cart, addToCart, removeFromCart, getTotalPrice, getTotalLength, clearCart, incrementQuantity, decrementQuantity} = useCart();
    
      const [totalAmount, setTotalAmount] = useState(0);
      
      // Striep payment
      const stripePromise = loadStripe(
        "pk_live_51NbgKjA93WpJJpaKCKiFwJ1bJqq7PJbO4q2x1WUHEMLbIb4jzqqeEHWBIU0bRq31d8LHxJWmeUnIb2Gi1wa0NSxs00Cg4bNBjj"
      );
    
      const handleCheckout = async () => {
        const stripe = await stripePromise;
    
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart }),
        });
        const checkoutSession = await response.json();
    
        // Redirecting user/customer to Stripe Checkout
        const result: any = await stripe?.redirectToCheckout({
          sessionId: checkoutSession.id,
        });
        if (result.error) {
          alert(result?.error.message);
        }
      };

    return(
        <section className="cart">
            {cart.length == 0 ?
                
                <h3 className="cart-empty">The basket is empty</h3>

                :

                cart.map((cartItem => 
                    <figure key={cartItem._id} className="cart-item">
                        <img src={cartItem.images[0]} alt="" style={{width: "150px", height: "150px"}} />
                        <figcaption className="cart-item__info">
                            <h3 className="cart-item__info-name">{cartItem.name}</h3>
                            <div className="cart-item__quantity">
                                <button onClick={() => decrementQuantity(cartItem._id)}>-</button>
                                <p>x {cartItem.quantity}</p>
                                <button onClick={() => incrementQuantity(cartItem._id)}>+</button>
                            </div>
                            <p className="cart-item__info-category">{cartItem.category}</p>
                            <span className="cart-item__info-price">$ {cartItem.price}</span>
                            <button onClick={() => removeFromCart(cartItem._id)} className="cart-item__info-close">&times;</button>
                        </figcaption>
                    </figure>
                ))
            }
            <h3 className="cart-total">Total price: <span style={{color: "red"}}>$ {getTotalPrice().toFixed(2)}</span></h3>
            <div className="cart__buttons">
                <button className="cart-reset" onClick={clearCart}>
                    Clear the basket
                </button>
                <span>or</span>
                {cart.length == 0 ? 
                
                <button className="cart-reset" onClick={() => alert('shopping cart is empty')}>
                    Check out
                </button>

                : 
                
                <button className="cart-reset" onClick={handleCheckout}>
                    Check out
                </button>

                }
            </div>
        </section>
    )
}