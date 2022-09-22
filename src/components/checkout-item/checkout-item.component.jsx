import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  RemoveButton,
  Quantity,
  Arrow,
  Value,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { removeItemFromCart, clearItemFromCart, addItemToCart } =
    useContext(CartContext);
  const { name, quantity, price, imageUrl } = cartItem;

  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);
  const clearItemHandler = () => clearItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
