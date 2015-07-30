import logging, sys, time, atexit
from RoboCar import RoboCarBase
from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor
from Adafruit_PWM_Servo_Driver import PWM

#implementation for first type of car
class RoboCarModel1(RoboCarBase.RoboCarBase):
    model = "RobotCar Model 1"
    version = 0.1
    
    def stop(self):
        self.mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
        self.mh.getMotor(3).run(Adafruit_MotorHAT.RELEASE)

    def __init__(self,i2c_addr):  
        super(RoboCarModel1,self).__init__()
        #logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)
        self.i2c_addr = i2c_addr
        self.mh = Adafruit_MotorHAT(addr=i2c_addr)
        self.pwm = PWM(0x60)
        self.servoMin = 150  # Min pulse length out of 4096
        self.servoMax = 600  # Max pulse length out of 4096
        self.pwm.setPWMFreq(60)      
        self.motorLeft = self.mh.getMotor(3)
        self.motorRight = self.mh.getMotor(1)
        atexit.register(self.stop)
        self.isRunningForward=0
        self.isRunningReverse=0
        self.isRunningLeft=0
        self.isRunningRight=0

    def setCamAngle(self,angle):
        self.camAngle=angle;
        newAngle = self.map(self.camAngle,0,180,self.servoMin,self.servoMax)
        self.pwm.setPWM(0, 0, newAngle)

    def setMotors(self,motorLeftSpeed,motorRightSpeed,motorLeftDir,motorRightDir):
        # set the speed to start, from 0 (off) to 255 (max speed)
        newLeftSpeed = self.map(motorLeftSpeed,0,10,0,255)
        newRightSpeed = self.map(motorRightSpeed,0,10,0,255)         
        self.motorLeft.setSpeed(newLeftSpeed)
        self.motorRight.setSpeed(newRightSpeed)
        self.motorLeft.run(motorLeftDir)
        self.motorRight.run(motorRightDir)
       
    def setMotorForward(self):
        self.isRunningForward=1
        self.isRunningReverse=0
        self.setMotors(self.motorSpeed,self.motorSpeed,Adafruit_MotorHAT.FORWARD,Adafruit_MotorHAT.FORWARD)
     
    def setMotorReverse(self):
        self.isRunningForward=0
        self.isRunningReverse=1
        self.setMotors(self.motorSpeed,self.motorSpeed,Adafruit_MotorHAT.BACKWARD,Adafruit_MotorHAT.BACKWARD)
        
    def setMotorForwardReverseStop(self):
        self.isRunningForward=0
        self.isRunningReverse=0  
        if(self.isRunningLeft):
            self.setMotorLeft()
        elif(self.isRunningRight):
            self.setMotorRight()
        else:
            self.stop()
        
    def setMotorLeftRightStop(self):
        self.isRunningLeft=0
        self.isRunningRight=0
        if(self.isRunningForward):
            self.setMotorForward()
        elif(self.isRunningReverse):
            self.setMotorReverse()
        else:
            self.stop()
        
    def setMotorLeft(self):
        self.isRunningLeft=1
        self.isRunningRight=0
        self.setMotors(self.motorTurnSpeed,self.motorTurnSpeed,Adafruit_MotorHAT.BACKWARD,Adafruit_MotorHAT.FORWARD)
        
    def setMotorRight(self):
        self.isRunningLeft=0
        self.isRunningRight=1
        self.setMotors(self.motorTurnSpeed,self.motorTurnSpeed,Adafruit_MotorHAT.FORWARD,Adafruit_MotorHAT.BACKWARD)
        
     
        
