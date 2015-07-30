import logging, sys

class RoboCarBase(object):
    model = "RobotCar Test"
    version = 0.1

    def __init__(self):
        self.motorSpeed=50;        
        self.cameraSpeed=50;
        self.motorTurnSpeed=50;
        logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)
        logging.debug('init RoboCar')
        logging.debug(self.getInfo())
    def getInfo(self):
        return "{}, version {}".format(self.model, self.version);    

    def map(self, x, in_min, in_max, out_min, out_max):
        #result = 44
        result = (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    
        logging.debug("map: from {} ({}-{}) to {} ({}-{})".format(x,in_min,in_max,result,out_min,out_max))
        return result
    
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
        self.doSetCamAngle()
    def setCamSpeed(self,speed):
        self.camSpeed=speed;
        logging.debug("setting camera speed {}".format(self.camSpeed))    
        
    #actions etc.    
    def setMotorForwardReverseStop(self):
        logging.debug("setting motor forward reverse stop")
    def setMotorLeftRightStop(self):
        logging.debug("setting motor left right stop")
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
    def stop(self):
        logging.debug("STOP")
        
    #impls to be populated by sub classes
    def doSetCamAngle(self):
        logging.debug("doSetCamAngle BASE called")

    
