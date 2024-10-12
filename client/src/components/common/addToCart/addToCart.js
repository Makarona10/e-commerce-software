export const updateCart = () => {
    // Retrieve cart from localStorage or return an empty array if not present or if the data is malformed
    const cart = localStorage.getItem('cartList');
    try {
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Failed to parse cart data:', error);
        return [];
    }
};

export const addToCart = (obj) => {
    let cart = updateCart();

    if (obj.pieces_left === 0) return;

    let existingItem = cart.find(item => item.id === obj.id);

    if (existingItem) {
        if (existingItem.quantity < obj.pieces_left) {
            existingItem.quantity += 1;
        }
    } else {

        obj.quantity = 1;
        cart.push(obj);
    }

    localStorage.setItem('cartList', JSON.stringify(cart));
};

export const removeFromCart = (obj) => {
    let cart = updateCart();

    let itemIndex = cart.findIndex(item => item.id === obj.id);
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('cartList', JSON.stringify(cart));
};
