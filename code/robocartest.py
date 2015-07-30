#test impl
from RoboCar import RoboCarBase
car = RoboCarBase.RoboCarBase()

#raspi impl 1
#from RoboCar import RoboCarModel1
#car = RoboCarModel1.RoboCarModel1(0x60)

#speeds etc.
car.setMotorSpeed(2)
car.setMotorTurnSpeed(10)
car.setCamAngle(9)
#car.setCamSpeed(8)

#actions etc.
car.setMotorForward() 
car.setMotorReverse()
car.setMotorLeft()
car.setMotorRight()
car.stop()
#car.centerCam()

car.map(395, 395, 1023, 100,152);
car.map(1023, 395, 1023, 100,152);
car.map(800, 395, 1023, 0,100);


