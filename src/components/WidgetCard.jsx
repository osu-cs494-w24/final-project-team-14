import React from 'react';
import { useState } from 'react'
import { NavLink  } from 'react-router-dom';
 /** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useSelector, useDispatch } from 'react-redux'
import { selectWidget } from '../redux/widgetSlice'
import { selectItems} from '../redux/stocksSlice'
import { isWidget } from '../redux/widgetSlice'
import { addToCart } from '../redux/cartSlice'
import { removeFromCart } from '../redux/cartSlice'
import { updateInStock } from '../redux/stocksSlice'


const image_container = css`
    width: 130px; /* 이미지 컨테이너의 너비를 조정합니다. */
    height: 90px; /* 이미지 컨테이너의 높이를 조정합니다. */
    margin-right:15px;
    border-radius: 50%; /* 둥근 형태로 이미지 컨테이너를 만듭니다. */
    //border: 2px dashed fff//rgba(4, 170, 109, 0.45); /* 점선 테두리를 추가하고 색상의 투명도를 조절합니다. */
    overflow: hidden; /* 이미지 영역을 컨테이너로 감쌉니다. */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`

const image_style = css`
    width: 100%; /* 이미지의 너비를 100%로 설정합니다. */
    //margin-right: 20px;
    height: auto; /* 이미지의 높이를 자동으로 조정합니다. */
`
const card_style = css`
    padding: 20px;
    margin: 5px; /* 모든 카드 간격 추가 */
    border-radius: 10px;
    width: 260px;
    border: 1px solid #ddd; /* 테두리 스타일 */
    background-color: #fff; /* 배경색 */
    font-family: 'Gill Sans', sans-serif; /* 글꼴 변경 */
    box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.1); /* 그림자 효과 */
    font-size: 12px;
`
const font_p1 = css`
    font-size: 14px;
`

const font_p2 = css`
    font-size: 16px;
    text-align: right; /* 텍스트를 오른쪽으로 정렬합니다. */
`

const selected_unit = css`
    color: black;
    font-weight: bold;
`
const unselected_unit = css`
    color: #808080;
`

const remove_button = css`
    background-color: #04AA6D;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    margin-left: 5px;
    cursor: pointer;
    `

export default function CartCard(props) {
    const { id, quantity, photoUrl, price } = props
    const dispatch = useDispatch()
    const itemslist = useSelector(selectItems)

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id))
        dispatch(updateInStock({id, quantity}))
    } 

    return (
        <div css={card_style} style={{ display: "flex" }}>
            <div css={image_container}>
                <img
                    src={photoUrl}
                    alt="Item img"
                    css={image_style}
                />
            </div>
            <div css={font_p1}>
                <div css={{ marginRight: '7px', marginLeft: '5px' }}>
                    <p>ID: {id}</p>
                    <p css={{ fontWeight: 'bold' }}>Quantity: {quantity}</p>
                    <p>$ {quantity * price}</p>
                </div>
                <div>
                    <button css={remove_button} onClick={() => handleRemoveItem(id, quantity)}>Remove</button>
                </div>
            </div>
        </div>
    )
}
