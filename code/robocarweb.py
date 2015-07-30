from flask import Flask
from RoboCar import RoboCar

app = Flask(__name__)
#car = RoboCar.RoboCarBase()
car = RoboCar.RoboCarModel1()

resp_ok = 'OK'
resp_fail = 'FAIL'

@app.route("/")
def root():
    return app.send_static_file('index.html')

@app.route('/api/Ping')
def ping():
    return resp_ok    

@app.route('/api/Status')
def status():
    return car.getInfo()

@app.route('/api/motor/Forward')
def motor_forward():
    car.setMotorForward()
    return resp_ok    
    
@app.route('/api/motor/ForwardReverseStop')
def motor_forward_reverse_stop():
    car.setMotorForwardReverseStop()
    return resp_ok
    
@app.route('/api/motor/LeftRightStop')
def motor_left_right_stop():
    car.setMotorLeftRightStop()
    return resp_ok

@app.route('/api/motor/Reverse')
def motor_reverse():
    car.setMotorReverse()
    return resp_ok

@app.route('/api/motor/Left')
def motor_left():
    car.setMotorLeft()
    return resp_ok
    
@app.route('/api/motor/Right')
def motor_right():
    car.setMotorRight()
    return resp_ok
    
if __name__ == "__main__":
    app.run("0.0.0.0")