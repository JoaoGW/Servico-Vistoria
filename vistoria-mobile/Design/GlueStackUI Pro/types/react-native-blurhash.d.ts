declare module "react-native-blurhash" {
  import { Component } from "react";
  import { ImageStyle, StyleProp } from "react-native";

  export interface BlurhashProps {
    blurhash: string;
    style?: StyleProp<ImageStyle>;
    resizeMode?: "cover" | "contain" | "stretch" | "center";
    decodeWidth?: number;
    decodeHeight?: number;
    decodePunch?: number;
    decodeAsync?: boolean;
  }

  export class Blurhash extends Component<BlurhashProps> {}
}
