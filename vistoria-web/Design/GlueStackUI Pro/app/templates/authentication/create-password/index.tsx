import React, { useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Eye, EyeOff, Check } from "lucide-react-native";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";

export default function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation using regex
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%*=]/.test(password);

  const isPasswordValid =
    hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";

  const handleResetPassword = () => {
    if (isPasswordValid && passwordsMatch) {
      // Add your password reset logic here
    }
  };

  return (
    <VStack className="h-full bg-background-0 px-6 py-8" space="xl">
      {/* App Name */}
      <VStack className="items-start mb-2" space="md">
        <Heading size="xl" className="text-typography-950 font-bold">
          Secure Your Account
        </Heading>
        <Text className="text-typography-400" size="lg">
          Please enter a new password that meets all security requirements, to
          protect your account.
        </Text>
      </VStack>

      <VStack space="md">
        <Input
          variant="outline"
          size="xl"
          className="border-2 border-primary-500 rounded-xl"
        >
          <InputField
            placeholder="Dnnhhgcf23!"
            className="text-base text-typography-500 px-4"
            value={password}
            onChangeText={setPassword}
            type={showPassword ? "text" : "password"}
          />
          <InputSlot
            className="pr-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            <InputIcon
              as={showPassword ? Eye : EyeOff}
              className="text-typography-500"
            />
          </InputSlot>
        </Input>

        {/* Confirm Password Input */}
        <Input variant="outline" size="xl" className="border-2  rounded-xl">
          <InputField
            placeholder="***********"
            className="text-base text-typography-500 px-4"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            type={showConfirmPassword ? "text" : "password"}
          />
          <InputSlot
            className="pr-3"
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <InputIcon
              as={showConfirmPassword ? Eye : EyeOff}
              className="text-typography-500"
            />
          </InputSlot>
        </Input>
      </VStack>

      {/* Password Requirements */}
      <VStack space="sm" className="mt-4">
        <HStack space="sm" className="items-center">
          <Icon
            as={Check}
            size="sm"
            className={
              hasMinLength ? "text-primary-500" : "text-typography-300"
            }
          />
          <Text
            className={`text-base ${
              hasMinLength ? "text-primary-500" : "text-typography-400"
            }`}
          >
            At least 8 characters
          </Text>
        </HStack>

        <HStack space="sm" className="items-center">
          <Icon
            as={Check}
            size="sm"
            className={
              hasUppercase ? "text-primary-500" : "text-typography-300"
            }
          />
          <Text
            className={`text-base ${
              hasUppercase ? "text-primary-500" : "text-typography-400"
            }`}
          >
            One uppercase letter
          </Text>
        </HStack>

        <HStack space="sm" className="items-center">
          <Icon
            as={Check}
            size="sm"
            className={
              hasLowercase ? "text-primary-500" : "text-typography-300"
            }
          />
          <Text
            className={`text-base ${
              hasLowercase ? "text-primary-500" : "text-typography-400"
            }`}
          >
            One lowercase letter
          </Text>
        </HStack>

        <HStack space="sm" className="items-center">
          <Icon
            as={Check}
            size="sm"
            className={hasNumber ? "text-primary-500" : "text-typography-400"}
          />
          <Text
            className={`text-base ${
              hasNumber ? "text-primary-500" : "text-typography-400"
            }`}
          >
            One number
          </Text>
        </HStack>

        <HStack space="sm" className="items-center">
          <Icon
            as={Check}
            size="sm"
            className={
              hasSpecialChar ? "text-primary-500" : "text-typography-400"
            }
          />
          <Text
            className={`text-base ${
              hasSpecialChar ? "text-primary-500" : "text-typography-400"
            }`}
          >
            One special character (!@#$%*=)
          </Text>
        </HStack>
      </VStack>

      {/* Pagination Dots */}
      <HStack space="xs" className="items-center justify-center py-6">
        <Box className="w-8 h-2 bg-primary-500 rounded-full" />
        <Box className="w-2 h-2 bg-typography-300 rounded-full" />
        <Box className="w-2 h-2 bg-typography-300 rounded-full" />
        <Box className="w-2 h-2 bg-typography-300 rounded-full" />
        <Box className="w-2 h-2 bg-typography-300 rounded-full" />
      </HStack>

      {/* Reset Password Button */}
      <Button
        size="lg"
        onPress={handleResetPassword}
        isDisabled={!isPasswordValid || !passwordsMatch}
      >
        <ButtonText>Reset Password</ButtonText>
      </Button>
    </VStack>
  );
}
