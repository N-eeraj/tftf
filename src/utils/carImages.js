import ambulance from '@images/cars/ambulance.png'
import audi from '@images/cars/audi.png'
import basic from '@images/cars/basic.png'
import blackViper from '@images/cars/black-viper.png'
import miniTruck from '@images/cars/mini-truck.png'
import miniVan from '@images/cars/mini-van.png'
import police from '@images/cars/police.png'
import taxi from '@images/cars/taxi.png'

const carsList = [
  taxi,
  miniVan,
  miniTruck,
  ambulance,
  basic,
  police,
  blackViper,
  audi,
]

export const findPlayerCar = carIndex => carsList[carIndex]

export const randomCar = carsList[Math.floor(Math.random() * carsList.length)]

export default carsList
