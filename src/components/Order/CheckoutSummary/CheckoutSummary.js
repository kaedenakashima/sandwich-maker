import React from 'react'
import Sandwich from '../../Sandwich/Sandwich'
import Button from '../../UI/Button/Button'
import './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes well<span role="img" aria-label="smile face">😁</span></h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Sandwich ingredients={props.ingredients} />
            </div>
            <Button
                btnType='Danger'
                clicked={props.checkoutCancelled}
            >CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.checkoutContinued}
            >CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary