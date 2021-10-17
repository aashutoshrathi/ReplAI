import * as React from "react";
import { Shimmer, ShimmerElementType } from "@fluentui/react";

const shimmerConfig = [
  { type: ShimmerElementType.circle },
  { type: ShimmerElementType.gap, width: "2%" },
  { type: ShimmerElementType.line },
];

const ShimmerOption = () => <Shimmer shimmerElements={shimmerConfig} />;

export default ShimmerOption;
