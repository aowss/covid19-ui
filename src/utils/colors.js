import { palette } from "./colorsPalette";

export const lightColorsArray = [
  palette.darkseagreen,
  palette.dimgrey,
  palette.cadetblue,
  palette.steelblue,
  palette.seashell,
  palette.linen,
  palette.rosybrown,
  palette.indianred,
  palette.maroon,
  palette.thistle,
  palette.darkslateblue,
  palette.lightblue,
  palette.gainsboro,
  palette.seagreen,
  palette.lightslategray,
  palette.lightsteelblue,
  palette.yellow,
  palette.tan,
  palette.indigo,
  palette.cornflowerblue
];

export const colorsArray = [
  palette.darkgray,
  palette.lightslategray,
  palette.dimgray,
  palette.indianred,
  palette.gainsboro,
  palette.darkred,
  palette.rosybrown,
  palette.darkslategray,
  palette.lightsteelblue,
  palette.darkslateblue,
  palette.whitesmoke,
  palette.grey,
  palette.darkolivegreen,
  palette.skyblue,
  palette.linen
];

export const colorsMap = labels => {
  labels.sort().push("Other");
  const mapping = labels.reduce((map, label, index) => {
    map[label] = colorsArray[index];
    return map;
  }, {});
  return mapping;
};
