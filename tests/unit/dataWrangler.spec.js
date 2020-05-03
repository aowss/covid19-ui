"use strict";
/* eslint-env jest */

import { mergeAllStats, topStat, currentTopStat, removeLeadingDates, latest } from "@/utils/dataWrangler";

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

  const currentTopConfirmed = {
    "2020-01-22": [
      {
        location: "Country-1",
        value: 5
      },
      {
        location: "Other",
        value: 10
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

  const currentTopDeaths = {
    "2020-01-23": [
      {
        location: "Country-1",
        value: 4
      },
      {
        location: "Country-3",
        value: 5
      },
      {
        location: "Other",
        value: 4
      }
    ]
  };

  const additionalStats = {
    "Country-1": [
      {
        date: "2020-01-20",
        value: {
          confirmedCases: 0,
          deaths: 0,
          recoveries: 0
        }
      },
      {
        date: "2020-01-21",
        value: {
          confirmedCases: 0,
          deaths: 0,
          recoveries: 0
        }
      },
      {
        date: "2020-01-22",
        value: {
          confirmedCases: 0,
          deaths: 0,
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
      },
      {
        date: "2020-01-25",
        value: {
          confirmedCases: 0,
          deaths: 0,
          recoveries: 0
        }
      }
    ],
    "Country-2": [
      {
        date: "2020-01-20",
        value: {
          confirmedCases: 0,
          deaths: 0,
          recoveries: 0
        }
      },
      {
        date: "2020-01-21",
        value: {
          confirmedCases: 0,
          deaths: 0,
          recoveries: 0
        }
      },
      {
        date: "2020-01-22",
        value: {
          confirmedCases: 0,
          deaths: 0,
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
      },
      {
        date: "2020-01-25",
        value: {
          confirmedCases: 0,
          deaths: 0,
          recoveries: 0
        }
      }
    ],
    "Country-3": [
      {
        date: "2020-01-20",
        value: {
          confirmedCases: 0,
          deaths: 0,
          recoveries: 0
        }
      },
      {
        date: "2020-01-21",
        value: {
          confirmedCases: 0,
          deaths: 0,
          recoveries: 0
        }
      },
      {
        date: "2020-01-22",
        value: {
          confirmedCases: 0,
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
      },
      {
        date: "2020-01-21",
        value: {
          confirmedCases: 0,
          deaths: 0,
          recoveries: 0
        }
      }
    ]
  };

  const latestDeaths = {
    "Country-1": 8,
    "Country-2": 6,
    "Country-3": 7,
  };

  test("merge all stats", () => {
    const result = mergeAllStats(countryBreakdown);
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

  test("current top confirmed cases", () => {
    const confirmed = currentTopStat(countryBreakdown, "confirmedCases", 1);
    expect(confirmed).toEqual(currentTopConfirmed);
  });

  test("current top 2 deaths cases on 2020-01-23", () => {
    const deaths = currentTopStat(countryBreakdown, "deaths", 2, "2020-01-23");
    expect(deaths).toEqual(currentTopDeaths);
  });

  test("remove leading useless dates", () => {
    const predicate = stat => stat.value.confirmedCases == 0 && stat.value.deaths == 0 && stat.value.recoveries == 0;
    const result = removeLeadingDates(additionalStats, predicate);
    Object.values(result).forEach(locationStats => {
      expect(locationStats.length).toEqual(4);
      expect(locationStats[0].date).toEqual("2020-01-22");
    });
  });

  test("latest deaths", () => {
    const deaths = latest(countryBreakdown, "deaths");
    expect(deaths).toEqual(latestDeaths);
  });

});
