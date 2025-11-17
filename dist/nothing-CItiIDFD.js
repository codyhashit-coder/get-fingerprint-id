const n = [
  {
    id: "nothing-phone-3-pro",
    brand: "Nothing",
    model: "Phone (3) Pro",
    series: "Phone",
    year: 2025,
    uaContains: [
      "Nothing A078",
      "Phone (3) Pro"
    ],
    resolutions: [
      {
        w: 1344,
        h: 3120,
        ratio: "19.5:9"
      }
    ],
    dpr: 3,
    priority: 13e3,
    type: "phone",
    os: {
      name: "android",
      minVersion: "15"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8 Gen 4"
    }
  },
  {
    id: "nothing-phone-3",
    brand: "Nothing",
    model: "Phone (3)",
    series: "Phone",
    year: 2025,
    uaContains: [
      "Nothing A077",
      "Phone (3)"
    ],
    resolutions: [
      {
        w: 1260,
        h: 2800,
        ratio: "20:9"
      }
    ],
    dpr: 2.8125,
    priority: 12e3,
    type: "phone",
    os: {
      name: "android",
      minVersion: "15"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 8s Gen 4"
    }
  },
  {
    id: "nothing-phone-3a-pro",
    brand: "Nothing",
    model: "Phone (3a) Pro",
    series: "Phone",
    year: 2025,
    uaContains: [
      "Nothing A070",
      "Phone (3a) Pro"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2392,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 11500,
    type: "phone",
    os: {
      name: "android",
      minVersion: "15"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 7s Gen 3"
    }
  },
  {
    id: "nothing-phone-3a-plus",
    brand: "Nothing",
    model: "Phone (3a) Plus",
    series: "Phone",
    year: 2025,
    uaContains: [
      "Nothing A071",
      "Phone (3a) Plus"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2412,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 11400,
    type: "phone",
    os: {
      name: "android",
      minVersion: "15"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 7+ Gen 2"
    }
  },
  {
    id: "nothing-phone-3a",
    brand: "Nothing",
    model: "Phone (3a)",
    series: "Phone",
    year: 2025,
    uaContains: [
      "Nothing A069",
      "Phone (3a)"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2392,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 11300,
    type: "phone",
    os: {
      name: "android",
      minVersion: "15"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 7s Gen 3"
    }
  },
  {
    id: "cmf-phone-2-pro",
    brand: "Nothing",
    model: "CMF Phone 2 Pro",
    series: "CMF Phone",
    year: 2025,
    uaContains: [
      "Nothing A001",
      "CMF Phone 2 Pro"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2392,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 11200,
    type: "phone",
    os: {
      name: "android",
      minVersion: "15"
    },
    cpu: {
      brand: "MediaTek",
      model: "Dimensity 7300 Pro"
    }
  },
  {
    id: "nothing-phone-2a",
    brand: "Nothing",
    model: "Phone (2a)",
    series: "Phone",
    year: 2024,
    uaContains: [
      "Nothing A142",
      "Phone (2a)"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2412,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 9700,
    type: "phone",
    os: {
      name: "android",
      minVersion: "14"
    },
    cpu: {
      brand: "MediaTek",
      model: "Dimensity 7200 Pro"
    }
  },
  {
    id: "nothing-phone-2",
    brand: "Nothing",
    model: "Phone (2)",
    series: "Phone",
    year: 2023,
    uaContains: [
      "Nothing A065",
      "Phone (2)"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 1e4,
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
    id: "nothing-phone-1",
    brand: "Nothing",
    model: "Phone (1)",
    series: "Phone",
    year: 2022,
    uaContains: [
      "Nothing A063",
      "Phone (1)"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
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
      model: "Snapdragon 778G+"
    }
  },
  {
    id: "nothing-ear-3",
    brand: "Nothing",
    model: "Ear (3)",
    series: "Ear",
    year: 2025,
    uaContains: [
      "Nothing Ear (3)"
    ],
    priority: 11e3,
    type: "earphone"
  },
  {
    id: "nothing-ear-2",
    brand: "Nothing",
    model: "Ear (2)",
    series: "Ear",
    year: 2023,
    uaContains: [
      "Nothing Ear (2)"
    ],
    type: "earphone"
  },
  {
    id: "nothing-ear-a",
    brand: "Nothing",
    model: "Ear (a)",
    series: "Ear",
    year: 2024,
    uaContains: [
      "Nothing Ear (a)"
    ],
    type: "earphone"
  },
  {
    id: "nothing-ear-1",
    brand: "Nothing",
    model: "Ear (1)",
    series: "Ear",
    year: 2021,
    uaContains: [
      "Nothing Ear (1)"
    ],
    type: "earphone"
  }
];
export {
  n as default
};
