import { palette } from "./colorsPalette";

export const colorsArray = [
  palette.red,
  palette.pink,
  palette.orange,
  palette.yellow,
  palette.violet,
  palette.green,
  palette.blue,
  palette.brown,
  palette.gray,
  palette.black,
  palette.crimson,
  palette.darkblue,
  palette.azure,
  palette.beige,
  palette.cyan,
  palette.darkolivegreen,
  palette.darkviolet,
  palette.deeppink,
  palette.tan,
  palette.indigo
];

export const colorsMap = labels => {
  labels.sort().push("Other");
  return labels.reduce((map, label, index) => {
    map[label] = colorsArray[index];
    return map;
  }, {});
};
