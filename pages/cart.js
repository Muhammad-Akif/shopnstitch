
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext';
// import Link from 'next/link'
import { useRouter } from 'next/router'

const cart = () => {
    const router = useRouter()
    const [promoCode, setPromoCode] = useState('')
    const [validCode, setValidCode] = useState('')
    const { totalPrice, totalQuantities, cartItems, toggleCartItemQuanitity,auth, onRemove } = useStateContext();

    const handleCheckout = () => {
       if(auth) router.push("/customer")
       else router.push("/login")
    }


    return (
        <div class="container mx-auto mt-10">
            <div class="flex shadow-md my-10">
                <div class="w-3/4 bg-white px-10 py-10">
                    <div class="flex justify-between border-b pb-8">
                        <h1 class="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 class="font-semibold text-2xl">{totalQuantities} Items</h2>
                    </div>
                    <div class="flex mt-10 mb-5">
                        <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Quantity</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Price</h3>
                        <h3 class="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                    </div>

                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <>
                            <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                <div class="flex w-2/5">
                                    <div class="w-20">
                                        <img class="h-24" src={item.image.url} alt="" />
                                    </div>
                                    <div class="flex flex-col justify-between ml-4 flex-grow">
                                        <span class="font-bold text-sm">{item.name}</span>
                                        <span class="text-red-500 text-xs">{item.category.name}</span>
                                        <button
                                            class="font-semibold self-start text-red-500 text-xs"
                                            onClick={() => onRemove(item)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="quantity">
                                    <p className="quantity-desc flex items-center h-10">
                                        <span className="minus" onClick={() => toggleCartItemQuanitity(item.id, 'dec')}>
                                            <AiOutlineMinus />
                                        </span>
                                        <span className="num" onClick="">{item.quantity}</span>
                                        <span className="plus" onClick={() => toggleCartItemQuanitity(item.id, 'inc')}>
                                            <AiOutlinePlus />
                                        </span>
                                    </p>
                                </div>

                                <span class="text-center w-1/5 font-semibold text-sm">Rs {item.price}</span>
                                <span class="text-center w-1/5 font-semibold text-sm">Rs {item.price * totalQuantities}</span>
                            </div>
                        </>
                    ))}


                    <button onClick={() => router.push('/')} class="flex font-semibold text-indigo-600 text-sm mt-10">
                        <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                        Continue Shopping
                    </button>
                </div>

                <div id="summary" class="w-1/4 px-8 py-10">
                    <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <div class="flex justify-between mt-10 mb-5">
                        <span class="font-semibold text-sm uppercase">Items {totalQuantities}</span>
                        <span class="font-semibold text-sm">{totalQuantities.length > 0 || (<span>Rs: {totalPrice}</span>)}</span>
                    </div>
                    <div class="py-10">
                        <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                        <input type="text" id="promo" placeholder="Enter your code" onChange={(e) => setPromoCode(e.target.value)} class="p-2 text-sm w-full border border-gray-200" />
                    </div>
                    <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase" onClick={() => setValidCode(promoCode)}>Apply</button>
                    {cartItems.length >= 1 && (

                        <div class="border-t mt-8">
                            <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost</span>
                                {
                                    validCode == "bonus2022" ? <span> Rs: {parseInt(totalPrice - totalPrice / 4)}</span> :
                                        validCode == "sale2022" ? <span> Rs: {parseInt(totalPrice - totalPrice / 8)}</span> :
                                            <span>Rs: {totalPrice}</span>}
                            </div>
                            <button onClick={handleCheckout} class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default cart


