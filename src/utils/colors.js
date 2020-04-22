import { palette } from "@/utils/colorsPalette";

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

export const heatMapColors = [
  palette.lightsalmon,
  palette.salmon,
  palette.darksalmon,
  palette.lightcoral,
  palette.indianred,
  palette.crimson,
  palette.firebrick,
  palette.red,
  palette.darkred
];

export const heatMapColorsBlue = [
  palette.powderblue,
  palette.lightblue,
  palette.lightskyblue,
  palette.skyblue,
  palette.deepskyblue,
  palette.lightsteelblue,
  palette.dodgerblue,
  palette.cornflowerblue,
  palette.steelblue,
  palette.royalblue,
  palette.blue,
  palette.mediumblue,
  palette.darkblue,
  palette.navy,
  palette.midnightblue,
  palette.mediumslateblue,
  palette.slateblue,
  palette.darkslateblue
];

export const colorsMap = labels => {
  labels.sort().push("Other");
  const mapping = labels.reduce((map, label, index) => {
    map[label] = colorsArray[index];
    return map;
  }, {});
  return mapping;
};
