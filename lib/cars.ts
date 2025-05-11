import type { Car } from "./types"

// Mock data for cars
const mockCars: Car[] = [
  {
    _id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    price: 28500,
    mileage: 15000,
    color: "Silver",
    vin: "1HGCM82633A123456",
    transmission: "Automatic",
    fuelType: "Gasoline",
    bodyStyle: "Sedan",
    description:
      "This Toyota Camry is in excellent condition with low mileage. It features a fuel-efficient engine, comfortable interior, and comes loaded with modern technology including a touchscreen infotainment system, backup camera, and advanced safety features.",
    images: [
      "/placeholder.svg?height=400&width=600&text=Toyota Camry",
      "/placeholder.svg?height=400&width=600&text=Interior",
      "/placeholder.svg?height=400&width=600&text=Rear View",
      "/placeholder.svg?height=400&width=600&text=Dashboard",
    ],
    featured: true,
    features: [
      "Bluetooth",
      "Backup Camera",
      "Lane Departure Warning",
      "Adaptive Cruise Control",
      "Apple CarPlay",
      "Android Auto",
      "Keyless Entry",
      "Push Button Start",
    ],
    specifications: {
      engine: {
        type: "2.5L 4-Cylinder",
        displacement: "2.5L",
        horsepower: 203,
        torque: 184,
      },
      dimensions: {
        length: 192.1,
        width: 72.4,
        height: 56.9,
        wheelbase: 111.2,
      },
      performance: {
        zeroToSixty: 7.5,
        topSpeed: 135,
        fuelEconomyCity: 28,
        fuelEconomyHighway: 39,
      },
      capacity: {
        seating: 5,
        cargoVolume: 15.1,
        fuelTank: 14.5,
        towingCapacity: 1000,
      },
    },
    history: {
      owners: 1,
      title: "Clean",
      accidents: 0,
      serviceRecords: [
        {
          date: "2023-01-15",
          mileage: 5000,
          description: "Oil change and routine maintenance",
        },
        {
          date: "2023-07-22",
          mileage: 10000,
          description: "Tire rotation and brake inspection",
        },
      ],
    },
  },
  {
    _id: "2",
    make: "Honda",
    model: "CR-V",
    year: 2021,
    price: 32000,
    mileage: 22000,
    color: "Blue",
    vin: "5J6RW2H85MA123456",
    transmission: "CVT",
    fuelType: "Gasoline",
    bodyStyle: "SUV",
    description:
      "This Honda CR-V offers excellent reliability and versatility. Perfect for families, it provides ample cargo space, comfortable seating for five, and Honda's renowned safety features. The fuel-efficient engine delivers a smooth ride with plenty of power for daily driving.",
    images: [
      "/placeholder.svg?height=400&width=600&text=Honda CR-V",
      "/placeholder.svg?height=400&width=600&text=Interior",
      "/placeholder.svg?height=400&width=600&text=Cargo Space",
      "/placeholder.svg?height=400&width=600&text=Side View",
    ],
    featured: false,
    features: [
      "Leather Seats",
      "Sunroof",
      "Navigation System",
      "Heated Seats",
      "Blind Spot Monitoring",
      "Apple CarPlay",
      "Android Auto",
      "Wireless Charging",
    ],
    specifications: {
      engine: {
        type: "1.5L Turbocharged 4-Cylinder",
        displacement: "1.5L",
        horsepower: 190,
        torque: 179,
      },
      dimensions: {
        length: 182.1,
        width: 73.0,
        height: 66.5,
        wheelbase: 104.8,
      },
      performance: {
        zeroToSixty: 8.2,
        topSpeed: 124,
        fuelEconomyCity: 28,
        fuelEconomyHighway: 34,
      },
      capacity: {
        seating: 5,
        cargoVolume: 39.2,
        fuelTank: 14.0,
        towingCapacity: 1500,
      },
    },
    history: {
      owners: 1,
      title: "Clean",
      accidents: 0,
      serviceRecords: [
        {
          date: "2022-03-10",
          mileage: 10000,
          description: "Oil change and filter replacement",
        },
        {
          date: "2022-09-15",
          mileage: 18000,
          description: "Brake service and tire rotation",
        },
      ],
    },
  },
  {
    _id: "3",
    make: "Ford",
    model: "F-150",
    year: 2020,
    price: 38500,
    mileage: 35000,
    color: "Black",
    vin: "1FTEW1EP7LFA12345",
    transmission: "Automatic",
    fuelType: "Gasoline",
    bodyStyle: "Truck",
    description:
      "This Ford F-150 is the perfect combination of power and comfort. With its robust engine and spacious cabin, it's ideal for both work and family use. The truck bed offers ample space for hauling, while the interior provides all the modern conveniences you'd expect.",
    images: [
      "/placeholder.svg?height=400&width=600&text=Ford F-150",
      "/placeholder.svg?height=400&width=600&text=Interior",
      "/placeholder.svg?height=400&width=600&text=Truck Bed",
      "/placeholder.svg?height=400&width=600&text=Front View",
    ],
    featured: true,
    features: [
      "4x4",
      "Tow Package",
      "Backup Camera",
      "Touchscreen Infotainment",
      "Bluetooth",
      "Keyless Entry",
      "Power Windows",
      "Cruise Control",
    ],
    specifications: {
      engine: {
        type: "3.5L EcoBoost V6",
        displacement: "3.5L",
        horsepower: 375,
        torque: 470,
      },
      dimensions: {
        length: 231.7,
        width: 79.9,
        height: 75.6,
        wheelbase: 145.0,
      },
      performance: {
        zeroToSixty: 6.3,
        topSpeed: 107,
        fuelEconomyCity: 18,
        fuelEconomyHighway: 23,
      },
      capacity: {
        seating: 5,
        cargoVolume: 52.8,
        fuelTank: 26.0,
        towingCapacity: 13000,
      },
    },
    history: {
      owners: 2,
      title: "Clean",
      accidents: 0,
      serviceRecords: [
        {
          date: "2021-02-20",
          mileage: 15000,
          description: "Oil change and multi-point inspection",
        },
        {
          date: "2022-01-10",
          mileage: 28000,
          description: "Transmission service and fluid change",
        },
      ],
    },
  },
  {
    _id: "4",
    make: "BMW",
    model: "3 Series",
    year: 2023,
    price: 45000,
    mileage: 5000,
    color: "White",
    vin: "WBA8E5G56MNU12345",
    transmission: "Automatic",
    fuelType: "Gasoline",
    bodyStyle: "Sedan",
    description:
      "This BMW 3 Series exemplifies luxury and performance. With its powerful engine, precise handling, and premium interior, it delivers an exceptional driving experience. The vehicle comes equipped with the latest technology features and safety systems for a modern luxury experience.",
    images: [
      "/placeholder.svg?height=400&width=600&text=BMW 3 Series",
      "/placeholder.svg?height=400&width=600&text=Interior",
      "/placeholder.svg?height=400&width=600&text=Dashboard",
      "/placeholder.svg?height=400&width=600&text=Rear View",
    ],
    featured: false,
    features: [
      "Leather Seats",
      "Panoramic Sunroof",
      "Navigation System",
      "Harman Kardon Sound System",
      "Heated Seats",
      "Parking Sensors",
      "Lane Departure Warning",
      "Adaptive Cruise Control",
    ],
    specifications: {
      engine: {
        type: "2.0L TwinPower Turbo 4-Cylinder",
        displacement: "2.0L",
        horsepower: 255,
        torque: 295,
      },
      dimensions: {
        length: 185.7,
        width: 71.9,
        height: 56.8,
        wheelbase: 112.2,
      },
      performance: {
        zeroToSixty: 5.6,
        topSpeed: 155,
        fuelEconomyCity: 26,
        fuelEconomyHighway: 36,
      },
      capacity: {
        seating: 5,
        cargoVolume: 13.0,
        fuelTank: 15.6,
        towingCapacity: 0,
      },
    },
    history: {
      owners: 1,
      title: "Clean",
      accidents: 0,
      serviceRecords: [
        {
          date: "2023-03-05",
          mileage: 1000,
          description: "Break-in service and inspection",
        },
      ],
    },
  },
  {
    _id: "5",
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    price: 52000,
    mileage: 10000,
    color: "Red",
    vin: "5YJ3E1EA8MF123456",
    transmission: "Automatic",
    fuelType: "Electric",
    bodyStyle: "Sedan",
    description:
      "This Tesla Model 3 represents the future of automotive technology. With its all-electric powertrain, it delivers instant acceleration and zero emissions. The minimalist interior features a large touchscreen that controls most vehicle functions. Autopilot capabilities provide advanced driver assistance.",
    images: [
      "/placeholder.svg?height=400&width=600&text=Tesla Model 3",
      "/placeholder.svg?height=400&width=600&text=Interior",
      "/placeholder.svg?height=400&width=600&text=Touchscreen",
      "/placeholder.svg?height=400&width=600&text=Front View",
    ],
    featured: true,
    features: [
      "Autopilot",
      "Glass Roof",
      "Premium Sound System",
      "Heated Seats",
      "Navigation",
      "Keyless Entry",
      "Wireless Charging",
      "Over-the-air Updates",
    ],
    specifications: {
      engine: {
        type: "Electric Motor",
        displacement: "N/A",
        horsepower: 283,
        torque: 330,
      },
      dimensions: {
        length: 184.8,
        width: 72.8,
        height: 56.8,
        wheelbase: 113.2,
      },
      performance: {
        zeroToSixty: 5.3,
        topSpeed: 140,
        fuelEconomyCity: 138, // MPGe
        fuelEconomyHighway: 126, // MPGe
      },
      capacity: {
        seating: 5,
        cargoVolume: 15.0,
        fuelTank: 0, // Electric
        towingCapacity: 0,
      },
    },
    history: {
      owners: 1,
      title: "Clean",
      accidents: 0,
      serviceRecords: [
        {
          date: "2022-08-15",
          mileage: 5000,
          description: "Software update and tire rotation",
        },
      ],
    },
  },
  {
    _id: "6",
    make: "Chevrolet",
    model: "Silverado",
    year: 2021,
    price: 41000,
    mileage: 28000,
    color: "Gray",
    vin: "3GCUYDED8MG123456",
    transmission: "Automatic",
    fuelType: "Gasoline",
    bodyStyle: "Truck",
    description:
      "This Chevrolet Silverado is a workhorse with style and comfort. Its powerful engine provides excellent towing capacity, while the spacious cabin offers plenty of room for passengers and gear. With its rugged construction and modern features, it's ready for both work and play.",
    images: [
      "/placeholder.svg?height=400&width=600&text=Chevrolet Silverado",
      "/placeholder.svg?height=400&width=600&text=Interior",
      "/placeholder.svg?height=400&width=600&text=Truck Bed",
      "/placeholder.svg?height=400&width=600&text=Side View",
    ],
    featured: false,
    features: [
      "4x4",
      "Tow Package",
      "Backup Camera",
      "Apple CarPlay",
      "Android Auto",
      "Bluetooth",
      "Power Seats",
      "Remote Start",
    ],
    specifications: {
      engine: {
        type: "5.3L V8",
        displacement: "5.3L",
        horsepower: 355,
        torque: 383,
      },
      dimensions: {
        length: 231.7,
        width: 81.2,
        height: 75.5,
        wheelbase: 147.5,
      },
      performance: {
        zeroToSixty: 6.8,
        topSpeed: 110,
        fuelEconomyCity: 16,
        fuelEconomyHighway: 21,
      },
      capacity: {
        seating: 6,
        cargoVolume: 62.9,
        fuelTank: 24.0,
        towingCapacity: 11000,
      },
    },
    history: {
      owners: 1,
      title: "Clean",
      accidents: 0,
      serviceRecords: [
        {
          date: "2022-02-10",
          mileage: 12000,
          description: "Oil change and filter replacement",
        },
        {
          date: "2022-10-05",
          mileage: 24000,
          description: "Brake service and fluid check",
        },
      ],
    },
  },
  {
    _id: "7",
    make: "Audi",
    model: "Q5",
    year: 2022,
    price: 48000,
    mileage: 18000,
    color: "Black",
    vin: "WA1BNAFY8N2123456",
    transmission: "Automatic",
    fuelType: "Gasoline",
    bodyStyle: "SUV",
    description:
      "This Audi Q5 combines luxury, performance, and practicality. Its refined interior features premium materials and advanced technology, while the powerful engine and Quattro all-wheel drive system provide confident handling in all conditions. The perfect blend of elegance and utility.",
    images: [
      "/placeholder.svg?height=400&width=600&text=Audi Q5",
      "/placeholder.svg?height=400&width=600&text=Interior",
      "/placeholder.svg?height=400&width=600&text=Dashboard",
      "/placeholder.svg?height=400&width=600&text=Rear View",
    ],
    featured: false,
    features: [
      "Leather Seats",
      "Panoramic Sunroof",
      "Navigation System",
      "Bang & Olufsen Sound System",
      "Heated Seats",
      "Parking Sensors",
      "Lane Departure Warning",
      "Adaptive Cruise Control",
    ],
    specifications: {
      engine: {
        type: "2.0L Turbocharged 4-Cylinder",
        displacement: "2.0L",
        horsepower: 261,
        torque: 273,
      },
      dimensions: {
        length: 184.3,
        width: 74.5,
        height: 65.5,
        wheelbase: 111.0,
      },
      performance: {
        zeroToSixty: 5.7,
        topSpeed: 130,
        fuelEconomyCity: 23,
        fuelEconomyHighway: 28,
      },
      capacity: {
        seating: 5,
        cargoVolume: 25.8,
        fuelTank: 18.5,
        towingCapacity: 4400,
      },
    },
    history: {
      owners: 1,
      title: "Clean",
      accidents: 0,
      serviceRecords: [
        {
          date: "2022-06-15",
          mileage: 10000,
          description: "Oil change and multi-point inspection",
        },
      ],
    },
  },
  {
    _id: "8",
    make: "Jeep",
    model: "Wrangler",
    year: 2020,
    price: 36000,
    mileage: 32000,
    color: "Green",
    vin: "1C4HJXDG8LW123456",
    transmission: "Manual",
    fuelType: "Gasoline",
    bodyStyle: "SUV",
    description:
      "This Jeep Wrangler is the ultimate off-road vehicle with iconic styling and legendary capability. Its removable top and doors provide an open-air experience, while its rugged construction and four-wheel drive system allow it to tackle the toughest terrain with ease.",
    images: [
      "/placeholder.svg?height=400&width=600&text=Jeep Wrangler",
      "/placeholder.svg?height=400&width=600&text=Interior",
      "/placeholder.svg?height=400&width=600&text=Open Top",
      "/placeholder.svg?height=400&width=600&text=Front View",
    ],
    featured: false,
    features: [
      "4x4",
      "Removable Top",
      "Removable Doors",
      "Touchscreen Infotainment",
      "Bluetooth",
      "LED Headlights",
      "All-Weather Floor Mats",
      "Tow Package",
    ],
    specifications: {
      engine: {
        type: "3.6L V6",
        displacement: "3.6L",
        horsepower: 285,
        torque: 260,
      },
      dimensions: {
        length: 166.8,
        width: 73.8,
        height: 73.6,
        wheelbase: 96.8,
      },
      performance: {
        zeroToSixty: 6.9,
        topSpeed: 112,
        fuelEconomyCity: 17,
        fuelEconomyHighway: 25,
      },
      capacity: {
        seating: 4,
        cargoVolume: 31.7,
        fuelTank: 21.5,
        towingCapacity: 3500,
      },
    },
    history: {
      owners: 2,
      title: "Clean",
      accidents: 0,
      serviceRecords: [
        {
          date: "2021-04-10",
          mileage: 15000,
          description: "Oil change and differential fluid check",
        },
        {
          date: "2022-03-22",
          mileage: 28000,
          description: "Transfer case service and tire rotation",
        },
      ],
    },
  },
]

// Function to get all cars
export async function getAllCars(): Promise<Car[]> {
  // In a real app, this would fetch from a database
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCars)
    }, 500)
  })
}

// Function to get a car by ID
export async function getCarById(id: string): Promise<Car | null> {
  // In a real app, this would fetch from a database
  return new Promise((resolve) => {
    setTimeout(() => {
      const car = mockCars.find((car) => car._id === id)
      resolve(car || null)
    }, 500)
  })
}

// Function to get similar cars
export async function getSimilarCars(car: Car): Promise<Car[]> {
  // In a real app, this would fetch from a database with more sophisticated logic
  return new Promise((resolve) => {
    setTimeout(() => {
      const similar = mockCars
        .filter((c) => c._id !== car._id && (c.make === car.make || c.bodyStyle === car.bodyStyle))
        .slice(0, 4)
      resolve(similar)
    }, 500)
  })
}
