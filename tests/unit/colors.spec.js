"use strict";
/* eslint-env jest */

import { palette } from "@/utils/colorsPalette"
import { colorsMap } from "@/utils/colors";

describe("colors", () => {

  test("generated colors", () => {

    const colorsMapping = colorsMap(["1-red", "2-ping", "3-orange"]);

    expect(colorsMapping["1-red"]).toEqual(palette.darkgray);
    expect(colorsMapping["2-ping"]).toEqual(palette.lightslategray);
    expect(colorsMapping["3-orange"]).toEqual(palette.dimgray);
    expect(colorsMapping["Other"]).toEqual(palette.indianred);

  });

});
