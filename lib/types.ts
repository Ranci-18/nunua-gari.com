export interface Car {
  _id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  color: string
  vin?: string
  transmission: string
  fuelType: string
  bodyStyle: string
  description: string
  images: string[]
  featured: boolean
  features: string[]
  specifications: {
    engine?: {
      type: string
      displacement: string
      horsepower: number
      torque: number
    }
    dimensions?: {
      length: number
      width: number
      height: number
      wheelbase: number
    }
    performance: {
      zeroToSixty: number
      topSpeed: number
      fuelEconomyCity: number
      fuelEconomyHighway: number
    }
    capacity?: {
      seating: number
      cargoVolume: number
      fuelTank: number
      towingCapacity: number
    }
  }
  history?: {
    owners: number
    title: string
    accidents: number
    serviceRecords: {
      date: string
      mileage: number
      description: string
    }[]
  }
}
