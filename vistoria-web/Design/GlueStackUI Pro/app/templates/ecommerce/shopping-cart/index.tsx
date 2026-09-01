import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Trash2
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { INITIAL_CART_ITEMS, SHIPPING_COST, TAX_RATE } from "./data";
import { CartItem, OrderSummary } from "./types";

// Utility Functions
const calculateOrderSummary = (items: CartItem[]): OrderSummary => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = items.length > 0 ? SHIPPING_COST : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  return { subtotal, shipping, tax, total };
};

const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

// Components
interface HeaderProps {
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBack }) => (
  <HStack
    space="md"
    className="items-center justify-between bg-background-0 px-4 py-4"
  >
    <HStack space="sm" className="items-center">
      <Heading size="xl" className="text-typography-950">
        Shopping Cart
      </Heading>
    </HStack>
    <Icon as={ShoppingBag} size="xl" className="text-typography-500" />
  </HStack>
);

const EmptyCart: React.FC = () => (
  <Box className="flex-1 items-center justify-center py-20">
    <VStack space="sm" className="items-center">
      <Heading size="lg" className="text-typography-900">
        Your cart is empty
      </Heading>
      <Text size="md" className="text-typography-600">
        Add some items to your cart
      </Text>
    </VStack>
  </Box>
);

interface QuantityControlsProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityControls: React.FC<QuantityControlsProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => (
  <HStack space="sm" className="items-center">
    <Button
      size="xs"
      variant="outline"
      action="secondary"
      onPress={onDecrease}
      className="w-8 h-8 rounded-full"
    >
      <ButtonIcon as={Minus} />
    </Button>

    <Text size="md" className="w-8 text-center font-medium text-typography-900">
      {quantity}
    </Text>

    <Button
      size="xs"
      variant="solid"
      action="primary"
      onPress={onIncrease}
      className="w-8 h-8 rounded-full"
    >
      <ButtonIcon as={Plus} />
    </Button>
  </HStack>
);

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onQuantityChange,
  onRemove,
  onToggleFavorite,
}) => (
  <HStack space="lg" className="items-center bg-background-50 p-4 rounded-xl">
    {/* Product Image */}
    <Box className="w-24 h-24 rounded-xl overflow-hidden bg-background-100">
      <Image
        source={{ uri: item.image }}
        className="w-full h-full"
        alt={item.name}
      />
    </Box>

    {/* Product Details */}
    <VStack space="sm" className="flex-1">
      <HStack space="md" className="justify-between items-start">
        <VStack space="xs" className="flex-1">
          <Heading size="md" className="text-typography-900">
            {item.name}
          </Heading>
          <Text size="sm" className="text-typography-600">
            {item.color} • {item.size}
          </Text>
        </VStack>

        <Button
          className="p-0 bg-transparent data-[active=true]:bg-transparent data-[hover=true]:bg-transparent"
          onPress={() => onToggleFavorite(item.id)}
        >
          <ButtonIcon
            as={Heart}
            className={
              item.isFavorite
                ? "text-error-500"
                : "text-error-500 fill-error-500"
            }
          />
        </Button>
      </HStack>

      <HStack space="md" className="justify-between items-center">
        {/* Quantity Controls */}
        <HStack space="xs" className="items-center">
          <Button
          size="xs"
            variant="outline"
            action="secondary"
            onPress={() => onQuantityChange(item.id, item.quantity - 1)}
            className="rounded-full"
          >
            <ButtonText className="text-typography-900 text-lg">-</ButtonText>
          </Button>

          <Text
            size="md"
            className="font-medium text-typography-900 min-w-4 text-center"
          >
            {item.quantity}
          </Text>

          <Button
            size="xs"
            variant="outline"
            action="secondary"
            onPress={() => onQuantityChange(item.id, item.quantity + 1)}
            className="rounded-full"
          >
            <ButtonText className="text-typography-900 text-lg">+</ButtonText>
          </Button>
        </HStack>

        {/* Price and Remove */}
        <HStack space="md" className="items-center justify-center">
          <Text size="md" className="font-medium text-typography-900">
            ${(item.price * item.quantity).toFixed(2)}
          </Text>

          <Button
            size="sm"
            onPress={() => onRemove(item.id)}
            className="bg-transparent"
          >
            <ButtonIcon className="text-typography-950" as={Trash2} />
          </Button>
        </HStack>
      </HStack>
    </VStack>
  </HStack>
);

interface CartItemsListProps {
  items: CartItem[];
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  items,
  onQuantityChange,
  onRemove,
  onToggleFavorite,
}) => (
  <VStack space="xl">
    {items.map((item) => (
      <CartItemCard
        key={item.id}
        item={item}
        onQuantityChange={onQuantityChange}
        onRemove={onRemove}
        onToggleFavorite={onToggleFavorite}
      />
    ))}
  </VStack>
);

interface OrderSummaryCardProps {
  summary: OrderSummary;
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ summary }) => (
  <Card size="lg" variant="outline" className="bg-background-0">
    <VStack space="md">
      <Heading size="lg" className="text-typography-900">
        Order Summary
      </Heading>

      <VStack space="sm">
        <HStack space="md" className="justify-between">
          <Text size="md" className="text-typography-700">
            Subtotal
          </Text>
          <Text size="md" className="font-medium text-typography-900">
            {formatPrice(summary.subtotal)}
          </Text>
        </HStack>

        <HStack space="md" className="justify-between">
          <Text size="md" className="text-typography-700">
            Shipping
          </Text>
          <Text size="md" className="font-medium text-typography-900">
            {formatPrice(summary.shipping)}
          </Text>
        </HStack>

        <HStack space="md" className="justify-between">
          <Text size="md" className="text-typography-700">
            Tax
          </Text>
          <Text size="md" className="font-medium text-typography-900">
            {formatPrice(summary.tax)}
          </Text>
        </HStack>

        <Divider />

        <HStack space="md" className="justify-between">
          <Text size="lg" className="font-semibold text-typography-900">
            Total
          </Text>
          <Text size="lg" className="font-semibold text-typography-900">
            {formatPrice(summary.total)}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  </Card>
);

interface CheckoutFooterProps {
  onCheckout: () => void;
}

const CheckoutFooter: React.FC<CheckoutFooterProps> = ({ onCheckout }) => (
  <VStack
    space="sm"
    className="p-5 pb-safe bg-background-0"
  >
    <Text size="sm" className="text-typography-500 text-center">
      Secure checkout • 30-day guarantee
    </Text>

    <Button
      size="lg"
      variant="solid"
      action="primary"
      onPress={onCheckout}
      className="w-full"
    >
      <ButtonText>Proceed to Checkout</ButtonText>
    </Button>
  </VStack>
);

// Custom Hooks
const useCartActions = (initialItems: CartItem[]) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    updateQuantity,
    removeItem,
    toggleFavorite,
    clearCart,
  };
};

// Main Component
const ShoppingCartScreen: React.FC = () => {
  const { cartItems, updateQuantity, removeItem, toggleFavorite } =
    useCartActions(INITIAL_CART_ITEMS);

  const orderSummary = useMemo(
    () => calculateOrderSummary(cartItems),
    [cartItems]
  );

  const isEmpty = cartItems.length === 0;

  const handleBack = () => {
    // Navigate back logic
  };

  const handleCheckout = () => {
    // Checkout logic
  };

  return (
    <Box className="flex-1 bg-background-0">
      <Header onBack={handleBack} />

      <ScrollView
        className="flex-1 px-4 pt-5"
        showsVerticalScrollIndicator={false}
      >
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <VStack space="lg" className="pb-6">
            <CartItemsList
              items={cartItems}
              onQuantityChange={updateQuantity}
              onRemove={removeItem}
              onToggleFavorite={toggleFavorite}
            />
            <OrderSummaryCard summary={orderSummary} />
          </VStack>
        )}
      </ScrollView>

      {!isEmpty && <CheckoutFooter onCheckout={handleCheckout} />}
    </Box>
  );
};

export default ShoppingCartScreen;
