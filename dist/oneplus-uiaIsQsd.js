const n = [
  {
    id: "oneplus-15",
    brand: "OnePlus",
    model: "15",
    series: "Flagship",
    year: 2025,
    uaContains: [
      "PJZ200",
      "OnePlus 15"
    ],
    resolutions: [
      {
        w: 1272,
        h: 2772,
        ratio: "20:9"
      }
    ],
    dpr: 3,
    priority: 12500,
    type: "phone",
    os: {
      name: "android",
      minVersion: "16"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Elite Gen 5"
    }
  },
  {
    id: "oneplus-15r",
    brand: "OnePlus",
    model: "15R",
    series: "Flagship",
    year: 2025,
    uaContains: [
      "OnePlus 15R",
      "PJZ210"
    ],
    resolutions: [
      {
        w: 1344,
        h: 3e3,
        ratio: "20:9"
      }
    ],
    dpr: 3,
    priority: 12400,
    type: "phone",
    os: {
      name: "android",
      minVersion: "16"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Elite"
    }
  },
  {
    id: "oneplus-nord-5",
    brand: "OnePlus",
    model: "Nord 5",
    series: "Nord",
    year: 2025,
    uaContains: [
      "CPH2701",
      "Nord 5"
    ],
    resolutions: [
      {
        w: 1240,
        h: 2772,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 12300,
    type: "phone",
    os: {
      name: "android",
      minVersion: "15"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8s Gen 3"
    }
  },
  {
    id: "oneplus-ace-6",
    brand: "OnePlus",
    model: "Ace 6",
    series: "Ace",
    year: 2025,
    uaContains: [
      "PHK210",
      "Ace 6"
    ],
    resolutions: [
      {
        w: 1216,
        h: 2668,
        ratio: "20:9"
      }
    ],
    dpr: 2.75,
    priority: 12200,
    type: "phone",
    os: {
      name: "android",
      minVersion: "16"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Elite"
    }
  },
  {
    id: "oneplus-pad-3",
    brand: "OnePlus",
    model: "Pad 3",
    series: "Pad",
    year: 2025,
    uaContains: [
      "OnePlus Pad 3",
      "PTP210"
    ],
    resolutions: [
      {
        w: 3200,
        h: 2133,
        ratio: "3:2"
      }
    ],
    dpr: 3,
    priority: 12100,
    type: "tablet",
    os: {
      name: "android",
      minVersion: "15"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Elite"
    }
  },
  {
    id: "oneplus-13t",
    brand: "OnePlus",
    model: "13T",
    series: "Flagship",
    year: 2025,
    uaContains: [
      "OnePlus 13T"
    ],
    resolutions: [
      {
        w: 1216,
        h: 2640,
        ratio: "20:9"
      }
    ],
    dpr: 3,
    priority: 12e3,
    type: "phone",
    os: {
      name: "android",
      minVersion: "15"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Elite"
    }
  },
  {
    id: "oneplus-13",
    brand: "OnePlus",
    model: "13",
    series: "Flagship",
    year: 2025,
    uaContains: [
      "PJZ110",
      "OnePlus 13"
    ],
    resolutions: [
      {
        w: 1440,
        h: 3168,
        ratio: "20:9"
      }
    ],
    dpr: 3,
    priority: 10500,
    type: "phone",
    os: {
      name: "android",
      minVersion: "15"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Elite"
    }
  },
  {
    id: "oneplus-13r",
    brand: "OnePlus",
    model: "13R",
    series: "Flagship",
    year: 2025,
    uaContains: [
      "OnePlus 13R",
      "PJZ100"
    ],
    resolutions: [
      {
        w: 1264,
        h: 2780,
        ratio: "20:9"
      }
    ],
    dpr: 2.6,
    priority: 10450,
    type: "phone",
    os: {
      name: "android",
      minVersion: "15"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Gen 3"
    }
  },
  {
    id: "oneplus-nord-4",
    brand: "OnePlus",
    model: "Nord 4",
    series: "Nord",
    year: 2024,
    uaContains: [
      "CPH2611",
      "Nord 4"
    ],
    resolutions: [
      {
        w: 1240,
        h: 2772,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 10300,
    type: "phone",
    os: {
      name: "android",
      minVersion: "14"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 7+ Gen 3"
    }
  },
  {
    id: "oneplus-pad-2",
    brand: "OnePlus",
    model: "Pad 2",
    series: "Pad",
    year: 2024,
    uaContains: [
      "OnePlus Pad 2",
      "PTP110"
    ],
    resolutions: [
      {
        w: 3e3,
        h: 2120,
        ratio: "3:2"
      }
    ],
    dpr: 3,
    priority: 10200,
    type: "tablet",
    os: {
      name: "android",
      minVersion: "14"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Gen 3"
    }
  },
  {
    id: "oneplus-12",
    brand: "OnePlus",
    model: "12",
    series: "Flagship",
    year: 2024,
    uaContains: [
      "PJZ110",
      "OnePlus 12"
    ],
    resolutions: [
      {
        w: 1440,
        h: 3168,
        ratio: "20:9"
      }
    ],
    dpr: 3,
    priority: 11e3,
    type: "phone",
    os: {
      name: "android",
      minVersion: "14"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Gen 3"
    }
  },
  {
    id: "oneplus-12r",
    brand: "OnePlus",
    model: "12R",
    series: "Flagship",
    year: 2024,
    uaContains: [
      "OnePlus 12R"
    ],
    resolutions: [
      {
        w: 1264,
        h: 2780,
        ratio: "20:9"
      }
    ],
    dpr: 2.6,
    priority: 10900,
    type: "phone",
    os: {
      name: "android",
      minVersion: "14"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Gen 2"
    }
  },
  {
    id: "oneplus-nord-ce-4",
    brand: "OnePlus",
    model: "Nord CE 4",
    series: "Nord",
    year: 2024,
    uaContains: [
      "CPH2615",
      "Nord CE 4"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2412,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 10800,
    type: "phone",
    os: {
      name: "android",
      minVersion: "14"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 7 Gen 3"
    }
  },
  {
    id: "oneplus-ace-5",
    brand: "OnePlus",
    model: "Ace 5",
    series: "Ace",
    year: 2024,
    uaContains: [
      "PHK200",
      "Ace 5"
    ],
    resolutions: [
      {
        w: 1240,
        h: 2772,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 10700,
    type: "phone",
    os: {
      name: "android",
      minVersion: "14"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 7+ Gen 3"
    }
  },
  {
    id: "oneplus-11",
    brand: "OnePlus",
    model: "11",
    series: "Flagship",
    year: 2023,
    uaContains: [
      "CPH2447",
      "OnePlus 11"
    ],
    resolutions: [
      {
        w: 1440,
        h: 3216,
        ratio: "20:9"
      }
    ],
    dpr: 3,
    priority: 1e4,
    type: "phone",
    os: {
      name: "android",
      minVersion: "13"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Gen 2"
    }
  },
  {
    id: "oneplus-11r",
    brand: "OnePlus",
    model: "11R",
    series: "Flagship",
    year: 2023,
    uaContains: [
      "OnePlus 11R"
    ],
    resolutions: [
      {
        w: 1264,
        h: 2772,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 10100,
    type: "phone",
    os: {
      name: "android",
      minVersion: "13"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8+ Gen 1"
    }
  },
  {
    id: "oneplus-nord-3",
    brand: "OnePlus",
    model: "Nord 3",
    series: "Nord",
    year: 2023,
    uaContains: [
      "CPH2491",
      "Nord 3"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2412,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 9500,
    type: "phone",
    os: {
      name: "android",
      minVersion: "13"
    },
    cpu: {
      brand: "MediaTek",
      model: "Dimensity 9000"
    }
  },
  {
    id: "oneplus-ace-3",
    brand: "OnePlus",
    model: "Ace 3",
    series: "Ace",
    year: 2023,
    uaContains: [
      "PHK110",
      "Ace 3"
    ],
    resolutions: [
      {
        w: 1240,
        h: 2772,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 9600,
    type: "phone",
    os: {
      name: "android",
      minVersion: "13"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Gen 2"
    }
  },
  {
    id: "oneplus-ace-2",
    brand: "OnePlus",
    model: "Ace 2",
    series: "Ace",
    year: 2023,
    uaContains: [
      "PHK110",
      "Ace 2"
    ],
    resolutions: [
      {
        w: 1240,
        h: 2772,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 9700,
    type: "phone",
    os: {
      name: "android",
      minVersion: "13"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8+ Gen 1"
    }
  },
  {
    id: "oneplus-10-pro",
    brand: "OnePlus",
    model: "10 Pro",
    series: "Flagship",
    year: 2022,
    uaContains: [
      "NE2210",
      "OnePlus 10 Pro"
    ],
    resolutions: [
      {
        w: 1440,
        h: 3216,
        ratio: "20:9"
      }
    ],
    dpr: 3,
    priority: 9900,
    type: "phone",
    os: {
      name: "android",
      minVersion: "12"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Gen 1"
    }
  },
  {
    id: "oneplus-10t",
    brand: "OnePlus",
    model: "10T",
    series: "T",
    year: 2022,
    uaContains: [
      "OnePlus 10T"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2412,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 9800,
    type: "phone",
    os: {
      name: "android",
      minVersion: "12"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8+ Gen 1"
    }
  },
  {
    id: "oneplus-nord-2t",
    brand: "OnePlus",
    model: "Nord 2T",
    series: "Nord",
    year: 2022,
    uaContains: [
      "OnePlus Nord 2T"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 9600,
    type: "phone",
    os: {
      name: "android",
      minVersion: "12"
    },
    cpu: {
      brand: "MediaTek",
      model: "Dimensity 1300"
    }
  },
  {
    id: "oneplus-nord-2",
    brand: "OnePlus",
    model: "Nord 2",
    series: "Nord",
    year: 2021,
    uaContains: [
      "OnePlus Nord 2"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 9400,
    type: "phone",
    os: {
      name: "android",
      minVersion: "11"
    },
    cpu: {
      brand: "MediaTek",
      model: "Dimensity 1200"
    }
  },
  {
    id: "oneplus-9rt",
    brand: "OnePlus",
    model: "9RT",
    series: "T",
    year: 2021,
    uaContains: [
      "MT2110",
      "9RT"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 9200,
    type: "phone",
    os: {
      name: "android",
      minVersion: "11"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 888"
    }
  },
  {
    id: "oneplus-9-pro",
    brand: "OnePlus",
    model: "9 Pro",
    series: "Flagship",
    year: 2021,
    uaContains: [
      "LE2120",
      "OnePlus 9 Pro"
    ],
    resolutions: [
      {
        w: 1440,
        h: 3216,
        ratio: "20:9"
      }
    ],
    dpr: 3,
    priority: 9300,
    type: "phone",
    os: {
      name: "android",
      minVersion: "11"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 888"
    }
  },
  {
    id: "oneplus-9",
    brand: "OnePlus",
    model: "9",
    series: "Flagship",
    year: 2021,
    uaContains: [
      "LE2110",
      "OnePlus 9"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 9100,
    type: "phone",
    os: {
      name: "android",
      minVersion: "11"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 888"
    }
  },
  {
    id: "oneplus-nord-ce",
    brand: "OnePlus",
    model: "Nord CE",
    series: "Nord",
    year: 2021,
    uaContains: [
      "OnePlus Nord CE"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 9e3,
    type: "phone",
    os: {
      name: "android",
      minVersion: "11"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 750G"
    }
  },
  {
    id: "oneplus-8t",
    brand: "OnePlus",
    model: "8T",
    series: "T",
    year: 2020,
    uaContains: [
      "KB2005",
      "OnePlus 8T"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 8900,
    type: "phone",
    os: {
      name: "android",
      minVersion: "11"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 865"
    }
  },
  {
    id: "oneplus-8-pro",
    brand: "OnePlus",
    model: "8 Pro",
    series: "Flagship",
    year: 2020,
    uaContains: [
      "IN2020",
      "OnePlus 8 Pro"
    ],
    resolutions: [
      {
        w: 1440,
        h: 3168,
        ratio: "19.8:9"
      }
    ],
    dpr: 3,
    priority: 8800,
    type: "phone",
    os: {
      name: "android",
      minVersion: "10"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 865"
    }
  },
  {
    id: "oneplus-8",
    brand: "OnePlus",
    model: "8",
    series: "Flagship",
    year: 2020,
    uaContains: [
      "IN2019",
      "OnePlus 8"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 8700,
    type: "phone",
    os: {
      name: "android",
      minVersion: "10"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 865"
    }
  },
  {
    id: "oneplus-nord",
    brand: "OnePlus",
    model: "Nord",
    series: "Nord",
    year: 2020,
    uaContains: [
      "OnePlus Nord"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 8600,
    type: "phone",
    os: {
      name: "android",
      minVersion: "10"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 765G"
    }
  },
  {
    id: "oneplus-7t-pro",
    brand: "OnePlus",
    model: "7T Pro",
    series: "T",
    year: 2019,
    uaContains: [
      "HD2015",
      "OnePlus 7T Pro"
    ],
    resolutions: [
      {
        w: 1440,
        h: 3120,
        ratio: "19.5:9"
      }
    ],
    dpr: 3,
    priority: 8500,
    type: "phone",
    os: {
      name: "android",
      minVersion: "10"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 855+"
    }
  },
  {
    id: "oneplus-7t",
    brand: "OnePlus",
    model: "7T",
    series: "T",
    year: 2019,
    uaContains: [
      "HD1905",
      "OnePlus 7T"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 8400,
    type: "phone",
    os: {
      name: "android",
      minVersion: "10"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 855+"
    }
  },
  {
    id: "oneplus-7-pro",
    brand: "OnePlus",
    model: "7 Pro",
    series: "Flagship",
    year: 2019,
    uaContains: [
      "GM1917",
      "OnePlus 7 Pro"
    ],
    resolutions: [
      {
        w: 1440,
        h: 3120,
        ratio: "19.5:9"
      }
    ],
    dpr: 3,
    priority: 8300,
    type: "phone",
    os: {
      name: "android",
      minVersion: "9"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 855"
    }
  },
  {
    id: "oneplus-7",
    brand: "OnePlus",
    model: "7",
    series: "Flagship",
    year: 2019,
    uaContains: [
      "GM1900",
      "OnePlus 7"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2340,
        ratio: "19.5:9"
      }
    ],
    dpr: 2.5,
    priority: 8200,
    type: "phone",
    os: {
      name: "android",
      minVersion: "9"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 855"
    }
  },
  {
    id: "oneplus-6t",
    brand: "OnePlus",
    model: "6T",
    series: "Flagship",
    year: 2018,
    uaContains: [
      "Hox190",
      "OnePlus 6T"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2340,
        ratio: "19.5:9"
      }
    ],
    dpr: 2.5,
    priority: 8100,
    type: "phone",
    os: {
      name: "android",
      minVersion: "9"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 845"
    }
  },
  {
    id: "oneplus-6",
    brand: "OnePlus",
    model: "6",
    series: "Flagship",
    year: 2018,
    uaContains: [
      "Hox190",
      "OnePlus 6"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2280,
        ratio: "19:9"
      }
    ],
    dpr: 2.5,
    priority: 8e3,
    type: "phone",
    os: {
      name: "android",
      minVersion: "8"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 845"
    }
  },
  {
    id: "oneplus-5t",
    brand: "OnePlus",
    model: "5T",
    series: "Flagship",
    year: 2017,
    uaContains: [
      "A5010",
      "OnePlus 5T"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2160,
        ratio: "18:9"
      }
    ],
    dpr: 2.5,
    priority: 7900,
    type: "phone",
    os: {
      name: "android",
      minVersion: "7.1"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 835"
    }
  },
  {
    id: "oneplus-5",
    brand: "OnePlus",
    model: "5",
    series: "Flagship",
    year: 2017,
    uaContains: [
      "A5000",
      "OnePlus 5"
    ],
    resolutions: [
      {
        w: 1080,
        h: 1920,
        ratio: "16:9"
      }
    ],
    dpr: 2.5,
    priority: 7800,
    type: "phone",
    os: {
      name: "android",
      minVersion: "7.1"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 835"
    }
  },
  {
    id: "oneplus-3t",
    brand: "OnePlus",
    model: "3T",
    series: "Flagship",
    year: 2016,
    uaContains: [
      "A3010",
      "OnePlus 3T"
    ],
    resolutions: [
      {
        w: 1080,
        h: 1920,
        ratio: "16:9"
      }
    ],
    dpr: 2.5,
    priority: 7700,
    type: "phone",
    os: {
      name: "android",
      minVersion: "7"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 821"
    }
  },
  {
    id: "oneplus-3",
    brand: "OnePlus",
    model: "3",
    series: "Flagship",
    year: 2016,
    uaContains: [
      "A3000",
      "OnePlus 3"
    ],
    resolutions: [
      {
        w: 1080,
        h: 1920,
        ratio: "16:9"
      }
    ],
    dpr: 2.5,
    priority: 7600,
    type: "phone",
    os: {
      name: "android",
      minVersion: "6"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 820"
    }
  },
  {
    id: "oneplus-2",
    brand: "OnePlus",
    model: "2",
    series: "Flagship",
    year: 2015,
    uaContains: [
      "OnePlus 2"
    ],
    resolutions: [
      {
        w: 1080,
        h: 1920,
        ratio: "16:9"
      }
    ],
    dpr: 2.5,
    priority: 7500,
    type: "phone",
    os: {
      name: "android",
      minVersion: "5"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 810"
    }
  },
  {
    id: "oneplus-one",
    brand: "OnePlus",
    model: "One",
    series: "Flagship",
    year: 2014,
    uaContains: [
      "OnePlus One"
    ],
    resolutions: [
      {
        w: 1080,
        h: 1920,
        ratio: "16:9"
      }
    ],
    dpr: 3,
    priority: 7400,
    type: "phone",
    os: {
      name: "android",
      minVersion: "4.4"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 801"
    }
  }
];
export {
  n as default
};
