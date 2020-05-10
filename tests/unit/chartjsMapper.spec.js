"use strict";
/* eslint-env jest */

import { cumulativeData, dailyData, cumulativeDataPerDay, topCumulativeDataPerDay, buildLineChartData } from "@/utils/chartjsMapper";
import { colorsMap } from "@/utils/colors";
import { palette } from "@/utils/colorsPalette";

describe("bar chart", () => {

  const regionBreakdown = {
    "Country / Region-1": [
      {
        date: "2020-01-22",
        value: {
          confirmedCases: 5,
          deaths: 1,
          recoveries: 0
        }
      },
      {
        date: "2020-01-23",
        value: {
          confirmedCases: 15,
          deaths: 4,
          recoveries: 0
        }
      },
      {
        date: "2020-01-24",
        value: {
          confirmedCases: 30,
          deaths: 8,
          recoveries: 0
        }
      }
    ],
    "Country / Region-2": [
      {
        date: "2020-01-22",
        value: {
          confirmedCases: 3,
          deaths: 2,
          recoveries: 0
        }
      },
      {
        date: "2020-01-23",
        value: {
          confirmedCases: 6,
          deaths: 4,
          recoveries: 0
        }
      },
      {
        date: "2020-01-24",
        value: {
          confirmedCases: 9,
          deaths: 6,
          recoveries: 0
        }
      }
    ],
    "Country / Region-3": [
      {
        date: "2020-01-22",
        value: {
          confirmedCases: 7,
          deaths: 1,
          recoveries: 0
        }
      },
      {
        date: "2020-01-23",
        value: {
          confirmedCases: 9,
          deaths: 5,
          recoveries: 1
        }
      },
      {
        date: "2020-01-24",
        value: {
          confirmedCases: 11,
          deaths: 7,
          recoveries: 0
        }
      }
    ]
  };

  const dateBreakdown = { "2020-01-22": [ { "location": "France", "value": 7 }, { "location": "Other", "value": 8 } ], "2020-01-23": [ { "location": "France", "value": 12 }, { "location": "Other", "value": 18 } ] };
  const colors = { "France":"#a9a9a9","Italy":"#778899","Other":"#bc8f8f","Spain":"#cd5c5c","United Kingdom":"#dcdcdc","United States of America":"#8b0000" };
  const lineChart = { "labels": [ "2020-01-22", "2020-01-23" ], "datasets": [ { "label": "France", "backgroundColor": "#a9a9a9", "fill": false, "data": [7, 12] }, { "label": "Other", "backgroundColor": "#bc8f8f", "fill": false, "data": [8, 18] } ] };

  test("from date-indexed stats to line chart", () => {
    const actual = buildLineChartData(dateBreakdown, colors);
    expect(actual).toEqual(lineChart);
  });

  test("cumulative data in chartjs format", () => {

    const chartjsData = cumulativeData(regionBreakdown);

    Object.values(chartjsData).forEach(value => expect(value.labels).toEqual(["2020-01-22", "2020-01-23", "2020-01-24"]));

    expect(chartjsData["Country / Region-1"].datasets[2].label).toEqual("confirmed");
    expect(chartjsData["Country / Region-1"].datasets[2].data).toEqual([5, 15, 30]);
    expect(chartjsData["Country / Region-1"].datasets[0].label).toEqual("deaths");
    expect(chartjsData["Country / Region-1"].datasets[0].data).toEqual([1, 4, 8]);

    expect(chartjsData["Country / Region-2"].datasets[2].label).toEqual("confirmed");
    expect(chartjsData["Country / Region-2"].datasets[2].data).toEqual([3, 6, 9]);
    expect(chartjsData["Country / Region-2"].datasets[0].label).toEqual("deaths");
    expect(chartjsData["Country / Region-2"].datasets[0].data).toEqual([2, 4, 6]);

  });

  test("daily data in chartjs format", () => {

    const chartjsData = dailyData(regionBreakdown);

    Object.values(chartjsData).forEach(value => expect(value.labels).toEqual(["2020-01-22", "2020-01-23", "2020-01-24"]));

    expect(chartjsData["Country / Region-1"].datasets[2].label).toEqual("confirmed");
    expect(chartjsData["Country / Region-1"].datasets[2].data).toEqual([5, 10, 15]);
    expect(chartjsData["Country / Region-1"].datasets[0].label).toEqual("deaths");
    expect(chartjsData["Country / Region-1"].datasets[0].data).toEqual([1, 3, 4]);

    expect(chartjsData["Country / Region-2"].datasets[2].label).toEqual("confirmed");
    expect(chartjsData["Country / Region-2"].datasets[2].data).toEqual([3, 3, 3]);
    expect(chartjsData["Country / Region-2"].datasets[0].label).toEqual("deaths");
    expect(chartjsData["Country / Region-2"].datasets[0].data).toEqual([2, 2, 2]);

  });

  test("aggregate data in chartjs format", () => {

    const confirmed = cumulativeDataPerDay(regionBreakdown, "confirmedCases");

    Object.values(confirmed).forEach(value => expect(value.labels).toEqual(["Country / Region-1", "Country / Region-2", "Country / Region-3"]));

    expect(confirmed["2020-01-22"].datasets[0].data).toEqual([5, 3, 7]);
    expect(confirmed["2020-01-23"].datasets[0].data).toEqual([15, 6, 9]);
    expect(confirmed["2020-01-24"].datasets[0].data).toEqual([30, 9, 11]);

    const deaths = cumulativeDataPerDay(regionBreakdown, "deaths");

    Object.values(deaths).forEach(value => expect(value.labels).toEqual(["Country / Region-1", "Country / Region-2", "Country / Region-3"]));

    expect(deaths["2020-01-22"].datasets[0].data).toEqual([1, 2, 1]);
    expect(deaths["2020-01-23"].datasets[0].data).toEqual([4, 4, 5]);
    expect(deaths["2020-01-24"].datasets[0].data).toEqual([8, 6, 7]);

  });

  test("top aggregate data in chartjs format", () => {

    const colorsMapping = colorsMap(Object.keys(regionBreakdown));
    const confirmed = topCumulativeDataPerDay(regionBreakdown, "confirmedCases", 1, colorsMapping);

    expect(confirmed["2020-01-22"].labels).toEqual(["Country / Region-3", "Other"]);
    expect(confirmed["2020-01-22"].datasets[0].data).toEqual([7, 8]);
    expect(confirmed["2020-01-22"].datasets[0].backgroundColor).toEqual([palette.dimgray, palette.indianred]);
    expect(confirmed["2020-01-23"].labels).toEqual(["Country / Region-1", "Other"]);
    expect(confirmed["2020-01-23"].datasets[0].data).toEqual([15, 15]);
    expect(confirmed["2020-01-23"].datasets[0].backgroundColor).toEqual([palette.darkgray, palette.indianred]);
    expect(confirmed["2020-01-24"].labels).toEqual(["Country / Region-1", "Other"]);
    expect(confirmed["2020-01-24"].datasets[0].data).toEqual([30, 20]);
    expect(confirmed["2020-01-24"].datasets[0].backgroundColor).toEqual([palette.darkgray, palette.indianred]);

    const deaths = topCumulativeDataPerDay(regionBreakdown, "deaths", 1);

    expect(deaths["2020-01-22"].labels).toEqual(["Country / Region-2", "Other"]);
    expect(deaths["2020-01-22"].datasets[0].data).toEqual([2, 2]);
    expect(deaths["2020-01-22"].datasets[0].backgroundColor).toEqual([palette.lightslategray, palette.indianred]);
    expect(deaths["2020-01-23"].labels).toEqual(["Country / Region-3", "Other"]);
    expect(deaths["2020-01-23"].datasets[0].data).toEqual([5, 8]);
    expect(deaths["2020-01-23"].datasets[0].backgroundColor).toEqual([palette.dimgray, palette.indianred]);
    expect(deaths["2020-01-24"].labels).toEqual(["Country / Region-1", "Other"]);
    expect(deaths["2020-01-24"].datasets[0].data).toEqual([8, 13]);
    expect(deaths["2020-01-24"].datasets[0].backgroundColor).toEqual([palette.darkgray, palette.indianred]);

  });

});
