import logging, sys

class RoboCarBase(object):
    model = "RobotCar Test"
    version = 0.1

    def __init__(self):
        self.motorSpeed=8       
        self.motorTurnSpeed=3
        self.camAngle=90
        logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)
        logging.debug('init RoboCar')
        logging.debug(self.getInfo())
    def getInfo(self):
        return "{}, version {}".format(self.model, self.version);    

    def map(self, x, in_min, in_max, out_min, out_max):
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
       
    #actions etc.    
    def setMotorForwardReverseStop(self):
        logging.debug("setting motor forward reverse stop")
    def setMotorLeftRightStop(self):
        logging.debug("setting motor left right stop")
    def setMotorForward(self):
        logging.debug("setting motor forward")  
        self.doSetForward()
    def setMotorReverse(self):
        logging.debug("setting motor reverse")
        self.doSetBackward()
    def setMotorLeft(self):
        logging.debug("setting motor left")
    def setMotorRight(self):
        logging.debug("setting motor right")
    def stop(self):
        logging.debug("stop everything")
    def stop(self):
        logging.debug("STOP")
        self.doStop()
        
    #impls to be populated by sub classes
    def doSetCamAngle(self):
        logging.debug("doSetCamAngle BASE called")
        
    def doStop(self):
        logging.debug("doStop BASE called")
        
    def doSetForward(self):
        logging.debug("doSetForward BASE called")
        
    def doSetBackward(self):
        logging.debug("doSetBackward BASE called")
             

    
