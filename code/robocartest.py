from RoboCar import RoboCar

car = RoboCar.RoboCarBase()
#car = RoboCarBase.RoboCarModel1()

#speeds etc.
car.setMotorSpeed(2)
car.setMotorTurnSpeed(10)
car.setCamAngle(9)
car.setCamSpeed(8)

#actions etc.
car.setMotorForward() 
car.setMotorReverse()
car.setMotorLeft()
car.setMotorRight()
car.stop()
car.centerCam()


