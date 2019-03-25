import * as React from "react";

import MenuItem from "@material-ui/core/MenuItem";

export default function NumberMenuItems(
  start: number,
  end: number,
  step: number = 1
) {
  const nums = new Array(end - start + 1);
  for (let i = start; i <= end; i += step) {
    nums[i] = i;
  }
  return nums.map((item, i) => {
    return (
      <MenuItem value={item} key={item}>
        {String(item)}
      </MenuItem>
    );
  });
}
