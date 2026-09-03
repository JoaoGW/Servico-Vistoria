import React, { useState, useMemo } from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ScrollView } from "@/components/ui/scroll-view";
import { Input, InputField } from "@/components/ui/input";
import { Grid, GridItem } from "@/components/ui/grid";
import { CheckIcon, Search, ShoppingCart } from "lucide-react-native";
import { Card } from "@/components/ui/card";
import { Fab, FabIcon } from "@/components/ui/fab";
import {
  Product,
  HeaderProps,
  ProductCardProps,
  ProductGridProps,
} from "./types";
import { PRODUCTS, formatPrice, filterProducts } from "./data";

// Components

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartItemCount,
}) => (
  <VStack space="md" className="bg-background-0 p-4 lg:px-10">
    <HStack space="md" className="items-center justify-between">
      <Heading size="xl" className="text-typography-950">
        Discover
      </Heading>
      <Box className="relative">
        <Icon as={ShoppingCart} size="xl" className="text-typography-950" />
        {cartItemCount > 0 && (
          <Box className="absolute -top-4 -right-4 w-5 h-5 bg-primary-500 rounded-full items-center justify-center">
            <Text size="xs" className="font-bold text-white">
              {cartItemCount}
            </Text>
          </Box>
        )}
      </Box>
    </HStack>

    <HStack space="sm" className="items-center">
      <Input size="xl" variant="outline" className="flex-1">
        <InputField
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </Input>
      <Button size="lg" variant="solid" action="primary">
        <ButtonIcon as={Search} />
        <ButtonText>Search</ButtonText>
      </Button>
    </HStack>
  </VStack>
);

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  isInCart,
}) => {
  const handleCartPress = (e: any) => {
    e.stopPropagation();
    onAddToCart(product.id);
  };

  return (
    <VStack space="md">
      <Box className="relative">
        <Image
          source={{ uri: product.image }}
          className="w-full h-48 rounded-xl"
          alt={product.name}
        />
        {product.inStock && (
          <Fab
            size="sm"
            className={`absolute bottom-2 right-2`}
            onPress={handleCartPress}
          >
            <FabIcon className="" as={isInCart ? CheckIcon : ShoppingCart} />
          </Fab>
        )}
      </Box>

      <VStack>
        <Text size="xl" className="font-semibold text-typography-950">
          {product.name}
        </Text>

        <VStack>
          <Text size="md" className="font-bold text-typography-950">
            {formatPrice(product.price)}
          </Text>
          <Text
            size="sm"
            className={product.inStock ? "text-success-600" : "text-error-600"}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
};

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductPress,
  onAddToCart,
  isInCart,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <Box className="p-4 lg:px-10">
        <Grid
          className="gap-5"
          _extra={{
            className:
              "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
          }}
        >
          {products.map((product) => (
            <GridItem key={product.id} _extra={{ className: "col-span-1" }}>
              <ProductCard
                product={product}
                onPress={onProductPress}
                onAddToCart={onAddToCart}
                isInCart={isInCart(product.id)}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </ScrollView>
  );
};

// Custom Hook
const useProductGallery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    return filterProducts(PRODUCTS, searchQuery);
  }, [searchQuery]);

  const cartItemCount = cartItems.length;

  const addToCart = (productId: number) => {
    setCartItems((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInCart = (productId: number) => {
    return cartItems.includes(productId);
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    cartItemCount,
    addToCart,
    isInCart,
  };
};

// Main Component
const EcommerceGalleryScreen: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    cartItemCount,
    addToCart,
    isInCart,
  } = useProductGallery();

  const handleProductPress = (product: Product) => {};

  return (
    <Box className="flex-1 bg-background-0">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartItemCount={cartItemCount}
      />

      <ProductGrid
        products={filteredProducts}
        onProductPress={handleProductPress}
        onAddToCart={addToCart}
        isInCart={isInCart}
      />
    </Box>
  );
};

export default EcommerceGalleryScreen;
