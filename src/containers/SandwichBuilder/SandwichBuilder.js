import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux/Aux'
import Sandwich from '../../components/Sandwich/Sandwich'
import BuildControls from '../../components/Sandwich/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Sandwich/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions/actionTypes'
import * as sandwichBuilderActions from '../../store/actions'
import axios from '../../axios-orders'

class SandwichBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let sandwich = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ings) {
            sandwich = (
                <Aux>
                    <Sandwich ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {sandwich}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.sandwichBuilder.ingredients,
        price: state.sandwichBuilder.totalPrice,
        error: state.sandwichBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(sandwichBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(sandwichBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(sandwichBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SandwichBuilder, axios));