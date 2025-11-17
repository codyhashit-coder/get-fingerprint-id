const n = [
  {
    id: "asus-rog-phone-9-pro",
    brand: "ASUS",
    model: "ROG Phone 9 Pro",
    series: "ROG Phone",
    year: 2025,
    uaContains: [
      "ASUS_AI2501",
      "ROG Phone 9 Pro"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2640,
        ratio: "20.4:9"
      }
    ],
    dpr: 2.625,
    priority: 11e3,
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
    id: "asus-rog-phone-9",
    brand: "ASUS",
    model: "ROG Phone 9",
    series: "ROG Phone",
    year: 2025,
    uaContains: [
      "ASUS_AI2501",
      "ROG Phone 9"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2640,
        ratio: "20.4:9"
      }
    ],
    dpr: 2.625,
    priority: 10900,
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
    id: "asus-zenfone-12-ultra",
    brand: "ASUS",
    model: "Zenfone 12 Ultra",
    series: "Zenfone",
    year: 2025,
    uaContains: [
      "ASUS_AI2502",
      "Zenfone 12 Ultra"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 10800,
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
    id: "asus-rog-phone-8-pro",
    brand: "ASUS",
    model: "ROG Phone 8 Pro",
    series: "ROG Phone",
    year: 2024,
    uaContains: [
      "ASUS_AI2401",
      "ROG Phone 8 Pro"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2640,
        ratio: "20.4:9"
      }
    ],
    dpr: 2.625,
    priority: 10500,
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
    id: "asus-rog-phone-7-ultimate",
    brand: "ASUS",
    model: "ROG Phone 7 Ultimate",
    series: "ROG Phone",
    year: 2023,
    uaContains: [
      "ASUS_AI2205_D",
      "ROG Phone 7"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2448,
        ratio: "20.4:9"
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
      model: "Snapdragon 8 Gen 2"
    }
  },
  {
    id: "asus-zenfone-10",
    brand: "ASUS",
    model: "Zenfone 10",
    series: "Zenfone",
    year: 2023,
    uaContains: [
      "ASUS_AI2302",
      "Zenfone 10"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 9900,
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
    id: "asus-rog-phone-6d-ultimate",
    brand: "ASUS",
    model: "ROG Phone 6D Ultimate",
    series: "ROG Phone",
    year: 2022,
    uaContains: [
      "ASUS_AI2201_B",
      "ROG Phone 6D"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2448,
        ratio: "20.4:9"
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
      brand: "MediaTek",
      model: "Dimensity 9000+"
    }
  },
  {
    id: "asus-zenfone-9",
    brand: "ASUS",
    model: "Zenfone 9",
    series: "Zenfone",
    year: 2022,
    uaContains: [
      "ASUS_AI2202",
      "Zenfone 9"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2400,
        ratio: "20:9"
      }
    ],
    dpr: 2.5,
    priority: 9700,
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
    id: "asus-rog-phone-5s",
    brand: "ASUS",
    model: "ROG Phone 5s",
    series: "ROG Phone",
    year: 2021,
    uaContains: [
      "ASUS_I005DA",
      "ROG Phone 5s"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2448,
        ratio: "20.4:9"
      }
    ],
    dpr: 2.5,
    priority: 9500,
    type: "phone",
    os: {
      name: "android",
      minVersion: "11"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 888+"
    }
  },
  {
    id: "asus-zenfone-8",
    brand: "ASUS",
    model: "Zenfone 8",
    series: "Zenfone",
    year: 2021,
    uaContains: [
      "ASUS_I006D",
      "Zenfone 8"
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
      brand: "Qualcomm",
      model: "Snapdragon 888"
    }
  },
  {
    id: "asus-rog-phone-3",
    brand: "ASUS",
    model: "ROG Phone 3",
    series: "ROG Phone",
    year: 2020,
    uaContains: [
      "ASUS_I003D",
      "ROG Phone 3"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2340,
        ratio: "19.5:9"
      }
    ],
    dpr: 2.5,
    priority: 9e3,
    type: "phone",
    os: {
      name: "android",
      minVersion: "10"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 865+"
    }
  },
  {
    id: "asus-zenfone-7",
    brand: "ASUS",
    model: "Zenfone 7",
    series: "Zenfone",
    year: 2020,
    uaContains: [
      "ASUS_I002D",
      "Zenfone 7"
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
      minVersion: "10"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 865"
    }
  },
  {
    id: "asus-zenfone-6",
    brand: "ASUS",
    model: "Zenfone 6",
    series: "Zenfone",
    year: 2019,
    uaContains: [
      "ASUS_I01WD",
      "Zenfone 6"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2340,
        ratio: "19.5:9"
      }
    ],
    dpr: 2.5,
    priority: 8800,
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
    id: "asus-rog-phone-2",
    brand: "ASUS",
    model: "ROG Phone 2",
    series: "ROG Phone",
    year: 2019,
    uaContains: [
      "ASUS_I001D",
      "ROG Phone 2"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2340,
        ratio: "19.5:9"
      }
    ],
    dpr: 2.5,
    priority: 8700,
    type: "phone",
    os: {
      name: "android",
      minVersion: "9"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 855+"
    }
  },
  {
    id: "asus-zenfone-max-pro-m2",
    brand: "ASUS",
    model: "Zenfone Max Pro M2",
    series: "Zenfone",
    year: 2018,
    uaContains: [
      "ASUS_ZB631KL",
      "Zenfone Max Pro M2"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2280,
        ratio: "19:9"
      }
    ],
    dpr: 2.5,
    priority: 8600,
    type: "phone",
    os: {
      name: "android",
      minVersion: "8.1"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 660"
    }
  },
  {
    id: "asus-rog-phone",
    brand: "ASUS",
    model: "ROG Phone",
    series: "ROG Phone",
    year: 2018,
    uaContains: [
      "ASUS_ZS600KL",
      "ROG Phone"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2160,
        ratio: "18:9"
      }
    ],
    dpr: 2.5,
    priority: 8500,
    type: "phone",
    os: {
      name: "android",
      minVersion: "8.1"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 845"
    }
  },
  {
    id: "asus-zenfone-5",
    brand: "ASUS",
    model: "Zenfone 5",
    series: "Zenfone",
    year: 2018,
    uaContains: [
      "ASUS_ZE620KL",
      "Zenfone 5"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2246,
        ratio: "18.7:9"
      }
    ],
    dpr: 2.5,
    priority: 8400,
    type: "phone",
    os: {
      name: "android",
      minVersion: "8.0"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 636"
    }
  },
  {
    id: "asus-zenfone-max-pro-m1",
    brand: "ASUS",
    model: "Zenfone Max Pro M1",
    series: "Zenfone",
    year: 2018,
    uaContains: [
      "ASUS_ZB601KL",
      "Zenfone Max Pro M1"
    ],
    resolutions: [
      {
        w: 1080,
        h: 2160,
        ratio: "18:9"
      }
    ],
    dpr: 2.5,
    priority: 8300,
    type: "phone",
    os: {
      name: "android",
      minVersion: "8.1"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 636"
    }
  },
  {
    id: "asus-zenfone-4",
    brand: "ASUS",
    model: "Zenfone 4",
    series: "Zenfone",
    year: 2017,
    uaContains: [
      "ASUS_ZE554KL",
      "Zenfone 4"
    ],
    resolutions: [
      {
        w: 1080,
        h: 1920,
        ratio: "16:9"
      }
    ],
    dpr: 2.5,
    priority: 8200,
    type: "phone",
    os: {
      name: "android",
      minVersion: "7.0"
    },
    cpu: {
      brand: "Qualcomm",
      model: "Snapdragon 630"
    }
  }
];
export {
  n as default
};
