import React from "react";
import { ClipPath, Defs, G, Path } from "react-native-svg";
import { createIcon, Svg } from "@gluestack-ui/core/icon/creator";

export const FaceIcon = createIcon({
  Root: Svg,
  viewBox: "0 0 24 24",
  path: (
    <>
      <Path
        fill="#47495F"
        fillRule="evenodd"
        d="M3.5 4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H4.5V7a.5.5 0 0 1-1 0V4ZM20 3.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V4.5H17a.5.5 0 0 1 0-1h3ZM4 20.5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 1 0v2.5H7a.5.5 0 0 1 0 1H4ZM20.5 20a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1h2.5V17a.5.5 0 0 1 1 0v3ZM7.5 11a4.5 4.5 0 0 1 9 0v2a4.5 4.5 0 1 1-9 0v-2ZM12 7.5A3.5 3.5 0 0 0 8.5 11v2a3.5 3.5 0 1 0 7 0v-2A3.5 3.5 0 0 0 12 7.5Z"
        clipRule="evenodd"
      />
      <Path
        fill="#47495F"
        fillRule="evenodd"
        d="M10 13.5a.5.5 0 0 1 .5.5v.003l.003.01c.004.009.014.027.036.053a.86.86 0 0 0 .27.194c.28.14.7.24 1.191.24.492 0 .912-.1 1.19-.24a.86.86 0 0 0 .271-.194.214.214 0 0 0 .039-.063V14a.5.5 0 0 1 1 0c0 .568-.447.947-.862 1.154-.445.223-1.025.346-1.638.346s-1.193-.123-1.638-.346C9.947 14.947 9.5 14.568 9.5 14a.5.5 0 0 1 .5-.5Z"
        clipRule="evenodd"
      />
    </>
  ),
});
