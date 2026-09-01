import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { CouponCard, PointsHeader, FloatingActionButton } from "./components";
import { mockCoupons, getTotalPoints } from "./data";
import { CouponWithColor } from "./types";

const CouponScreen: React.FC = () => {
  const [coupons] = useState<CouponWithColor[]>(mockCoupons);
  const totalPoints = getTotalPoints(coupons);

  const handleAddCoupon = () => {
    // Handle adding new coupon
    console.log("Add new coupon");
  };

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-4 pt-6 pb-20">
          <VStack space="md">
            {/* Points Header */}
            <PointsHeader totalPoints={totalPoints} />

            {/* Coupon Cards */}

            {coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </VStack>
        </Box>
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton onPress={handleAddCoupon} />
    </Box>
  );
};

export default CouponScreen;
