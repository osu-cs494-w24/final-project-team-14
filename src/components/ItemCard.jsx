import React from 'react';
import { useState } from 'react'
import { NavLink  } from 'react-router-dom';
 /** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useSelector, useDispatch } from 'react-redux'
import { selectWidget } from '../redux/widgetSlice'
import { selectItems } from '../redux/stocksSlice'
import { isWidget } from '../redux/widgetSlice'
import { addToCart } from '../redux/cartSlice'
import { updateQuantity } from '../redux/stocksSlice'

const image_container = css`
    width: 130px; 
    height: 90px;
    border-radius: 50%;
    //border: 2px dashed fff//rgba(4, 170, 109, 0.45); 
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`

const image_style = css`
    width: 100%; 
    height: auto;
`
const card_style = css`
    padding: 20px;
    margin: 10px;
    border-radius: 10px;
    width: 415px;
    border: 1px solid #ddd;
    background-color: #fff; 
    font-family: 'Gill Sans', sans-serif; 
    box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.1);
    font-size: 12px;
`
const font_p1 = css`
    font-size: 14px;
`

const font_p2 = css`
    font-size: 16px;
    text-align: right;
`

const selected_unit = css`
    color: black;
    font-weight: bold;
`
const unselected_unit = css`
    color: #808080;
`
const add_button = css`
    background-color: #04AA6D;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    margin-left: 5px;
    cursor: pointer;
`

const input_field = css`
    width: 20%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;

    &::placeholder {
        font-family: 'Your Font', sans-serif;
    }
`

export default function ItemCard(props) {
    const { id, name, price, inStock, photoUrl } = props
    const [quantity, setQuantity] = useState(0)
    const [ Widge, setWidget ] = useState(false)
    const dispatch = useDispatch()
    const itemslist = useSelector(selectItems)

    function showAlert(message) {
        alert(message);
    }

    

    const handleSubmit = (e, id) => {
        e.preventDefault()
        const founditem = itemslist.find(item => item.id === id)
        //console.log("== foundItem: ", founditem)
        if (founditem.inStock === 0) {
            showAlert("Out of Stock!")
            return
        }

        if (quantity > founditem.inStock) {
            showAlert("Too much!");
            return;
        }
        // 장바구니에 추가하는 로직

        dispatch(addToCart({quantity, id, photoUrl}))
        dispatch(updateQuantity({item: founditem, quantity: quantity}))
    }
    
    return (
        <div css={card_style} style={{ display: "flex" }}>
            <div css={{ marginRight: '7px', marginLeft: '5px' }}>
                ID: {id}
                <div css={image_container}>
                    <img
                        src={photoUrl}
                        alt="Item img"
                        css={image_style}
                    />
                </div>
            </div>
            <div css={{ marginLeft: '7px', width: '300px' }}>
                <div css={font_p2}>
                    <p>{name}</p>
                    <p>$ {price}</p>
                    {inStock === 0 ? (
                        <p>Out of Stock</p>
                    ) : (
                        <p css={{fontWeight: "bold"}}>In-Stock {inStock}</p>
                    )}
                    <form onSubmit={(e) => handleSubmit(e, id)}>
                        <input
                            type="number"
                            value={quantity.toString()}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            css={input_field}
                        />
                        <button css={add_button} type="submit" disabled={quantity === 0 || isNaN(quantity)}>Add to Cart</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
