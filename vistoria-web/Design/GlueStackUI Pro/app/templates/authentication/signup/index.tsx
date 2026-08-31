import React, { useState } from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";
import { ArrowLeft, Eye, EyeOff, Check } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpScreen() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    if (!acceptTerms || !acceptPrivacy) {
      console.log("Please accept terms and privacy policy");
      return;
    }
    setIsLoading(true);
    console.log("Sign up with:", formData);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.phoneNumber &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    acceptTerms &&
    acceptPrivacy;

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-6 pt-6 pb-8">
          <VStack space="2xl">
            {/* Header */}
            <VStack space="lg">
              <Pressable onPress={() => console.log("Go back")}>
                <Icon
                  as={ArrowLeft}
                  size="xl"
                  className="text-typography-700"
                />
              </Pressable>

              <VStack space="sm">
                <Heading size="3xl">Create Account</Heading>
                <Text size="md" className="text-typography-600">
                  Fill in your information to get started
                </Text>
              </VStack>
            </VStack>

            {/* Form */}
            <VStack space="xl">
              {/* Full Name Input */}
              <VStack space="xs">
                <Text size="sm" className="text-typography-700 font-medium">
                  Full Name
                </Text>
                <Input size="lg" variant="outline">
                  <InputField
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChangeText={(value) =>
                      handleInputChange("fullName", value)
                    }
                  />
                </Input>
              </VStack>

              {/* Email Input */}
              <VStack space="xs">
                <Text size="sm" className="text-typography-700 font-medium">
                  Email Address
                </Text>
                <Input size="lg" variant="outline">
                  <InputField
                    placeholder="Enter your email"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange("email", value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Input>
              </VStack>

              {/* Phone Number Input */}
              <VStack space="xs">
                <Text size="sm" className="text-typography-700 font-medium">
                  Phone Number
                </Text>
                <Input size="lg" variant="outline">
                  <InputField
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChangeText={(value) =>
                      handleInputChange("phoneNumber", value)
                    }
                    keyboardType="phone-pad"
                  />
                </Input>
              </VStack>

              {/* Password Input */}
              <VStack space="xs">
                <Text size="sm" className="text-typography-700 font-medium">
                  Password
                </Text>
                <Input size="lg" variant="outline">
                  <InputField
                    placeholder="Create a password"
                    value={formData.password}
                    onChangeText={(value) =>
                      handleInputChange("password", value)
                    }
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <InputSlot className="pr-3">
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <InputIcon
                        as={showPassword ? Eye : EyeOff}
                        className="text-typography-500"
                      />
                    </Pressable>
                  </InputSlot>
                </Input>
                <Text size="xs" className="text-typography-500">
                  Must be at least 8 characters
                </Text>
              </VStack>

              {/* Confirm Password Input */}
              <VStack space="xs">
                <Text size="sm" className="text-typography-700 font-medium">
                  Confirm Password
                </Text>
                <Input size="lg" variant="outline">
                  <InputField
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChangeText={(value) =>
                      handleInputChange("confirmPassword", value)
                    }
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <InputSlot className="pr-3">
                    <Pressable
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <InputIcon
                        as={showConfirmPassword ? Eye : EyeOff}
                        className="text-typography-500"
                      />
                    </Pressable>
                  </InputSlot>
                </Input>
                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <Text size="xs" className="text-error-500">
                      Passwords do not match
                    </Text>
                  )}
              </VStack>

              {/* Terms & Conditions */}
              <VStack space="md">
                <Checkbox
                  value="terms"
                  isChecked={acceptTerms}
                  onChange={setAcceptTerms}
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={Check} />
                  </CheckboxIndicator>
                  <CheckboxLabel>
                    <Text size="sm" className="text-typography-700">
                      I agree to the{" "}
                      <Text
                        size="sm"
                        className="text-primary-500 font-medium"
                        onPress={() => console.log("Open T&C")}
                      >
                        Terms & Conditions
                      </Text>
                    </Text>
                  </CheckboxLabel>
                </Checkbox>

                <Checkbox
                  value="privacy"
                  isChecked={acceptPrivacy}
                  onChange={setAcceptPrivacy}
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={Check} />
                  </CheckboxIndicator>
                  <CheckboxLabel>
                    <Text size="sm" className="text-typography-700">
                      I agree to the{" "}
                      <Text
                        size="sm"
                        className="text-primary-500 font-medium"
                        onPress={() => console.log("Open Privacy Policy")}
                      >
                        Privacy Policy
                      </Text>
                    </Text>
                  </CheckboxLabel>
                </Checkbox>
              </VStack>

              {/* Sign Up Button */}
              <Button
                size="lg"
                variant="solid"
                action="primary"
                onPress={handleSignUp}
                isDisabled={!isFormValid || isLoading}
                className="mt-2"
              >
                <ButtonText>
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </ButtonText>
              </Button>

              {/* Login Link */}
              <HStack space="xs" className="items-center justify-center">
                <Text size="sm" className="text-typography-600">
                  Already have an account?
                </Text>
                <Pressable onPress={() => console.log("Navigate to login")}>
                  <Text size="sm" className="text-primary-500 font-semibold">
                    Log In
                  </Text>
                </Pressable>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
