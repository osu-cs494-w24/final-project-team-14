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
    width: 130px; /* 이미지 컨테이너의 너비를 조정합니다. */
    height: 90px; /* 이미지 컨테이너의 높이를 조정합니다. */
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
    height: auto; /* 이미지의 높이를 자동으로 조정합니다. */
`
const card_style = css`
    padding: 20px;
    margin: 10px; /* 모든 카드 간격 추가 */
    border-radius: 10px;
    width: 415px;
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
        /* placeholder의 글꼴을 변경합니다. */
        font-family: 'Your Font', sans-serif; /* 여기에 사용할 글꼴을 지정하세요 */
    }
`

export default function ItemCard(props) {
    const { id, name, price, inStock, photoUrl } = props
    const [quantity, setQuantity] = useState(0)
    const [ Widge, setWidget ] = useState(false)
    const dispatch = useDispatch()
    const itemslist = useSelector(selectItems)

    function showAlert(message) {
        alert(message); // 브라우저의 내장된 alert 함수를 사용하여 알람을 띄웁니다.
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
            return; //  에러가 발생하면 함수를 여기서 종료합니다.
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
                    {/* 폼을 사용하여 수량 입력 */}
                    <form onSubmit={(e) => handleSubmit(e, id)}>
                        <input
                            type="number"
                            value={quantity.toString()} // 숫자를 문자열로 변환하여 전달
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            css={input_field}
                        />
                        {/* 수량이 0이면 제출되지 않도록 버튼을 비활성화 */}
                        <button css={add_button} type="submit" disabled={quantity === 0 || isNaN(quantity)}>Add to Cart</button>
                    </form>
                </div>
            </div>
        </div>
    )
}