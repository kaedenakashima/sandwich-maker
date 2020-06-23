import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Aux from '../../hoc/Aux/Aux'
import Sandwich from '../../components/Sandwich/Sandwich'
import BuildControls from '../../components/Sandwich/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Sandwich/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
// import * as actionTypes from '../../store/actions/actionTypes'
import * as actions from '../../store/actions'
import axios from '../../axios-orders'

const SandwichBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => {
        return state.sandwichBuilder.ingredients;
    });
    const price = useSelector(state => state.sandwichBuilder.totalPrice);
    const error = useSelector(state => state.sandwichBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = ingName => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout')
    }

    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let sandwich = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (ings) {
        sandwich = (
            <Aux>
                <Sandwich ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}
                    price={price}
                />
            </Aux>
        );
        orderSummary = <OrderSummary
            ingredients={ings}
            price={price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />
    }
    return (
        <Aux>
            <Modal
                show={purchasing}
                modalClosed={purchaseCancelHandler}
            >
                {orderSummary}
            </Modal>
            {sandwich}
        </Aux>
    )
}

export default withErrorHandler(SandwichBuilder, axios);