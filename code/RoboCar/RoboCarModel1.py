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
    
    def stop(self):
        self.mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
        self.mh.getMotor(3).run(Adafruit_MotorHAT.RELEASE)

    def __init__(self,i2c_addr):
        super(RoboCarModel1,self).__init__()
        #logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)
        self.i2c_addr = i2c_addr;
        self.mh = Adafruit_MotorHAT(addr=i2c_addr)
        self.pwm = PWM(0x60)
        self.servoMin = 150  # Min pulse length out of 4096
        self.servoMax = 600  # Max pulse length out of 4096
        self.pwm.setPWMFreq(60)      
        self.motor1 = self.mh.getMotor(1)
        self.motor2 = self.mh.getMotor(3)
        atexit.register(self.stop)

    def setCamAngle(self,angle):
        self.camAngle=angle;
        newAngle = self.map(self.camAngle,0,180,self.servoMin,self.servoMax)
        self.pwm.setPWM(0, 0, newAngle)
        #logging.debug("setting camera angle: {}".format(self.camAngle))  
      
    def setMotors(self,motor1Speed,motor2Speed,motor1Dir,motor2Dir):
        # set the speed to start, from 0 (off) to 255 (max speed)
        newSpeed1 = self.map(motor1Speed,0,10,0,255)
        newSpeed2 = self.map(motor2Speed,0,10,0,255)         
        self.motor1.setSpeed(newSpeed1)
        self.motor2.setSpeed(newSpeed2)
        self.motor1.run(motor1Dir)
        self.motor2.run(motor2Dir)
       
    def setMotorForward(self):
        self.setMotors(self.motorSpeed,self.motorSpeed,Adafruit_MotorHAT.FORWARD,Adafruit_MotorHAT.FORWARD)
     
    def setMotorReverse(self):
        self.setMotors(self.motorSpeed,self.motorSpeed,Adafruit_MotorHAT.BACKWARD,Adafruit_MotorHAT.BACKWARD)
        
    def setMotorForwardReverseStop(self):
        self.stop()
        
    def setMotorLeftRightStop(self):
        self.stop()
        
    def setMotorLeft(self):
        self.setMotors(self.motorTurnSpeed,self.motorTurnSpeed,Adafruit_MotorHAT.BACKWARD,Adafruit_MotorHAT.FORWARD)
        
    def setMotorRight(self):
        self.setMotors(self.motorTurnSpeed,self.motorTurnSpeed,Adafruit_MotorHAT.FORWARD,Adafruit_MotorHAT.BACKWARD)
        
     
        
