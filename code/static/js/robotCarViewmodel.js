function RobotCarViewModel() {

	var self = this;
	
	//keyboard keys
	self.keyUp =38;
	self.keyDown =40;
	self.keyLeft =37;
	self.keyRight =39;
	
	self.baseUrl="/api/"
    
    self.motorSpeedDefault=50;
    self.motorSpeedTurningDefault=25;
    self.camAngleDefault=90;

	//observables
	self.isMotorForward=ko.observable(false);
	self.isMotorReverse=ko.observable(false);
	self.isMotorLeft=ko.observable(false);
	self.isMotorRight=ko.observable(false);
    
    self.motorSpeed=ko.observable(self.motorSpeedDefault);
    self.motorSpeedTurning=ko.observable(self.motorSpeedTurningDefault);
 
    self.camAngle=ko.observable(self.camAngleDefault);

	self.name=ko.observable("-");	
	self.status=ko.observable("Awaiting command");

    self.rateLimit=750;
    
    self.motorSpeedRateLimited = ko.pureComputed(self.motorSpeed).extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: self.rateLimit } });
    self.motorSpeedTurningRateLimited = ko.pureComputed(self.motorSpeedTurning).extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: self.rateLimit } });
    self.camAngleRateLimited = ko.pureComputed(self.camAngle).extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: self.rateLimit } });
 
    self.motorSpeedRateLimited.subscribe(function (val) {
         self.status("Speed " + val);
         self.setMotor("speed/" + val);
    });
    
    self.motorSpeedTurningRateLimited.subscribe(function (val) {
        self.status("Turningspeed " + val);
        self.setMotor("turningSpeed/" + val);
    });

    self.camAngleRateLimited.subscribe(function (val) {
        self.status("CamAngle " + val);
        
        self.ajaxGet(self.baseUrl+"cam/angle/"+val, function (data) {
		if(data!="OK")
			self.status("Kunde inte rikta kamera till " + val + ", fel uppstod", "error");
		}, function () {
			self.status("Kunde inte rikta kamera till " + val, "error");
		});
 
    });
    
    self.doSkipKeyEvent=function(target){
    
    if(target.classList && target.classList.length){
        for(var i=0;i<target.classList.length;i++){
            var c= target.classList[i];
            if(c==="keyPresser")
                return true;
            }         
        }
        return false;
    }
    
	$(window).keydown(function (event) {
    
    if(self.doSkipKeyEvent(event.target))
        return;

	switch(event.keyCode) {
		case self.keyUp:
			self.setMotorForward();
			break;
		case self.keyDown:
			 self.setMotorReverse();
			break;
		case self.keyLeft:
			 self.setMotorLeft();
			break;
		case self.keyRight:
			 self.setMotorRight();
			break;
		default:
		}
	});
	
	$(window).keyup(function (event) {
    
    if(self.doSkipKeyEvent(event.target))
        return;
    
	switch(event.keyCode) {
		case self.keyUp:
			self.setMotorForwardReverseStop();
			break;
		case self.keyDown:
			 self.setMotorForwardReverseStop();
			break;
		case self.keyLeft:
			 self.setMotorLeftRightStop();
			break;
		case self.keyRight:
			 self.setMotorLeftRightStop();
			break;
		default:
		}
	});

	self.setMotorForwardReverseStop=function(){
	self.status("MotorForwardReverseStop");	
	self.isMotorForward(false);
	self.isMotorReverse(false);
	self.setMotor("forwardReverseStop");
	};
	
	self.setMotorLeftRightStop=function(){
	self.status("MotorLeftRightStop");
	self.isMotorLeft(false);
	self.isMotorRight(false);
	self.setMotor("leftRightStop");
	};
    
    self.stop=function(){
    self.status("Stop");
    self.setMotor("stop");
    };
    
	self.setMotorForward=function(){
	
	if(!self.isMotorForward()){
		self.status("MotorForward");
		self.isMotorForward(true);
		self.isMotorReverse(false);	
		self.setMotor("forward");
		}
	};
	
	self.setMotorReverse=function(){
	
	if(!self.isMotorReverse()){
		self.status("MotorReverse");
		self.isMotorReverse(true);
		self.isMotorForward(false);
		self.setMotor("reverse");
		}
	};

	self.setMotorLeft=function(){
	
	if(!self.isMotorLeft()){
		self.status("MotorLeft");
		self.isMotorLeft(true);
		self.isMotorRight(false);
		self.setMotor("left");
		}
	};

	self.setMotorRight=function(){
	
	if(!self.isMotorRight()){
		self.status("MotorRight");
		self.isMotorRight(true);
		self.isMotorLeft(false);
		self.setMotor("right");
		}
	};
	
	self.setMotor=function(dir){
		self.ajaxGet(self.baseUrl+"motor/"+dir, function (data) {
		if(data!="OK")
			self.status("Kunde inte sätta riktning " + dir + ", fel uppstod", "error");
		}, function () {
			self.status("Kunde inte sätta riktning " + dir, "error");
		});
	};	

	self.setup=function(){
	
		self.ajaxGet(self.baseUrl+"status", function (data) {	
			self.name(data);
		}, function () {
			self.status("Kunde inte hämta info ");
		});
	
	}
	self.setup();
};

RobotCarViewModel.prototype = new ViewModelBase();

