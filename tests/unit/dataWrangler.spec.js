"use strict";
/* eslint-env jest */

import { mergeAllStats, topStat } from "@/utils/dataWrangler";

describe("data wrangler", () => {

  const countryBreakdown = {
    "Country-1": [
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
    "Country-2": [
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
    "Country-3": [
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

  const aggregate = [
    {
      date: "2020-01-22",
      value: {
        confirmedCases: 15,
        deaths: 4,
        recoveries: 0
      }
    },
    {
      date: "2020-01-23",
      value: {
        confirmedCases: 30,
        deaths: 13,
        recoveries: 1
      }
    },
    {
      date: "2020-01-24",
      value: {
        confirmedCases: 50,
        deaths: 21,
        recoveries: 0
      }
    }
  ];

  const topConfirmed = {
    "2020-01-22": [
      {
        location: "Country-3",
        value: 7
      },
      {
        location: "Other",
        value: 8
      }
    ],
    "2020-01-23": [
      {
        location: "Country-1",
        value: 15
      },
      {
        location: "Other",
        value: 15
      }
    ],
    "2020-01-24": [
      {
        location: "Country-1",
        value: 30
      },
      {
        location: "Other",
        value: 20
      }
    ]
  };

  const topDeaths = {
    "2020-01-24": [
      {
        location: "Country-1",
        value: 8
      },
      {
        location: "Country-3",
        value: 7
      },
      {
        location: "Other",
        value: 6
      }
    ]
  };

  test("merge all stats", () => {
    const result = mergeAllStats(Object.values(countryBreakdown));
    expect(result).toEqual(aggregate);
  });

  test("top confirmed cases", () => {
    const confirmed = topStat(countryBreakdown, "confirmedCases", 1);
    expect(confirmed).toEqual(topConfirmed);
  });

  test("top 2 deaths cases on 2020-01-24", () => {
    const deaths = topStat(countryBreakdown, "deaths", 2, "2020-01-24");
    expect(deaths).toEqual(topDeaths);
  });

});
