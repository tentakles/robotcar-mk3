import logging, sys

class RoboCarBase:
    def __init__(self):
		self.motorSpeed=50;		
		self.cameraSpeed=50;
		self.motorTurnSpeed=50;
		logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)
		logging.debug('init RoboCarBase')
	#set speeds etc
    def setMotorSpeed(self, speed):
		self.motorSpeed=speed;
		logging.debug("setting motor speed: {}".format(self.motorSpeed))
    def setMotorTurnSpeed(self, speed):
		self.motorTurnSpeed=speed;
		logging.debug("setting motor turn speed: {}".format(self.motorTurnSpeed))
    def setCamAngle(self,angle):
        self.camAngle=angle;
        logging.debug("setting camera angle: {}".format(self.camAngle))	
    def setCamSpeed(self,speed):
		self.camSpeed=speed;
		logging.debug("setting camera speed {}".format(self.camSpeed))	
	#actions etc.
    def setMotorForward(self):
        logging.debug("setting motor forward")	
    def setMotorReverse(self):
		logging.debug("setting motor reverse")
    def setMotorLeft(self):
		logging.debug("setting motor left")
    def setMotorRight(self):
		logging.debug("setting motor right")
    def stop(self):
		logging.debug("stop everything")
    def centerCam(self):
		logging.debug("centercamera ")

#implementation for first type of car
class RoboCarModel1(RoboCarBase):
    def __init__(self):
		logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)
		logging.debug('init RoboCatModel1')
	
