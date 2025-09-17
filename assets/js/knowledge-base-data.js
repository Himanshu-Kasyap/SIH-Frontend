// Comprehensive Knowledge Base Data Structure
// Contains detailed agricultural information for crops, soil, fertilizers, machines, and schemes

const knowledgeBaseData = {
    Crops: [
        {
            name: "Wheat",
            category: "Cereal",
            summary: "Winter cereal crop requiring well-drained loamy soil with pH 6.0-7.5",
            growingSeason: "November - December (Sowing), March - April (Harvesting)",
            soilRequirement: "Well-drained loamy soil, pH 6.0-7.5, 15-20 cm depth",
            cultivation: [
                "Deep ploughing in summer with 2-3 cross cultivations",
                "Seed rate: 100-125 kg/hectare, sowing depth: 3-5 cm",
                "Four irrigations: 20-25 days after sowing, tillering, flowering, grain filling",
                "Fertilization: N:120, P:60, K:40 kg/hectare"
            ],
            precautions: [
                "Avoid waterlogging during any growth stage",
                "Monitor for rust diseases regularly", 
                "Control weeds within 30-40 days of sowing",
                "Protect from birds during grain filling",
                "Harvest at proper maturity to avoid shattering",
                "Store grains at 12% moisture content"
            ],
            yield: "25-30 quintals per hectare",
            marketValue: "₹2000-2500 per quintal"
        }
    ],

    Soil: [
        {
            name: "Alluvial Soil",
            type: "Sedimentary",
            summary: "Most fertile soil formed by river deposits, covering 40% of India's agricultural land",
            identification: {
                color: "Light grey to ash grey, sometimes yellowish",
                texture: "Fine to coarse, well-structured with good porosity",
                structure: "Granular to crumbly, varies from sandy to clayey",
                location: "River valleys, deltas, and flood plains"
            },
            properties: {
                pH: "6.0-7.5 (slightly acidic to neutral)",
                fertility: "High in potash, moderate in phosphorus, rich in organic matter",
                drainageCapacity: "Good to moderate drainage depending on clay content",
                waterRetention: "Moderate to high water holding capacity",
                nutrients: "Rich in nitrogen and potash, deficient in phosphorus and organic matter"
            },
            suitableCrops: [
                "Rice (in clayey alluvial areas)",
                "Wheat (in well-drained areas)", 
                "Sugarcane (in fertile river valleys)",
                "Cotton (in black alluvial soils)",
                "Maize and other cereals",
                "Pulses and oilseeds",
                "Vegetables and fruits"
            ],
            testingMethods: [
                "Soil texture analysis using jar test method",
                "pH testing using digital pH meter or indicator strips",
                "Organic carbon estimation by Walkley-Black method",
                "Available nitrogen testing by alkaline permanganate method",
                "Phosphorus testing by Olsen's method",
                "Potassium testing by flame photometer method"
            ],
            improvements: [
                "Add organic manure to increase organic matter content",
                "Apply phosphatic fertilizers to correct phosphorus deficiency",
                "Use green manuring with leguminous crops",
                "Practice crop rotation to maintain soil health",
                "Implement proper drainage in waterlogged areas",
                "Apply lime in acidic alluvial soils to adjust pH"
            ],
            distribution: "Ganga-Brahmaputra plains, coastal areas of peninsular India, river valleys"
        }
    ],

    Fertilizers: [
        {
            name: "Farmyard Manure (FYM)",
            type: "Organic",
            category: "Animal-based Organic Fertilizer",
            summary: "Well-decomposed mixture of animal dung, urine, litter, and fodder waste",
            composition: "Nitrogen: 0.5-1.5%, Phosphorus: 0.4-0.8%, Potassium: 0.5-1.2%, Organic matter: 15-25%",
            benefits: [
                "Improves soil structure and water holding capacity",
                "Increases organic matter content and soil fertility",
                "Enhances beneficial microbial activity in soil",
                "Provides slow-release nutrients over extended period"
            ],
            drawbacks: [
                "Lower nutrient concentration compared to chemical fertilizers",
                "Bulky and requires large quantities for application",
                "May contain weed seeds if not properly composted"
            ],
            applicationMethod: [
                "Apply 10-15 tons per hectare for field crops",
                "Spread uniformly and incorporate into soil before sowing"
            ],
            timing: [
                "Best applied during land preparation (2-3 weeks before sowing)",
                "Can be applied during monsoon for better decomposition"
            ],
            dosage: {
                cereals: "8-12 tons per hectare",
                pulses: "6-8 tons per hectare",
                vegetables: "15-20 tons per hectare"
            },
            safetyPrecautions: [
                "Use well-decomposed manure to avoid crop damage",
                "Wear gloves and protective clothing during handling"
            ],
            compatibility: [
                "Compatible with all chemical fertilizers",
                "Can be mixed with biofertilizers"
            ],
            cost: "₹2-4 per kg (varies by location and quality)"
        }
    ],    Mac
hines: [
        {
            name: "Tractor",
            category: "Power Unit",
            summary: "Multi-purpose agricultural power unit for various farming operations",
            uses: [
                "Primary tillage operations (ploughing, cultivating)",
                "Secondary tillage and land preparation",
                "Sowing and planting operations",
                "Inter-cultivation and weeding",
                "Harvesting and threshing operations",
                "Transportation of farm produce and materials",
                "Operating various implements and attachments",
                "Irrigation and water pumping operations"
            ],
            specifications: {
                powerRange: "15-100+ HP (horsepower)",
                fuelType: "Diesel (most common), Electric (emerging)",
                transmission: "Manual, Semi-automatic, Automatic",
                driveType: "2WD (Two-wheel drive), 4WD (Four-wheel drive)",
                ptoSpeed: "540 RPM, 1000 RPM (Power Take-Off)",
                liftingCapacity: "500-3000 kg (hydraulic lift)",
                fuelConsumption: "3-8 liters per hour (depending on HP and load)",
                operatingSpeed: "2-25 km/hr (depending on operation)"
            },
            operatingProcedure: [
                "Pre-operation inspection: Check engine oil, coolant, hydraulic fluid levels",
                "Inspect tires, brakes, and steering system",
                "Start engine and warm up for 5-10 minutes",
                "Adjust seat, mirrors, and controls for operator comfort",
                "Attach appropriate implement and check connections",
                "Set proper engine RPM and gear for the operation",
                "Maintain steady speed and avoid sudden direction changes",
                "Monitor engine temperature and oil pressure during operation"
            ],
            maintenance: [
                "Daily: Check engine oil, coolant, and fuel levels",
                "Weekly: Inspect air filter, battery, and tire pressure",
                "Every 50 hours: Change engine oil and oil filter",
                "Every 100 hours: Service air filter and fuel filter",
                "Every 250 hours: Check hydraulic system and transmission oil",
                "Every 500 hours: Major service including valve adjustment",
                "Seasonal: Grease all lubrication points and check belts",
                "Annual: Complete overhaul and safety inspection"
            ],
            safetyPrecautions: [
                "Always use seat belt and ROPS (Roll-Over Protection Structure)",
                "Never operate on slopes exceeding manufacturer's recommendations",
                "Keep hands and feet away from moving parts",
                "Engage parking brake when stopped or parked",
                "Never allow extra riders on tractor",
                "Use proper lighting and reflectors for road travel",
                "Maintain safe distance from overhead power lines",
                "Shut off engine before servicing or adjusting implements"
            ],
            cost: {
                purchase: "₹3-15 lakhs (new), ₹1-8 lakhs (used)",
                rental: "₹800-2000 per day",
                maintenance: "₹15,000-50,000 per year",
                fuelCost: "₹300-800 per day (8-hour operation)"
            },
            suitableFor: [
                "Small farms: 15-35 HP tractors",
                "Medium farms: 35-60 HP tractors", 
                "Large farms: 60+ HP tractors",
                "Orchard operations: Narrow, low-profile tractors",
                "Rice cultivation: High-clearance, puddling tractors"
            ],
            operationalGuidelines: [
                "Match tractor HP to implement requirements",
                "Maintain proper ballasting for stability",
                "Use appropriate tire pressure for soil conditions",
                "Plan field operations to minimize soil compaction",
                "Keep detailed maintenance and operation records"
            ]
        },
        {
            name: "Combine Harvester",
            category: "Harvesting Equipment",
            summary: "Self-propelled machine that combines cutting, threshing, and cleaning operations",
            uses: [
                "Harvesting cereal crops (wheat, rice, barley, oats)",
                "Cutting and collecting crop stems",
                "Threshing grains from crop heads",
                "Cleaning and separating grain from chaff",
                "Collecting clean grain in onboard tank",
                "Spreading or collecting straw residue",
                "Some models adapted for pulse and oilseed harvesting"
            ],
            specifications: {
                enginePower: "100-400 HP",
                cuttingWidth: "3-12 meters",
                grainTankCapacity: "4000-15000 liters",
                threshingSystem: "Conventional, Axial flow, Hybrid",
                groundSpeed: "3-8 km/hr (harvesting), up to 25 km/hr (transport)",
                fuelConsumption: "15-35 liters per hour",
                cleaningSystem: "Multi-stage sieve and fan system",
                unloadingRate: "60-150 liters per second"
            },
            operatingProcedure: [
                "Pre-harvest inspection: Check all systems and fluid levels",
                "Calibrate settings for specific crop and conditions",
                "Adjust cutting height according to crop and field conditions",
                "Set appropriate ground speed for crop density and moisture",
                "Monitor grain quality and adjust cleaning system",
                "Empty grain tank when 80% full to prevent overflow",
                "Adjust concave clearance and fan speed as needed",
                "Clean machine thoroughly after each field or crop type"
            ],
            maintenance: [
                "Daily: Clean air filters, check belts and chains",
                "Daily: Inspect cutting blades and guards",
                "Weekly: Grease all lubrication points",
                "Every 50 hours: Change engine oil and hydraulic filters",
                "Every 100 hours: Inspect and adjust drive belts",
                "Seasonal: Replace worn cutting blades and concave bars",
                "Annual: Complete overhaul of threshing and cleaning systems",
                "Post-season: Thorough cleaning and proper storage preparation"
            ],
            safetyPrecautions: [
                "Never operate with guards or shields removed",
                "Keep all personnel away from machine during operation",
                "Use lockout procedures when servicing or clearing blockages",
                "Maintain proper fire extinguisher and first aid kit",
                "Avoid harvesting in extremely dry conditions (fire risk)",
                "Use proper lighting and warning devices for road transport",
                "Never enter grain tank without proper safety procedures",
                "Shut down all systems before leaving operator's seat"
            ],
            cost: {
                purchase: "₹25-80 lakhs (new), ₹10-40 lakhs (used)",
                rental: "₹3000-8000 per day",
                customHiring: "₹2500-4000 per hectare",
                maintenance: "₹1-3 lakhs per year",
                fuelCost: "₹2000-4000 per day"
            },
            suitableFor: [
                "Large-scale cereal farming (>20 hectares)",
                "Custom harvesting operations",
                "Cooperative farming ventures",
                "Commercial grain production",
                "Time-sensitive harvesting operations"
            ],
            operationalGuidelines: [
                "Harvest at optimal grain moisture content (12-18%)",
                "Adjust machine settings for each field and crop variety",
                "Maintain consistent ground speed for uniform threshing",
                "Monitor grain loss and adjust accordingly",
                "Plan harvesting sequence to minimize weather risks"
            ]
        },
        {
            name: "Plough",
            category: "Tillage Equipment",
            summary: "Primary tillage implement for breaking, turning, and inverting soil",
            uses: [
                "Primary tillage and soil breaking",
                "Turning and inverting soil layers",
                "Burying crop residues and weeds",
                "Breaking hardpan and compacted layers",
                "Preparing seedbed for crop establishment",
                "Incorporating organic matter into soil",
                "Creating furrows for drainage",
                "Land shaping and leveling operations"
            ],
            specifications: {
                types: "Moldboard, Disc, Chisel, Reversible",
                workingWidth: "1-5 meters (depending on number of furrows)",
                workingDepth: "15-35 cm",
                powerRequirement: "25-40 HP per furrow",
                furrowWidth: "25-40 cm per bottom",
                weight: "200-1500 kg",
                numberOfBottoms: "2-8 furrows",
                attachmentType: "3-point hitch, Trailed"
            },
            operatingProcedure: [
                "Inspect plough for damaged or worn parts",
                "Adjust working depth according to soil conditions",
                "Set proper furrow width and overlap",
                "Maintain consistent tractor speed (4-8 km/hr)",
                "Ensure complete soil inversion and residue burial",
                "Adjust plough level for uniform depth",
                "Monitor soil conditions and adjust as needed",
                "Clean plough bottoms if soil sticking occurs"
            ],
            maintenance: [
                "Daily: Clean soil buildup from plough bottoms",
                "Weekly: Check and tighten all bolts and connections",
                "Inspect ploughshares and moldboards for wear",
                "Lubricate all grease points regularly",
                "Replace worn ploughshares when cutting edge is rounded",
                "Check and adjust plough level and alignment",
                "Store in dry place to prevent rust and corrosion",
                "Seasonal sharpening of ploughshares and coulters"
            ],
            safetyPrecautions: [
                "Ensure all personnel are clear before starting operation",
                "Use proper hitching procedures and safety chains",
                "Never operate plough in transport position",
                "Avoid ploughing on steep slopes or wet conditions",
                "Keep hands and feet away from moving parts",
                "Use proper lighting and marking for road transport",
                "Engage hydraulic lock when working on raised plough",
                "Check for underground utilities before deep ploughing"
            ],
            cost: {
                purchase: "₹50,000-3 lakhs (depending on size and type)",
                rental: "₹500-1500 per day",
                customWork: "₹1500-2500 per hectare",
                maintenance: "₹5,000-15,000 per year",
                shareCost: "₹500-1500 per set (replacement)"
            },
            suitableFor: [
                "Heavy clay soils requiring deep tillage",
                "Fields with heavy crop residue",
                "Primary tillage in conventional farming",
                "Breaking new land or grassland",
                "Incorporating organic amendments"
            ],
            operationalGuidelines: [
                "Plough when soil is at proper moisture content",
                "Maintain uniform depth and speed",
                "Overlap furrows by 5-10 cm for complete coverage",
                "Follow contour lines on sloping land",
                "Allow adequate time between ploughing and next operation"
            ]
        },
        {
            name: "Seed Drill",
            category: "Sowing Equipment", 
            summary: "Precision seeding machine for accurate seed placement and spacing",
            uses: [
                "Precise seed placement at uniform depth",
                "Maintaining proper seed spacing and population",
                "Simultaneous fertilizer application with seeds",
                "Creating uniform seed furrows",
                "Covering seeds with soil after placement",
                "Reducing seed wastage through accurate metering",
                "Enabling mechanized sowing operations",
                "Improving crop establishment and uniformity"
            ],
            specifications: {
                types: "Conventional drill, Pneumatic drill, No-till drill",
                workingWidth: "2-12 meters",
                numberOfRows: "7-48 rows",
                rowSpacing: "15-30 cm (adjustable)",
                seedingDepth: "1-8 cm (adjustable)",
                seedBoxCapacity: "50-500 kg",
                fertilizerBoxCapacity: "100-800 kg",
                powerRequirement: "35-100 HP"
            },
            operatingProcedure: [
                "Calibrate seed metering system for desired seeding rate",
                "Fill seed and fertilizer boxes to appropriate levels",
                "Adjust seeding depth according to crop requirements",
                "Set proper row spacing and seed placement",
                "Check and adjust fertilizer application rate",
                "Maintain consistent forward speed (5-8 km/hr)",
                "Monitor seed flow and depth during operation",
                "Empty and clean boxes after each use"
            ],
            maintenance: [
                "Daily: Clean seed and fertilizer metering systems",
                "Check for blocked or damaged seed tubes",
                "Lubricate all moving parts and bearings",
                "Inspect and replace worn metering wheels",
                "Check calibration accuracy regularly",
                "Clean and store in dry location",
                "Replace damaged or worn opener discs",
                "Seasonal overhaul of metering mechanisms"
            ],
            safetyPrecautions: [
                "Keep hands away from metering mechanisms during operation",
                "Use proper lifting techniques when filling seed boxes",
                "Ensure all guards and shields are in place",
                "Lock hydraulic systems when servicing raised drill",
                "Use appropriate personal protective equipment",
                "Keep children and unauthorized personnel away",
                "Follow proper procedures for clearing blockages",
                "Use caution when handling treated seeds"
            ],
            cost: {
                purchase: "₹1-8 lakhs (depending on size and features)",
                rental: "₹800-2000 per day",
                customWork: "₹1000-2000 per hectare",
                maintenance: "₹8,000-25,000 per year",
                calibrationKit: "₹2,000-5,000"
            },
            suitableFor: [
                "Cereal crops (wheat, rice, barley)",
                "Pulse crops (chickpea, lentil, pea)",
                "Oilseed crops (mustard, sunflower)",
                "Forage crops and pasture establishment",
                "Conservation tillage systems"
            ],
            operationalGuidelines: [
                "Calibrate for each crop type and variety",
                "Maintain proper soil moisture for sowing",
                "Ensure uniform field preparation before sowing",
                "Monitor emergence and adjust practices accordingly",
                "Keep detailed records of seeding rates and performance"
            ]
        },
        {
            name: "Sprayer",
            category: "Plant Protection Equipment",
            summary: "Equipment for applying liquid pesticides, herbicides, and nutrients to crops",
            uses: [
                "Application of pesticides for pest control",
                "Herbicide application for weed management",
                "Fungicide application for disease control",
                "Foliar fertilizer and nutrient application",
                "Growth regulator and hormone application",
                "Defoliant application before harvest",
                "Disinfectant application in livestock areas",
                "Water application for dust suppression"
            ],
            specifications: {
                types: "Knapsack, Tractor-mounted, Self-propelled, Aerial",
                tankCapacity: "16 liters (knapsack) to 3000+ liters (field sprayers)",
                pumpType: "Manual, Electric, Hydraulic, PTO-driven",
                pressure: "1-40 bar (depending on application)",
                boomWidth: "6-36 meters (field sprayers)",
                nozzleTypes: "Flat fan, Cone, Flood, Air induction",
                flowRate: "0.5-200 liters per minute",
                powerRequirement: "25-150 HP (tractor-mounted)"
            ],
            operatingProcedure: [
                "Read and follow chemical label instructions carefully",
                "Calibrate sprayer for proper application rate",
                "Fill tank with clean water first, then add chemicals",
                "Wear appropriate personal protective equipment",
                "Check nozzles for proper spray pattern and flow",
                "Maintain consistent speed and pressure during application",
                "Avoid spraying during windy conditions (>10 km/hr wind)",
                "Clean sprayer thoroughly after each use"
            ],
            maintenance: [
                "Daily: Clean nozzles and filters after each use",
                "Check pump pressure and flow rate regularly",
                "Inspect hoses and connections for leaks",
                "Lubricate pump and moving parts as specified",
                "Replace worn or damaged nozzles promptly",
                "Clean tank and entire system with appropriate cleaners",
                "Store with antifreeze in cold climates",
                "Annual calibration and pressure testing"
            ],
            safetyPrecautions: [
                "Always wear complete personal protective equipment",
                "Never eat, drink, or smoke while handling chemicals",
                "Avoid spraying in windy or rainy conditions",
                "Keep children and animals away from treated areas",
                "Properly dispose of empty chemical containers",
                "Have emergency shower and eyewash facilities available",
                "Follow re-entry intervals for treated fields",
                "Store chemicals in locked, ventilated areas"
            ],
            cost: {
                purchase: "₹5,000 (knapsack) to ₹5 lakhs (field sprayer)",
                rental: "₹300-1500 per day",
                customWork: "₹500-1500 per hectare",
                maintenance: "₹3,000-20,000 per year",
                nozzleReplacement: "₹100-500 per nozzle"
            },
            suitableFor: [
                "Small farms: Knapsack and battery sprayers",
                "Medium farms: Tractor-mounted boom sprayers",
                "Large farms: Self-propelled high-clearance sprayers",
                "Orchards: Air-blast and mist sprayers",
                "Precision agriculture: GPS-guided variable rate sprayers"
            ],
            operationalGuidelines: [
                "Calibrate sprayer before each season and chemical change",
                "Maintain proper spray pressure for nozzle type",
                "Apply chemicals at recommended growth stages",
                "Keep detailed records of all applications",
                "Follow integrated pest management principles"
            ]
        },
        {
            name: "Thresher",
            category: "Post-Harvest Equipment",
            summary: "Machine for separating grains from harvested crop stalks and heads",
            uses: [
                "Separating grains from crop stalks",
                "Threshing wheat, rice, and other cereals",
                "Processing pulse crops (chickpea, lentil)",
                "Cleaning and winnowing grains",
                "Reducing manual labor in post-harvest operations",
                "Improving grain quality and cleanliness",
                "Processing small quantities on individual farms",
                "Custom threshing services for multiple farmers"
            ],
            specifications: {
                types: "Pedal operated, Power operated, Multi-crop",
                capacity: "200-2000 kg per hour",
                powerRequirement: "5-25 HP (electric or diesel engine)",
                drumDiameter: "40-80 cm",
                drumLength: "60-150 cm",
                concaveClearance: "8-25 mm (adjustable)",
                fanSpeed: "400-800 RPM",
                overallDimensions: "2-4 meters length"
            },
            operatingProcedure: [
                "Check and adjust concave clearance for crop type",
                "Ensure proper fan speed for cleaning",
                "Feed crop material at steady, uniform rate",
                "Monitor grain quality and adjust settings",
                "Keep feeding chamber clear of blockages",
                "Collect clean grain and separate straw",
                "Adjust fan speed to minimize grain loss",
                "Clean machine thoroughly after each batch"
            ],
            maintenance: [
                "Daily: Clean grain and chaff from all areas",
                "Check belt tension and condition",
                "Lubricate all bearings and moving parts",
                "Inspect concave bars and drum teeth for wear",
                "Check fan blades for damage or imbalance",
                "Tighten all bolts and connections",
                "Replace worn concave bars and drum teeth",
                "Store in dry, covered area"
            ],
            safetyPrecautions: [
                "Never operate without proper guards in place",
                "Keep hands and loose clothing away from moving parts",
                "Shut off power before clearing blockages",
                "Use proper lifting techniques when feeding material",
                "Ensure adequate ventilation to prevent dust accumulation",
                "Keep fire extinguisher nearby due to dust and chaff",
                "Train operators on safe operating procedures",
                "Use lockout procedures during maintenance"
            ],
            cost: {
                purchase: "₹25,000-1.5 lakhs",
                rental: "₹500-1200 per day",
                customWork: "₹150-400 per quintal",
                maintenance: "₹3,000-10,000 per year",
                concaveReplacement: "₹2,000-8,000"
            },
            suitableFor: [
                "Small to medium-scale farming operations",
                "Custom threshing service providers",
                "Cooperative farming groups",
                "Areas where combine harvesters are not feasible",
                "Processing of diverse crop types"
            ],
            operationalGuidelines: [
                "Adjust settings for each crop type and variety",
                "Maintain proper moisture content in crop material",
                "Feed material at consistent rate to avoid overloading",
                "Monitor grain damage and adjust accordingly",
                "Keep detailed records of throughput and efficiency"
            ]
        }
    ],

    "Types of Schemes": [
        {
            name: "Central Government Schemes",
            type: "Central Schemes",
            category: "National Programs",
            summary: "Nationwide agricultural schemes implemented by the Government of India for farmer welfare and agricultural development",
            description: "Central government schemes are implemented uniformly across all states and union territories. These schemes are funded by the central government and aim to address national agricultural priorities, modernize farming practices, and improve farmer incomes.",
            keyFeatures: [
                "Uniform implementation across all states",
                "Central government funding and oversight",
                "National-level policy objectives",
                "Standardized eligibility criteria",
                "Direct benefit transfer mechanisms"
            ],
            eligibility: [
                "Indian citizenship required",
                "Valid Aadhaar card mandatory",
                "Bank account linked with Aadhaar",
                "Agricultural land ownership or tenancy proof",
                "Income criteria as specified per scheme"
            ],
            applicationProcess: [
                "Visit official government portals (PM-KISAN, DBT Agriculture)",
                "Register with Aadhaar and bank account details",
                "Upload required documents (land records, identity proof)",
                "Submit application through Common Service Centers (CSCs)",
                "Track application status online",
                "Receive benefits through Direct Benefit Transfer (DBT)"
            ],
            requiredDocuments: [
                "Aadhaar card",
                "Bank account passbook",
                "Land ownership documents (Khata/Khatauni)",
                "Income certificate",
                "Caste certificate (if applicable)",
                "Mobile number for SMS updates"
            ],
            popularSchemes: [
                "PM-KISAN (₹6000 annual income support)",
                "Pradhan Mantri Fasal Bima Yojana (crop insurance)",
                "Soil Health Card Scheme",
                "Pradhan Mantri Krishi Sinchai Yojana (irrigation)",
                "National Agriculture Market (e-NAM)",
                "Kisan Credit Card (KCC) scheme"
            ],
            benefits: "Direct financial assistance, risk mitigation, technology access, market linkages",
            contactInfo: "Toll-free: 14434 (PM-KISAN), Website: pmkisan.gov.in, Local agriculture offices"
        },
        {
            name: "State Government Schemes",
            type: "State Schemes",
            category: "Regional Programs",
            summary: "State-specific agricultural schemes designed to address local farming conditions and regional priorities",
            description: "State government schemes are tailored to address specific agricultural challenges and opportunities within individual states. These schemes complement central programs and focus on local crop patterns, soil conditions, and farmer needs.",
            keyFeatures: [
                "State-specific implementation and funding",
                "Addresses regional agricultural challenges",
                "Complements central government schemes",
                "Flexible eligibility criteria based on local conditions",
                "Integration with state agricultural policies"
            ],
            eligibility: [
                "Resident of the respective state",
                "Valid state domicile certificate",
                "Agricultural land within state boundaries",
                "Registration with state agriculture department",
                "Compliance with state-specific income limits"
            ],
            applicationProcess: [
                "Visit state agriculture department websites",
                "Register at district collector or agriculture officer offices",
                "Submit applications through state portals",
                "Verification by local agriculture extension officers",
                "Approval by district-level committees",
                "Benefit disbursement through state mechanisms"
            ],
            requiredDocuments: [
                "State domicile certificate",
                "Land revenue records (state-specific formats)",
                "Identity proof (Aadhaar/Voter ID)",
                "Bank account in state cooperative banks",
                "Crop cultivation certificates",
                "Previous scheme benefit records"
            ],
            popularSchemes: [
                "Maharashtra: Jalyukt Shivar Abhiyan (water conservation)",
                "Punjab: Crop Diversification Program",
                "Karnataka: Raitha Sampada Yojana",
                "Tamil Nadu: Uzhavar Sandhai (farmer markets)",
                "Rajasthan: Mukhyamantri Kisan Mitra Urja Yojana",
                "Uttar Pradesh: Kisan Kalyan Mission"
            ],
            benefits: "Customized support, local crop promotion, water management, market access, input subsidies",
            contactInfo: "State agriculture departments, District collectors, Local agriculture extension officers"
        },
        {
            name: "Agricultural Subsidies",
            type: "Subsidies",
            category: "Input Support Programs",
            summary: "Financial assistance programs to reduce the cost of agricultural inputs and farming operations",
            description: "Agricultural subsidies are government financial support mechanisms that reduce the cost of essential farming inputs like seeds, fertilizers, machinery, and irrigation. These programs aim to make farming more affordable and profitable for farmers.",
            keyFeatures: [
                "Direct cost reduction on agricultural inputs",
                "Both central and state government funding",
                "Targeted support for specific inputs or operations",
                "Seasonal and crop-specific subsidies available",
                "Digital payment and tracking systems"
            ],
            eligibility: [
                "Registered farmer with valid land records",
                "Aadhaar-linked bank account",
                "Previous season cultivation proof",
                "Compliance with subsidy scheme guidelines",
                "No defaulter status in previous schemes"
            ],
            applicationProcess: [
                "Register on DBT Agriculture portal",
                "Select required subsidy category",
                "Upload cultivation and land documents",
                "Choose authorized dealers/suppliers",
                "Purchase inputs and claim subsidy",
                "Receive subsidy amount in bank account"
            ],
            requiredDocuments: [
                "Farmer registration number",
                "Land ownership/tenancy documents",
                "Aadhaar card and bank passbook",
                "Previous season crop details",
                "Purchase receipts from authorized dealers",
                "Soil health card (for fertilizer subsidies)"
            ],
            popularSchemes: [
                "Fertilizer Subsidy (50-80% cost reduction)",
                "Seed Subsidy (25-50% on certified seeds)",
                "Agricultural Machinery Subsidy (20-50%)",
                "Drip Irrigation Subsidy (up to 55%)",
                "Solar Pump Subsidy (30-70%)",
                "Organic Farming Input Subsidy"
            ],
            benefits: "Reduced input costs, improved access to quality inputs, technology adoption, increased profitability",
            contactInfo: "DBT Agriculture portal, Local input dealers, Agriculture extension officers, Krishi Vigyan Kendras"
        },
        {
            name: "Farmer Loan Schemes",
            type: "Credit Programs",
            category: "Financial Support",
            summary: "Institutional credit programs providing affordable loans for agricultural activities and farmer welfare",
            description: "Farmer loan schemes provide institutional credit at subsidized interest rates for various agricultural activities including crop production, livestock, farm mechanization, and infrastructure development. These programs aim to reduce farmer dependence on informal credit sources.",
            keyFeatures: [
                "Subsidized interest rates (4-7% annually)",
                "Collateral-free loans up to certain limits",
                "Flexible repayment schedules aligned with crop cycles",
                "Insurance coverage for loans",
                "Digital application and processing systems"
            ],
            eligibility: [
                "Active farmer with valid KCC or land records",
                "Good credit history and no loan defaults",
                "Age between 18-65 years",
                "Aadhaar-linked bank account",
                "Crop insurance enrollment (for crop loans)"
            ],
            applicationProcess: [
                "Visit nearest bank branch or apply online",
                "Submit KCC application with required documents",
                "Bank verification of land records and credit history",
                "Loan sanction based on land holding and crop plan",
                "Disbursement in installments as per crop calendar",
                "Repayment after harvest with interest subsidy benefits"
            ],
            requiredDocuments: [
                "Kisan Credit Card (KCC) application",
                "Land ownership documents (Patta/Khatauni)",
                "Identity and address proof",
                "Bank account statements",
                "Crop plan and cultivation details",
                "Income certificate and guarantor documents"
            ],
            popularSchemes: [
                "Kisan Credit Card (KCC) - up to ₹3 lakh at 4% interest",
                "PM-KISAN Credit Card - enhanced credit limits",
                "Self Help Group (SHG) loans for women farmers",
                "Joint Liability Group (JLG) loans for tenant farmers",
                "Livestock loans for dairy and poultry",
                "Farm mechanization loans with subsidy"
            ],
            benefits: "Low interest rates, timely credit access, crop insurance coverage, flexible repayment, financial inclusion",
            contactInfo: "Nationalized banks, Regional rural banks, Cooperative banks, NABARD offices, Bank Mitras"
        }
    ]
};

// Export the data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = knowledgeBaseData;
}