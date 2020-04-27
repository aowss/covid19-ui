"use strict";
/* eslint-env jest */

import { deltas } from "@/utils/tableMapper";

describe("table mapper", () => {

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
          confirmedCases: 6,
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
          confirmedCases: 18,
          deaths: 7,
          recoveries: 0
        }
      }
    ]
  };

  const expected = [
    {
      "location": "Country-1",
      "confirmed": {
        "total": 30,
        "2020-01-24": {
          "value": 15,
          "delta": "100.00"
        },
        "2020-01-23": {
          "value": 10,
          "delta": "200.00"
        }
      },
      "deaths": {
        "total": 8,
        "2020-01-24": {
          "value": 4,
          "delta": "100.00"
        },
        "2020-01-23": {
          "value": 3,
          "delta": "300.00"
        }
      }
    },
    {
      "location": "Country-2",
      "confirmed": {
        "total": 9,
        "2020-01-24": {
          "value": 3,
          "delta": "50.00"
        },
        "2020-01-23": {
          "value": 3,
          "delta": "100.00"
        }
      },
      "deaths": {
        "total": 6,
        "2020-01-24": {
          "value": 2,
          "delta": "50.00"
        },
        "2020-01-23": {
          "value": 2,
          "delta": "100.00"
        }
      }
    },
    {
      "location": "Country-3",
      "confirmed": {
        "total": 18,
        "2020-01-24": {
          "value": 9,
          "delta": "100.00"
        },
        "2020-01-23": {
          "value": 3,
          "delta": "50.00"
        }
      },
      "deaths": {
        "total": 7,
        "2020-01-24": {
          "value": 2,
          "delta": "40.00"
        },
        "2020-01-23": {
          "value": 4,
          "delta": "400.00"
        }
      }
    }
  ];

  test("mapping", () => {
    const result = deltas(countryBreakdown);
    expect(result).toEqual(expected);
  });

});
