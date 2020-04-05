import { getters } from "@/store/modules/stats";
const { allStats, countriesStats, statsForCountry, statsForRegion, allCountries, countriesWithRegions, allStatsIndexedByDate } = getters;

describe("getters", () => {

  const regionBreakdown = {
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
    "Country-2 / Region-1": [
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
    "Country-2 / Region-2": [
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
          recoveries: 0
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

  const state = {
    stats: regionBreakdown
  };

  it("allStats", () => {
    const result = allStats(state);
    expect(result).toEqual(regionBreakdown);
  });

  it("countriesStats", () => {
    const result = countriesStats(state);
    expect(result).toEqual({
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
      ]
    });
  });

  it("statsForCountry", () => {
    const result = statsForCountry(state)("Country-1");
    expect(result).toEqual([
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
    ]);
  });

  it("statsForRegion", () => {
    const result = statsForRegion(state)("Country-2");
    expect(result).toEqual({
      "Country-2 / Region-1": [
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
      "Country-2 / Region-2": [
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
            recoveries: 0
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
    });
  });

  it("allCountries", () => {
    const result = allCountries(state);
    expect(result).toEqual(["Country-1"])
  });

  it("countriesWithRegions", () => {
    const result = countriesWithRegions(state);
    expect(result).toEqual(["Country-2"])
  });

  it("allStatsIndexedByDate", () => {
    const result = allStatsIndexedByDate(state);
    expect(result).toEqual({
      "2020-01-22": [
        {
          location: "Country-1",
          value: {
            confirmedCases: 5,
            deaths: 1,
            recoveries: 0
          }
        },
        {
          location: "Country-2 / Region-1",
          value: {
            confirmedCases: 3,
            deaths: 2,
            recoveries: 0
          }
        },
        {
          location: "Country-2 / Region-2",
          value: {
            confirmedCases: 7,
            deaths: 1,
            recoveries: 0
          }
        }
        ],
      "2020-01-23": [
        {
          location: "Country-1",
          value: {
            confirmedCases: 15,
            deaths: 4,
            recoveries: 0
          }
        },
        {
          location: "Country-2 / Region-1",
          value: {
            confirmedCases: 6,
            deaths: 4,
            recoveries: 0
          }
        },
        {
          location: "Country-2 / Region-2",
          value: {
            confirmedCases: 9,
            deaths: 5,
            recoveries: 0
          }
        }
      ],
      "2020-01-24": [
        {
          location: "Country-1",
          value: {
            confirmedCases: 30,
            deaths: 8,
            recoveries: 0
          }
        },
        {
          location: "Country-2 / Region-1",
          value: {
            confirmedCases: 9,
            deaths: 6,
            recoveries: 0
          }
        },
        {
          location: "Country-2 / Region-2",
          value: {
            confirmedCases: 11,
            deaths: 7,
            recoveries: 0
          }
        }
      ]
    });
  });

});
