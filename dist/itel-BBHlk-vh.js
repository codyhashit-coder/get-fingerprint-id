const i = [
  {
    id: "itel-a80",
    brand: "itel",
    model: "A80",
    series: "A",
    year: 2025,
    uaContains: [
      "itel A80",
      "A670L",
      "itel A670L"
    ],
    resolutions: [
      {
        w: 720,
        h: 1710,
        ratio: "21:9"
      }
    ],
    dpr: 2.75,
    priority: 10200,
    type: "phone",
    os: {
      name: "android",
      minVersion: "14"
    },
    cpu: {
      brand: "UNISOC",
      model: "T606"
    }
  },
  {
    id: "itel-p65",
    brand: "itel",
    model: "P65",
    series: "P",
    year: 2025,
    uaContains: [
      "itel P65",
      "P685L",
      "itel P685L"
    ],
    resolutions: [
      {
        w: 720,
        h: 1612,
        ratio: "20:9"
      }
    ],
    dpr: 2.7,
    priority: 10300,
    type: "phone",
    os: {
      name: "android",
      minVersion: "14"
    },
    cpu: {
      brand: "UNISOC",
      model: "T725"
    }
  },
  {
    id: "itel-s24",
    brand: "itel",
    model: "S24",
    series: "S",
    year: 2024,
    uaContains: [
      "itel S24",
      "S667L",
      "itel S667L"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2408,
        ratio: "20:9"
      }
    ],
    dpr: 2.9,
    priority: 11e3,
    type: "phone",
    os: {
      name: "android",
      minVersion: "13"
    },
    cpu: {
      brand: "MediaTek",
      model: "Helio G91"
    }
  },
  {
    id: "itel-p55-5g",
    brand: "itel",
    model: "P55 5G",
    series: "P",
    year: 2024,
    uaContains: [
      "itel P55 5G",
      "P683L",
      "itel P683L"
    ],
    resolutions: [
      {
        w: 720,
        h: 1612,
        ratio: "20:9"
      }
    ],
    dpr: 2.7,
    priority: 10500,
    type: "phone",
    os: {
      name: "android",
      minVersion: "13"
    },
    cpu: {
      brand: "MediaTek",
      model: "Dimensity 6080"
    }
  },
  {
    id: "itel-a70",
    brand: "itel",
    model: "A70",
    series: "A",
    year: 2024,
    uaContains: [
      "itel A70",
      "A666LN",
      "itel A666LN"
    ],
    resolutions: [
      {
        w: 720,
        h: 1612,
        ratio: "20:9"
      }
    ],
    dpr: 2.65,
    priority: 1e4,
    type: "phone",
    os: {
      name: "android",
      minVersion: "13"
    },
    cpu: {
      brand: "UNISOC",
      model: "T603"
    }
  },
  {
    id: "itel-vision-3-plus",
    brand: "itel",
    model: "Vision 3 Plus",
    series: "Vision",
    year: 2023,
    uaContains: [
      "itel L6503",
      "Vision 3 Plus"
    ],
    resolutions: [
      {
        w: 720,
        h: 1640,
        ratio: "20:9"
      }
    ],
    dpr: 2.6,
    priority: 9800,
    type: "phone",
    os: {
      name: "android",
      minVersion: "12"
    },
    cpu: {
      brand: "UNISOC",
      model: "SC9863A"
    }
  },
  {
    id: "itel-p40-plus",
    brand: "itel",
    model: "P40+",
    series: "P",
    year: 2023,
    uaContains: [
      "itel P40+",
      "P682LP",
      "itel P682LP"
    ],
    resolutions: [
      {
        w: 720,
        h: 1612,
        ratio: "20:9"
      }
    ],
    dpr: 2.65,
    priority: 9700,
    type: "phone",
    os: {
      name: "android",
      minVersion: "12"
    },
    cpu: {
      brand: "UNISOC",
      model: "T606"
    }
  },
  {
    id: "itel-a60s",
    brand: "itel",
    model: "A60s",
    series: "A",
    year: 2023,
    uaContains: [
      "itel A60s",
      "A663L",
      "itel A663L"
    ],
    resolutions: [
      {
        w: 720,
        h: 1612,
        ratio: "20:9"
      }
    ],
    dpr: 2.6,
    priority: 9600,
    type: "phone",
    os: {
      name: "android",
      minVersion: "12"
    },
    cpu: {
      brand: "UNISOC",
      model: "SC9863A"
    }
  },
  {
    id: "itel-s23",
    brand: "itel",
    model: "S23",
    series: "S",
    year: 2023,
    uaContains: [
      "itel S23",
      "S666L",
      "itel S666L"
    ],
    resolutions: [
      {
        w: 720,
        h: 1612,
        ratio: "20:9"
      }
    ],
    dpr: 2.7,
    priority: 10800,
    type: "phone",
    os: {
      name: "android",
      minVersion: "12"
    },
    cpu: {
      brand: "UNISOC",
      model: "T606"
    }
  },
  {
    id: "itel-vision-5-plus",
    brand: "itel",
    model: "Vision 5 Plus",
    series: "Vision",
    year: 2022,
    uaContains: [
      "itel L6006",
      "Vision 5 Plus"
    ],
    resolutions: [
      {
        w: 720,
        h: 1600,
        ratio: "20:9"
      }
    ],
    dpr: 2.55,
    priority: 9400,
    type: "phone",
    os: {
      name: "android",
      minVersion: "11"
    },
    cpu: {
      brand: "UNISOC",
      model: "SC9832E"
    }
  },
  {
    id: "itel-a58",
    brand: "itel",
    model: "A58",
    series: "A",
    year: 2022,
    uaContains: [
      "itel A58",
      "A661L",
      "itel A661L"
    ],
    resolutions: [
      {
        w: 720,
        h: 1612,
        ratio: "20:9"
      }
    ],
    dpr: 2.6,
    priority: 9300,
    type: "phone",
    os: {
      name: "android",
      minVersion: "11"
    },
    cpu: {
      brand: "UNISOC",
      model: "SC9832E"
    }
  },
  {
    id: "itel-a56-pro",
    brand: "itel",
    model: "A56 Pro",
    series: "A",
    year: 2021,
    uaContains: [
      "itel A56 Pro",
      "W6004",
      "itel W6004"
    ],
    resolutions: [
      {
        w: 720,
        h: 1600,
        ratio: "20:9"
      }
    ],
    dpr: 2.55,
    priority: 9200,
    type: "phone",
    os: {
      name: "android",
      minVersion: "10"
    },
    cpu: {
      brand: "UNISOC",
      model: "SC9832E"
    }
  },
  {
    id: "itel-vision-2s",
    brand: "itel",
    model: "Vision 2s",
    series: "Vision",
    year: 2021,
    uaContains: [
      "itel L6502",
      "Vision 2s"
    ],
    resolutions: [
      {
        w: 720,
        h: 1600,
        ratio: "20:9"
      }
    ],
    dpr: 2.6,
    priority: 9100,
    type: "phone",
    os: {
      name: "android",
      minVersion: "10"
    },
    cpu: {
      brand: "UNISOC",
      model: "SC9863A"
    }
  },
  {
    id: "itel-a37",
    brand: "itel",
    model: "A37",
    series: "A",
    year: 2021,
    uaContains: [
      "itel A37",
      "A661W",
      "itel A661W"
    ],
    resolutions: [
      {
        w: 480,
        h: 960,
        ratio: "18:9"
      }
    ],
    dpr: 2,
    priority: 8900,
    type: "phone",
    os: {
      name: "android",
      minVersion: "10"
    },
    cpu: {
      brand: "UNISOC",
      model: "SC7731E"
    }
  },
  {
    id: "itel-vision-1-pro",
    brand: "itel",
    model: "Vision 1 Pro",
    series: "Vision",
    year: 2020,
    uaContains: [
      "itel L6501",
      "Vision 1 Pro"
    ],
    resolutions: [
      {
        w: 720,
        h: 1520,
        ratio: "19:9"
      }
    ],
    dpr: 2.7,
    priority: 8800,
    type: "phone",
    os: {
      name: "android",
      minVersion: "9"
    },
    cpu: {
      brand: "UNISOC",
      model: "SC9832E"
    }
  },
  {
    id: "itel-a48",
    brand: "itel",
    model: "A48",
    series: "A",
    year: 2020,
    uaContains: [
      "itel A48",
      "L6005",
      "itel L6005"
    ],
    resolutions: [
      {
        w: 720,
        h: 1520,
        ratio: "19:9"
      }
    ],
    dpr: 2.7,
    priority: 8700,
    type: "phone",
    os: {
      name: "android",
      minVersion: "10"
    },
    cpu: {
      brand: "UNISOC",
      model: "SC9832E"
    }
  },
  {
    id: "itel-s16-pro",
    brand: "itel",
    model: "S16 Pro",
    series: "S",
    year: 2020,
    uaContains: [
      "itel S16 Pro",
      "L6801",
      "itel L6801"
    ],
    resolutions: [
      {
        w: 720,
        h: 1600,
        ratio: "20:9"
      }
    ],
    dpr: 2.6,
    priority: 8600,
    type: "phone",
    os: {
      name: "android",
      minVersion: "10"
    },
    cpu: {
      brand: "UNISOC",
      model: "SC9863A"
    }
  },
  {
    id: "itel-a56",
    brand: "itel",
    model: "A56",
    series: "A",
    year: 2019,
    uaContains: [
      "itel A56",
      "W6001",
      "itel W6001"
    ],
    resolutions: [
      {
        w: 720,
        h: 1440,
        ratio: "18:9"
      }
    ],
    dpr: 2.9,
    priority: 8500,
    type: "phone",
    os: {
      name: "android",
      minVersion: "9"
    },
    cpu: {
      brand: "UNISOC",
      model: "SC7731E"
    }
  },
  {
    id: "itel-p33-plus",
    brand: "itel",
    model: "P33 Plus",
    series: "P",
    year: 2019,
    uaContains: [
      "itel P33 Plus",
      "W6002",
      "itel W6002"
    ],
    resolutions: [
      {
        w: 480,
        h: 960,
        ratio: "18:9"
      }
    ],
    dpr: 2,
    priority: 8400,
    type: "phone",
    os: {
      name: "android",
      minVersion: "8.1"
    },
    cpu: {
      brand: "MediaTek",
      model: "MT6580"
    }
  },
  {
    id: "itel-it1513",
    brand: "itel",
    model: "it1513",
    series: "Feature",
    year: 2017,
    uaContains: [
      "itel it1513",
      "it1513"
    ],
    resolutions: [
      {
        w: 480,
        h: 854,
        ratio: "16:9"
      }
    ],
    dpr: 1.8,
    priority: 8e3,
    type: "phone",
    os: {
      name: "android",
      minVersion: "6.0"
    },
    cpu: {
      brand: "MediaTek",
      model: "MT6580"
    }
  }
];
export {
  i as default
};
