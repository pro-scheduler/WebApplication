const increment = () => {
    return {
        type: "INCREMENT"
    }
}

const decrement = () => {
    return {
        type: "DECREMENT"
    }
}

const actions = {increment, decrement}

export default actions;
