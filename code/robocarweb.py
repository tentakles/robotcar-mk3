from flask import Flask
app = Flask(__name__)

#test impl
#from RoboCar import RoboCarBase
#car = RoboCarBase.RoboCarBase()

#raspi impl 1
from RoboCar import RoboCarModel1
car = RoboCarModel1.RoboCarModel1(0x60)

resp_ok = 'OK'
resp_fail = 'FAIL'

@app.route("/")
def root():
    return app.send_static_file('index.html')

@app.route('/api/ping')
def ping():
    return resp_ok    
   
@app.route('/api/status')
def status():
    return car.getInfo()

    
@app.route('/api/motor/speed/<int:speed>')
def set_motor_speed(speed):
    car.setMotorSpeed(speed)
    return resp_ok
    
@app.route('/api/motor/turningSpeed/<int:speed>')
def set_motor_turning_speed(speed):
    car.setMotorTurnSpeed(speed)
    return resp_ok
    
@app.route('/api/cam/angle/<int:angle>')
def set_cam_angle(angle):
    car.setCamAngle(angle)
    return resp_ok
    
@app.route('/api/motor/forward')
def motor_forward():
    car.setMotorForward()
    return resp_ok    
    
@app.route('/api/motor/forwardReverseStop')
def motor_forward_reverse_stop():
    car.setMotorForwardReverseStop()
    return resp_ok
    
@app.route('/api/motor/leftRightStop')
def motor_left_right_stop():
    car.setMotorLeftRightStop()
    return resp_ok

@app.route('/api/motor/reverse')
def motor_reverse():
    car.setMotorReverse()
    return resp_ok
    
@app.route('/api/motor/stop')
def motor_stop():
    car.stop()
    return resp_ok

@app.route('/api/motor/left')
def motor_left():
    car.setMotorLeft()
    return resp_ok
    
@app.route('/api/motor/right')
def motor_right():
    car.setMotorRight()
    return resp_ok
    
if __name__ == "__main__":
    app.run("0.0.0.0")
