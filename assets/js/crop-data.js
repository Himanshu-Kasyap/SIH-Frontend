// Comprehensive Crop Information Data Structure
// This data structure contains detailed information about popular crops including
// growing seasons, cultivation methods, soil requirements, and safety precautions

const cropData = {
  // Cereal Crops
  wheat: {
    name: "Wheat",
    category: "Cereal",
    scientificName: "Triticum aestivum",
    growingSeason: {
      sowing: "November - December",
      harvesting: "March - April",
      duration: "120-150 days",
      season: "Rabi (Winter)"
    },
    soilRequirement: {
      type: "Well-drained loamy soil",
      pH: "6.0 - 7.5",
      depth: "15-20 cm",
      drainage: "Good drainage essential"
    },
    climateRequirement: {
      temperature: "15-25°C during growing period",
      rainfall: "75-100 cm annually",
      humidity: "50-70%",
      sunlight: "6-8 hours daily"
    },
    cultivation: {
      landPreparation: [
        "Deep ploughing in summer",
        "2-3 cross ploughings with cultivator",
        "Level the field properly",
        "Apply farmyard manure before sowing"
      ],
      sowing: [
        "Seed rate: 100-125 kg/hectare",
        "Sowing depth: 3-5 cm",
        "Row spacing: 20-23 cm",
        "Use seed drill for uniform sowing"
      ],
      irrigation: [
        "First irrigation 20-25 days after sowing",
        "Second irrigation at tillering stage",
        "Third irrigation at flowering stage",
        "Fourth irrigation at grain filling stage"
      ],
      fertilization: [
        "Nitrogen: 120 kg/hectare",
        "Phosphorus: 60 kg/hectare", 
        "Potassium: 40 kg/hectare",
        "Apply half nitrogen at sowing, remaining in splits"
      ]
    },
    precautions: [
      "Avoid waterlogging during any growth stage",
      "Monitor for rust diseases regularly",
      "Control weeds within 30-40 days of sowing",
      "Protect from birds during grain filling",
      "Harvest at proper maturity to avoid shattering",
      "Store grains at 12% moisture content"
    ],
    commonDiseases: [
      "Leaf rust (Puccinia triticina)",
      "Stem rust (Puccinia graminis)",
      "Powdery mildew (Blumeria graminis)",
      "Loose smut (Ustilago tritici)"
    ],
    pests: [
      "Aphids",
      "Termites", 
      "Army worm",
      "Shoot fly"
    ],
    yield: "25-30 quintals per hectare",
    marketValue: "₹2000-2500 per quintal",
    nutritionalValue: {
      protein: "11-13%",
      carbohydrates: "70-75%",
      fiber: "2-3%",
      minerals: "Iron, Zinc, Manganese"
    }
  },

  rice: {
    name: "Rice", 
    category: "Cereal",
    scientificName: "Oryza sativa",
    growingSeason: {
      sowing: "June - July (Kharif), November - December (Rabi)",
      harvesting: "October - November (Kharif), March - April (Rabi)", 
      duration: "120-150 days",
      season: "Kharif (Monsoon) / Rabi (Winter)"
    },
    soilRequirement: {
      type: "Clay loam to silty clay",
      pH: "5.5 - 7.0", 
      depth: "Puddled field with 2-5 cm standing water",
      drainage: "Poor drainage preferred for flooded cultivation"
    },
    climateRequirement: {
      temperature: "20-35°C during growing period",
      rainfall: "100-200 cm annually",
      humidity: "80-90%",
      sunlight: "6-7 hours daily"
    },
    cultivation: {
      landPreparation: [
        "Plough field when moist",
        "Puddle the field thoroughly", 
        "Level the field for uniform water distribution",
        "Prepare bunds to retain water"
      ],
      sowing: [
        "Nursery preparation 25-30 days before transplanting",
        "Seed rate: 20-25 kg/hectare for transplanting",
        "Transplant 25-30 day old seedlings",
        "Plant spacing: 20x15 cm or 20x10 cm"
      ],
      irrigation: [
        "Maintain 2-5 cm standing water",
        "Drain field 10 days before harvest",
        "Alternate wetting and drying in water-scarce areas",
        "Ensure continuous water supply during flowering"
      ],
      fertilization: [
        "Nitrogen: 120 kg/hectare in 3 splits",
        "Phosphorus: 60 kg/hectare at transplanting",
        "Potassium: 40 kg/hectare in 2 splits", 
        "Zinc: 25 kg ZnSO4/hectare if deficient"
      ]
    },
    precautions: [
      "Maintain proper water level throughout growth",
      "Control weeds within 20-40 days of transplanting", 
      "Monitor for blast disease during humid conditions",
      "Protect from birds and rodents during grain filling",
      "Harvest at 80-85% grain maturity",
      "Dry grains to 14% moisture before storage"
    ],
    commonDiseases: [
      "Blast (Pyricularia oryzae)",
      "Bacterial leaf blight (Xanthomonas oryzae)",
      "Sheath blight (Rhizoctonia solani)",
      "Brown spot (Helminthosporium oryzae)"
    ],
    pests: [
      "Stem borer",
      "Brown plant hopper",
      "Leaf folder",
      "Rice hispa"
    ],
    yield: "40-60 quintals per hectare",
    marketValue: "₹1800-2200 per quintal",
    nutritionalValue: {
      protein: "6-8%",
      carbohydrates: "78-80%",
      fiber: "0.5-1%",
      minerals: "Iron, Thiamine, Niacin"
    }
  },

  cotton: {
    name: "Cotton",
    category: "Cash Crop/Fiber",
    scientificName: "Gossypium hirsutum",
    growingSeason: {
      sowing: "April - June",
      harvesting: "October - January (Multiple pickings)",
      duration: "180-200 days", 
      season: "Kharif (Monsoon)"
    },
    soilRequirement: {
      type: "Deep black cotton soil or well-drained loamy soil",
      pH: "5.8 - 8.0",
      depth: "Minimum 1 meter deep soil",
      drainage: "Good drainage essential"
    },
    climateRequirement: {
      temperature: "21-30°C during growing period",
      rainfall: "50-100 cm well distributed",
      humidity: "60-70%",
      sunlight: "7-8 hours daily"
    },
    cultivation: {
      landPreparation: [
        "Deep summer ploughing",
        "2-3 cross cultivations",
        "Form ridges and furrows",
        "Apply organic manure before sowing"
      ],
      sowing: [
        "Seed rate: 1.5-2 kg/hectare for Bt cotton",
        "Sowing depth: 2-3 cm",
        "Row spacing: 67.5 cm or 90 cm",
        "Plant to plant spacing: 30-45 cm"
      ],
      irrigation: [
        "First irrigation 3-4 weeks after sowing",
        "Subsequent irrigations at 15-20 day intervals",
        "Critical stages: flowering and boll development",
        "Avoid irrigation during picking period"
      ],
      fertilization: [
        "Nitrogen: 120-150 kg/hectare in splits",
        "Phosphorus: 60 kg/hectare at sowing",
        "Potassium: 60 kg/hectare in 2 splits",
        "Micronutrients: Zinc, Boron as per soil test"
      ]
    },
    precautions: [
      "Monitor for bollworm attack regularly",
      "Avoid excess nitrogen during flowering",
      "Maintain proper plant population",
      "Control weeds in first 60 days",
      "Pick cotton at proper maturity",
      "Store cotton in moisture-free conditions",
      "Follow refuge area guidelines for Bt cotton"
    ],
    commonDiseases: [
      "Fusarium wilt (Fusarium oxysporum)",
      "Verticillium wilt (Verticillium dahliae)", 
      "Bacterial blight (Xanthomonas campestris)",
      "Alternaria leaf spot (Alternaria macrospora)"
    ],
    pests: [
      "Bollworm complex",
      "Aphids",
      "Jassids", 
      "Thrips",
      "Whitefly"
    ],
    yield: "15-20 quintals per hectare",
    marketValue: "₹5000-6500 per quintal",
    nutritionalValue: {
      protein: "20-25% (cottonseed)",
      oil: "18-20% (cottonseed)",
      fiber: "High quality natural fiber",
      uses: "Textile, oil, cattle feed"
    }
  },

  sugarcane: {
    name: "Sugarcane",
    category: "Cash Crop/Sugar",
    scientificName: "Saccharum officinarum", 
    growingSeason: {
      sowing: "February - March (Spring), October - November (Autumn)",
      harvesting: "December - March (12-18 months after planting)",
      duration: "12-18 months",
      season: "Annual crop with long duration"
    },
    soilRequirement: {
      type: "Deep, well-drained loamy soil",
      pH: "6.0 - 7.5",
      depth: "Minimum 1.5 meters",
      drainage: "Good drainage with water retention capacity"
    },
    climateRequirement: {
      temperature: "20-26°C during growing, 12-14°C during ripening",
      rainfall: "75-150 cm well distributed",
      humidity: "80-85%",
      sunlight: "Bright sunshine during ripening"
    },
    cultivation: {
      landPreparation: [
        "Deep ploughing to 60 cm depth",
        "Form furrows 90-120 cm apart",
        "Apply organic manure in furrows",
        "Level the field properly"
      ],
      sowing: [
        "Seed rate: 40,000-50,000 three-budded setts/hectare",
        "Planting depth: 5-7 cm",
        "Row spacing: 90-120 cm",
        "End-to-end planting method preferred"
      ],
      irrigation: [
        "Light irrigation immediately after planting",
        "Regular irrigation at 7-10 day intervals",
        "Critical periods: tillering and grand growth",
        "Stop irrigation 2-3 weeks before harvest"
      ],
      fertilization: [
        "Nitrogen: 150-200 kg/hectare in 3-4 splits",
        "Phosphorus: 60-80 kg/hectare at planting",
        "Potassium: 60-80 kg/hectare in 2 splits",
        "Micronutrients: Iron, Zinc as per requirement"
      ]
    },
    precautions: [
      "Use disease-free healthy setts for planting",
      "Avoid waterlogging at any stage",
      "Control weeds in first 120 days",
      "Monitor for borer attack regularly",
      "Harvest at proper maturity (10-12 months)",
      "Transport to mill within 24 hours of cutting",
      "Maintain proper field sanitation"
    ],
    commonDiseases: [
      "Red rot (Colletotrichum falcatum)",
      "Smut (Sporisorium scitamineum)",
      "Wilt (Fusarium sacchari)",
      "Leaf scald (Xanthomonas albilineans)"
    ],
    pests: [
      "Early shoot borer",
      "Internode borer", 
      "Top borer",
      "Pyrilla",
      "Scale insects"
    ],
    yield: "80-120 tonnes per hectare",
    marketValue: "₹280-350 per quintal",
    nutritionalValue: {
      sucrose: "14-16%",
      fiber: "11-16%",
      water: "70-75%",
      uses: "Sugar, jaggery, ethanol, bagasse"
    }
  },

  maize: {
    name: "Maize/Corn",
    category: "Cereal",
    scientificName: "Zea mays",
    growingSeason: {
      sowing: "June - July (Kharif), November - December (Rabi)",
      harvesting: "September - October (Kharif), March - April (Rabi)",
      duration: "90-120 days",
      season: "Kharif (Monsoon) / Rabi (Winter)"
    },
    soilRequirement: {
      type: "Well-drained loamy to sandy loam soil",
      pH: "6.0 - 7.5",
      depth: "45-60 cm",
      drainage: "Good drainage essential"
    },
    climateRequirement: {
      temperature: "21-27°C during growing period",
      rainfall: "50-75 cm well distributed",
      humidity: "60-70%",
      sunlight: "6-8 hours daily"
    },
    cultivation: {
      landPreparation: [
        "One deep ploughing followed by 2-3 harrowings",
        "Level the field properly",
        "Apply farmyard manure before sowing",
        "Form ridges if required for drainage"
      ],
      sowing: [
        "Seed rate: 20-25 kg/hectare",
        "Sowing depth: 3-5 cm",
        "Row spacing: 60-75 cm",
        "Plant to plant spacing: 20-25 cm"
      ],
      irrigation: [
        "First irrigation 15-20 days after sowing",
        "Critical stages: knee-high, tasseling, grain filling",
        "Irrigation interval: 10-15 days",
        "Avoid water stress during flowering"
      ],
      fertilization: [
        "Nitrogen: 120 kg/hectare in 2-3 splits",
        "Phosphorus: 60 kg/hectare at sowing",
        "Potassium: 40 kg/hectare at sowing",
        "Zinc: 25 kg ZnSO4/hectare if deficient"
      ]
    },
    precautions: [
      "Protect from birds during grain filling",
      "Control weeds within 30-45 days",
      "Monitor for stem borer attack",
      "Avoid late sowing in kharif season",
      "Harvest at proper maturity (25-30% moisture)",
      "Dry grains to 14% moisture for storage",
      "Store in rodent-proof containers"
    ],
    commonDiseases: [
      "Maydis leaf blight (Bipolaris maydis)",
      "Common rust (Puccinia sorghi)",
      "Downy mildew (Peronosclerospora sorghi)",
      "Charcoal rot (Macrophomina phaseolina)"
    ],
    pests: [
      "Stem borer",
      "Fall armyworm",
      "Shoot fly",
      "Aphids"
    ],
    yield: "25-40 quintals per hectare",
    marketValue: "₹1400-1800 per quintal",
    nutritionalValue: {
      protein: "9-10%",
      carbohydrates: "70-75%",
      fat: "4-5%",
      minerals: "Phosphorus, Magnesium, Zinc"
    }
  }
};

// Pulse Crops
const pulseData = {
  chickpea: {
    name: "Chickpea/Gram",
    category: "Pulse",
    scientificName: "Cicer arietinum",
    growingSeason: {
      sowing: "October - November",
      harvesting: "March - April",
      duration: "120-150 days",
      season: "Rabi (Winter)"
    },
    soilRequirement: {
      type: "Well-drained loamy to clay loam soil",
      pH: "6.0 - 7.5",
      depth: "30-45 cm",
      drainage: "Good drainage essential"
    },
    climateRequirement: {
      temperature: "15-25°C during growing period",
      rainfall: "30-40 cm during crop season",
      humidity: "50-60%",
      sunlight: "6-7 hours daily"
    },
    cultivation: {
      landPreparation: [
        "One deep ploughing in summer",
        "2-3 cross cultivations",
        "Level the field properly",
        "Apply organic manure before sowing"
      ],
      sowing: [
        "Seed rate: 75-100 kg/hectare",
        "Sowing depth: 3-4 cm",
        "Row spacing: 30 cm",
        "Use seed drill for uniform sowing"
      ],
      irrigation: [
        "First irrigation at flowering stage",
        "Second irrigation at pod filling stage",
        "Avoid irrigation during maturity",
        "Light irrigation if required"
      ],
      fertilization: [
        "Nitrogen: 20-25 kg/hectare",
        "Phosphorus: 50-60 kg/hectare",
        "Potassium: 20 kg/hectare",
        "Rhizobium inoculation recommended"
      ]
    },
    precautions: [
      "Avoid excess moisture during flowering",
      "Control weeds within 30-40 days",
      "Monitor for pod borer attack",
      "Harvest at proper maturity",
      "Dry pods thoroughly before threshing",
      "Store grains at 8-10% moisture",
      "Use resistant varieties in wilt-prone areas"
    ],
    commonDiseases: [
      "Fusarium wilt (Fusarium oxysporum)",
      "Ascochyta blight (Ascochyta rabiei)",
      "Botrytis gray mold (Botrytis cinerea)",
      "Dry root rot (Rhizoctonia bataticola)"
    ],
    pests: [
      "Pod borer",
      "Aphids",
      "Thrips",
      "Cut worm"
    ],
    yield: "15-25 quintals per hectare",
    marketValue: "₹4500-6000 per quintal",
    nutritionalValue: {
      protein: "20-22%",
      carbohydrates: "60-65%",
      fiber: "3-4%",
      minerals: "Iron, Calcium, Phosphorus"
    }
  },

  pigeonpea: {
    name: "Pigeonpea/Arhar",
    category: "Pulse", 
    scientificName: "Cajanus cajan",
    growingSeason: {
      sowing: "June - July",
      harvesting: "December - February",
      duration: "150-200 days",
      season: "Kharif (Monsoon)"
    },
    soilRequirement: {
      type: "Well-drained loamy to sandy loam soil",
      pH: "6.0 - 7.5",
      depth: "60-90 cm (deep rooted)",
      drainage: "Good drainage essential"
    },
    climateRequirement: {
      temperature: "20-30°C during growing period",
      rainfall: "60-65 cm well distributed",
      humidity: "60-70%",
      sunlight: "6-8 hours daily"
    },
    cultivation: {
      landPreparation: [
        "Deep ploughing in summer",
        "2-3 cross harrowings",
        "Level the field",
        "Apply organic manure"
      ],
      sowing: [
        "Seed rate: 15-20 kg/hectare",
        "Sowing depth: 3-4 cm",
        "Row spacing: 45-60 cm",
        "Plant to plant spacing: 15-20 cm"
      ],
      irrigation: [
        "Generally rainfed crop",
        "Irrigation at flowering if required",
        "One irrigation at pod development",
        "Avoid excess moisture"
      ],
      fertilization: [
        "Nitrogen: 25 kg/hectare",
        "Phosphorus: 50 kg/hectare",
        "Potassium: 25 kg/hectare",
        "Rhizobium and PSB inoculation"
      ]
    },
    precautions: [
      "Use certified disease-free seeds",
      "Control weeds in first 60 days",
      "Monitor for pod fly and pod borer",
      "Avoid waterlogging",
      "Harvest pods when fully mature",
      "Dry pods before threshing",
      "Store in moisture-proof containers"
    ],
    commonDiseases: [
      "Fusarium wilt (Fusarium udum)",
      "Sterility mosaic virus",
      "Phytophthora blight (Phytophthora drechsleri)",
      "Alternaria blight (Alternaria tenuissima)"
    ],
    pests: [
      "Pod fly",
      "Pod borer",
      "Aphids",
      "Thrips"
    ],
    yield: "12-20 quintals per hectare",
    marketValue: "₹5500-7000 per quintal",
    nutritionalValue: {
      protein: "20-22%",
      carbohydrates: "57-60%",
      fiber: "8-10%",
      minerals: "Iron, Calcium, Phosphorus"
    }
  }
};

// Seasonal Vegetables
const vegetableData = {
  tomato: {
    name: "Tomato",
    category: "Vegetable",
    scientificName: "Solanum lycopersicum",
    growingSeason: {
      sowing: "June - July (Kharif), October - November (Rabi)",
      harvesting: "September - November (Kharif), January - March (Rabi)",
      duration: "90-120 days",
      season: "Kharif (Monsoon) / Rabi (Winter)"
    },
    soilRequirement: {
      type: "Well-drained loamy soil rich in organic matter",
      pH: "6.0 - 7.0",
      depth: "30-45 cm",
      drainage: "Good drainage essential"
    },
    climateRequirement: {
      temperature: "20-25°C during growing period",
      rainfall: "60-150 cm (with good drainage)",
      humidity: "60-70%",
      sunlight: "6-8 hours daily"
    },
    cultivation: {
      landPreparation: [
        "Deep ploughing and cross cultivation",
        "Prepare raised beds for good drainage",
        "Apply well-decomposed organic manure",
        "Form furrows for irrigation"
      ],
      sowing: [
        "Nursery sowing: 400-500g seeds/hectare",
        "Transplant 25-30 day old seedlings",
        "Row spacing: 60-75 cm",
        "Plant spacing: 45-60 cm"
      ],
      irrigation: [
        "Light irrigation after transplanting",
        "Regular irrigation at 5-7 day intervals",
        "Critical stages: flowering and fruit development",
        "Drip irrigation recommended"
      ],
      fertilization: [
        "Nitrogen: 100-120 kg/hectare in splits",
        "Phosphorus: 80-100 kg/hectare",
        "Potassium: 60-80 kg/hectare",
        "Micronutrients: Calcium, Boron"
      ]
    },
    precautions: [
      "Use disease-resistant varieties",
      "Provide support with stakes or cages",
      "Control weeds regularly",
      "Monitor for early and late blight",
      "Harvest fruits at proper maturity",
      "Handle fruits carefully to avoid damage",
      "Maintain field sanitation"
    ],
    commonDiseases: [
      "Early blight (Alternaria solani)",
      "Late blight (Phytophthora infestans)",
      "Bacterial wilt (Ralstonia solanacearum)",
      "Tomato leaf curl virus"
    ],
    pests: [
      "Fruit borer",
      "Whitefly",
      "Aphids",
      "Thrips"
    ],
    yield: "300-500 quintals per hectare",
    marketValue: "₹800-2000 per quintal (seasonal variation)",
    nutritionalValue: {
      vitamin_C: "High content",
      lycopene: "Antioxidant properties",
      water: "94%",
      minerals: "Potassium, Folate"
    }
  },

  onion: {
    name: "Onion",
    category: "Vegetable",
    scientificName: "Allium cepa",
    growingSeason: {
      sowing: "June - July (Kharif), November - December (Rabi)",
      harvesting: "October - November (Kharif), March - May (Rabi)",
      duration: "120-150 days",
      season: "Kharif (Monsoon) / Rabi (Winter)"
    },
    soilRequirement: {
      type: "Well-drained sandy loam to loamy soil",
      pH: "6.0 - 7.5",
      depth: "15-20 cm",
      drainage: "Excellent drainage required"
    },
    climateRequirement: {
      temperature: "15-25°C during bulb development",
      rainfall: "65-75 cm well distributed",
      humidity: "70% during growing, low during maturity",
      sunlight: "Long day length for bulb formation"
    },
    cultivation: {
      landPreparation: [
        "Fine tilth preparation",
        "Prepare raised beds 15 cm high",
        "Apply well-decomposed FYM",
        "Level the beds properly"
      ],
      sowing: [
        "Nursery: 8-10 kg seeds/hectare",
        "Transplant 45-50 day old seedlings",
        "Row spacing: 15 cm",
        "Plant spacing: 10 cm"
      ],
      irrigation: [
        "Light frequent irrigations",
        "Critical periods: transplanting, bulb initiation",
        "Stop irrigation 2-3 weeks before harvest",
        "Avoid waterlogging"
      ],
      fertilization: [
        "Nitrogen: 100 kg/hectare in 3 splits",
        "Phosphorus: 50 kg/hectare at transplanting",
        "Potassium: 50 kg/hectare",
        "Sulfur: 40 kg/hectare for better quality"
      ]
    },
    precautions: [
      "Use healthy, disease-free seedlings",
      "Avoid deep planting of seedlings",
      "Control weeds regularly",
      "Monitor for thrips and purple blotch",
      "Harvest when tops fall and dry",
      "Cure bulbs properly before storage",
      "Store in well-ventilated, dry place"
    ],
    commonDiseases: [
      "Purple blotch (Alternaria porri)",
      "Downy mildew (Peronospora destructor)",
      "Basal rot (Fusarium oxysporum)",
      "Black mold (Aspergillus niger)"
    ],
    pests: [
      "Thrips",
      "Onion maggot",
      "Cutworm",
      "Nematodes"
    ],
    yield: "200-400 quintals per hectare",
    marketValue: "₹1000-3000 per quintal (highly variable)",
    nutritionalValue: {
      sulfur_compounds: "Antimicrobial properties",
      quercetin: "Antioxidant",
      vitamin_C: "Moderate content",
      minerals: "Potassium, Phosphorus"
    }
  },

  potato: {
    name: "Potato",
    category: "Vegetable",
    scientificName: "Solanum tuberosum",
    growingSeason: {
      sowing: "October - November",
      harvesting: "January - March",
      duration: "90-120 days",
      season: "Rabi (Winter)"
    },
    soilRequirement: {
      type: "Well-drained sandy loam to loamy soil",
      pH: "5.5 - 6.5",
      depth: "25-30 cm",
      drainage: "Excellent drainage essential"
    },
    climateRequirement: {
      temperature: "15-20°C during tuber formation",
      rainfall: "50-70 cm well distributed",
      humidity: "80-90% during growing",
      sunlight: "Bright sunshine required"
    },
    cultivation: {
      landPreparation: [
        "Deep ploughing and fine tilth",
        "Prepare ridges 60 cm apart",
        "Apply organic manure in furrows",
        "Ensure good drainage"
      ],
      sowing: [
        "Seed rate: 25-30 quintals/hectare",
        "Planting depth: 5-7 cm",
        "Row spacing: 60 cm",
        "Tuber spacing: 20-25 cm"
      ],
      irrigation: [
        "Light irrigation after planting",
        "Regular irrigation at 7-10 day intervals",
        "Critical period: tuber initiation and bulking",
        "Stop irrigation 10 days before harvest"
      ],
      fertilization: [
        "Nitrogen: 120 kg/hectare in 2-3 splits",
        "Phosphorus: 80 kg/hectare at planting",
        "Potassium: 100 kg/hectare",
        "Organic manure: 20-25 tonnes/hectare"
      ]
    },
    precautions: [
      "Use certified disease-free seed tubers",
      "Avoid green tubers for planting",
      "Earth up plants regularly",
      "Control weeds in first 60 days",
      "Monitor for late blight disease",
      "Harvest in dry weather",
      "Store tubers in dark, cool place"
    ],
    commonDiseases: [
      "Late blight (Phytophthora infestans)",
      "Early blight (Alternaria solani)",
      "Black scurf (Rhizoctonia solani)",
      "Common scab (Streptomyces scabies)"
    ],
    pests: [
      "Potato tuber moth",
      "Aphids",
      "Cutworm",
      "Wireworm"
    ],
    yield: "200-350 quintals per hectare",
    marketValue: "₹800-1500 per quintal",
    nutritionalValue: {
      carbohydrates: "15-20%",
      protein: "2%",
      vitamin_C: "High content",
      minerals: "Potassium, Iron, Magnesium"
    }
  }
};

// Export the complete crop data structure
const completecropData = {
  ...cropData,
  ...pulseData,
  ...vegetableData
};

// Helper functions for data access
const getCropsByCategory = (category) => {
  return Object.values(completecropData).filter(crop => crop.category === category);
};

const getCropsBySeason = (season) => {
  return Object.values(completecropData).filter(crop => 
    crop.growingSeason.season.includes(season)
  );
};

const getCropsByMonth = (month) => {
  return Object.values(completecropData).filter(crop => 
    crop.growingSeason.sowing.includes(month) || 
    crop.growingSeason.harvesting.includes(month)
  );
};

// Export for use in knowledge base
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    completecropData,
    getCropsByCategory,
    getCropsBySeason,
    getCropsByMonth
  };
}