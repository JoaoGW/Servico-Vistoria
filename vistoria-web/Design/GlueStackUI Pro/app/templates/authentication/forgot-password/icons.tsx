import React from "react";
import { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { createIcon, Svg } from "@gluestack-ui/core/icon/creator";

export const MailIcon = createIcon({
  Root: Svg,
  viewBox: "0 0 24 24",
  path: (
    <>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m4 7 6.2 4.65a3 3 0 0 0 3.6 0L20 7"
      />
      <Rect
        width={18}
        height={14}
        x={3}
        y={5}
        strokeLinecap="round"
        strokeWidth={2}
        rx={2}
      />
    </>
  ),
});
