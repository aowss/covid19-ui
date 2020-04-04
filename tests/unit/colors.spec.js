"use strict";
/* eslint-env jest */

import { palette } from "@/utils/colorsPalette"
import { colorsMap } from "@/utils/colors";

describe("colors", () => {

  test("generated colors", () => {

    const colorsMapping = colorsMap(["1-red", "2-ping", "3-orange"]);

    expect(colorsMapping["1-red"]).toEqual(palette.red);
    expect(colorsMapping["2-ping"]).toEqual(palette.pink);
    expect(colorsMapping["3-orange"]).toEqual(palette.orange);
    expect(colorsMapping["Other"]).toEqual(palette.yellow);

  });

});
