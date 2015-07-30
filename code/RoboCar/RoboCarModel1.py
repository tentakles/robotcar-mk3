import logging, sys
from RoboCar import RoboCarBase

from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor
from Adafruit_PWM_Servo_Driver import PWM

import time
import atexit

#implementation for first type of car
class RoboCarModel1(RoboCarBase.RoboCarBase):
    model = "RobotCar Model 1"
    version = 0.02
    def __init__(self,i2c_addr):
        super(RoboCarModel1,self).__init__()
        #logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)
        self.i2c_addr = i2c_addr;
        self.mh = Adafruit_MotorHAT(addr=i2c_addr)
        self.pwm = PWM(0x60)
        self.servoMin = 150  # Min pulse length out of 4096
        self.servoMax = 600  # Max pulse length out of 4096
        pwm.setPWMFreq(60)
        
    def doSetCamAngle(self):
        newAngle = self.map(self.angle,0,180,self.servoMin,self.servoMax)
        pwm.setPWM(0, 0, newAngle)
        
     
        