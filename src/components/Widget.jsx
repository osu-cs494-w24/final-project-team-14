import React from 'react';
import { useState, useEffect } from 'react'
 /** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCart } from '../redux/cartSlice'
import { selectItems, updateAllInStock } from '../redux/stocksSlice'
import CartCard from './WidgetCard.jsx'
import { removeFromCart,removeAllFromCart } from '../redux/cartSlice'

export default function ShoppingCart() {
    const widgetCardStyle = css`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    `;

    const widgetButtonStyle = css`
        margin-right: 10px;
    `;

    const button = css`
        background-color: #04AA6D;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        margin-left: 5px;
        cursor: pointer;
    `

    const dispatch = useDispatch()
    const itemlist = useSelector(selectItems)
    const cartlist = useSelector(selectCart)
    const [ newlist, setNewList ] = useState([])

    const handleRemoveAll = () => {
        dispatch(removeAllFromCart(newlist))
        dispatch(updateAllInStock(newlist))
    }

    const handleBuyAll = () => {
        dispatch(removeAllFromCart(newlist))
    }

    useEffect(() => {
        let a = []
        for (const it of itemlist) {
            let c = 0
            for(const foundItem of cartlist){
                if (foundItem.id === it.id) {
                    // cartItem의 id가 itemlist에 없으면 count 증가
                    c = c + foundItem.quantity
                    
                }
            }
            if (c !== 0) {
                a.push({id: it.id, photoUrl: it.photoUrl, quantity: c, price: it.price})    
            }
        }
        setNewList(a)
    }, [cartlist])
    
    return (
        <div css={widgetCardStyle}>
            {newlist.map(item => (
            <div key={item.id}>
                <CartCard
                    id={item.id}
                    quantity={item.quantity} // 이 부분에서 아이템의 수량이 아닌 아이템의 아이디를 전달하고 있습니다. 올바른 속성을 전달해야 합니다.
                    photoUrl={item.photoUrl}
                    price={item.price}
                />
            </div>
            ))}
        <button onClick={handleRemoveAll} css={button}>REMOVE ALL</button>
        <button onClick={handleBuyAll} css={button}>PROCEED TO CHECKOUT</button>

        </div>
    );

}
