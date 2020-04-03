"use strict";
/* eslint-env jest */

import { cumulativeData, dailyData, cumulativeDataPerDay } from "@/utils/chartjsMapper";

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
          deaths: 3,
          recoveries: 0
        }
      },
      {
        date: "2020-01-24",
        value: {
          confirmedCases: 30,
          deaths: 6,
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
    ]
  };

  test("cumulative data in chartjs format", () => {
    const chartjsData = cumulativeData(regionBreakdown);
    expect(chartjsData["Country / Region-1"].labels).toEqual(["2020-01-22", "2020-01-23", "2020-01-24"]);
    expect(chartjsData["Country / Region-1"].datasets[0].label).toEqual("confirmed");
    expect(chartjsData["Country / Region-1"].datasets[0].data).toEqual([5, 15, 30]);
    expect(chartjsData["Country / Region-1"].datasets[1].label).toEqual("deaths");
    expect(chartjsData["Country / Region-1"].datasets[1].data).toEqual([1, 3, 6]);
    expect(chartjsData["Country / Region-2"].labels).toEqual(["2020-01-22", "2020-01-23", "2020-01-24"]);
    expect(chartjsData["Country / Region-2"].datasets[0].label).toEqual("confirmed");
    expect(chartjsData["Country / Region-2"].datasets[0].data).toEqual([3, 6, 9]);
    expect(chartjsData["Country / Region-2"].datasets[1].label).toEqual("deaths");
    expect(chartjsData["Country / Region-2"].datasets[1].data).toEqual([2, 4, 6]);
  });

  test("daily data in chartjs format", () => {
    const chartjsData = dailyData(regionBreakdown);
    expect(chartjsData["Country / Region-1"].labels).toEqual(["2020-01-22", "2020-01-23", "2020-01-24"]);
    expect(chartjsData["Country / Region-1"].datasets[0].label).toEqual("confirmed");
    expect(chartjsData["Country / Region-1"].datasets[0].data).toEqual([5, 10, 15]);
    expect(chartjsData["Country / Region-1"].datasets[1].label).toEqual("deaths");
    expect(chartjsData["Country / Region-1"].datasets[1].data).toEqual([1, 2, 3]);
    expect(chartjsData["Country / Region-2"].labels).toEqual(["2020-01-22", "2020-01-23", "2020-01-24"]);
    expect(chartjsData["Country / Region-2"].datasets[0].label).toEqual("confirmed");
    expect(chartjsData["Country / Region-2"].datasets[0].data).toEqual([3, 3, 3]);
    expect(chartjsData["Country / Region-2"].datasets[1].label).toEqual("deaths");
    expect(chartjsData["Country / Region-2"].datasets[1].data).toEqual([2, 2, 2]);
  });

  test("aggregate data in chartjs format", () => {
    const confirmed = cumulativeDataPerDay(regionBreakdown, "confirmedCases");
    expect(confirmed["2020-01-22"].labels).toEqual(["Country / Region-1", "Country / Region-2"]);
    expect(confirmed["2020-01-22"].datasets[0].data).toEqual([5, 3]);
    expect(confirmed["2020-01-23"].labels).toEqual(["Country / Region-1", "Country / Region-2"]);
    expect(confirmed["2020-01-23"].datasets[0].data).toEqual([15, 6]);
    expect(confirmed["2020-01-24"].labels).toEqual(["Country / Region-1", "Country / Region-2"]);
    expect(confirmed["2020-01-24"].datasets[0].data).toEqual([30, 9]);
    const deaths = cumulativeDataPerDay(regionBreakdown, "deaths");
    expect(deaths["2020-01-22"].labels).toEqual(["Country / Region-1", "Country / Region-2"]);
    expect(deaths["2020-01-22"].datasets[0].data).toEqual([1, 2]);
    expect(deaths["2020-01-23"].labels).toEqual(["Country / Region-1", "Country / Region-2"]);
    expect(deaths["2020-01-23"].datasets[0].data).toEqual([3, 4]);
    expect(deaths["2020-01-24"].labels).toEqual(["Country / Region-1", "Country / Region-2"]);
    expect(deaths["2020-01-24"].datasets[0].data).toEqual([6, 6]);
  });

});
