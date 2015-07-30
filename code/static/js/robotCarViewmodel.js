function RobotCarViewModel() {

	var self = this;
	
	//keyboard keys
	self.keyUp =38;
	self.keyDown =40;
	self.keyLeft =37;
	self.keyRight =39;
	
	self.baseUrl="/api/"
    
    self.motorSpeedDefault=3;
    self.motorSpeedTurningDefault=2;
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
 
    self.motorSpeedRateLimited.subscribe(function(){self.setMotorSpeed()});
    
    self.motorSpeedTurningRateLimited.subscribe(function(){self.setMotorSpeedTurning()});

    self.camAngleRateLimited.subscribe(function(){self.setCamAngle()});
    
     self.setMotorSpeed=function(){  
         var val = self.motorSpeed();
         self.setMotor("speed/" + val,"Speed " + val);
    };
    
    self.setMotorSpeedTurning=function(){  
        var val = self.motorSpeedTurning();      
        self.setMotor("turningSpeed/" + val,"Turningspeed " + val);
    };
    
    self.setCamAngle=function(){  
        var val = self.camAngle();

        self.ajaxGet(self.baseUrl+"cam/angle/"+val, function (data) {
		if(data!="OK")
			self.status("Kunde inte rikta kamera till " + val + ", fel uppstod", "error");
        else
            self.status("Cam Angle " + val);
		}, function () {
			self.status("Kunde inte rikta kamera till " + val, "error");
		});
    };
    
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
	self.isMotorForward(false);
	self.isMotorReverse(false);
	self.setMotor("forwardReverseStop","Forward/Reverse stopped");
	};
	
	self.setMotorLeftRightStop=function(){
	self.isMotorLeft(false);
	self.isMotorRight(false);
	self.setMotor("leftRightStop","Turning stopped");
	};
    
    self.stop=function(){

    self.setMotor("stop","Stop");
    };
    
	self.setMotorForward=function(){
	
	if(!self.isMotorForward()){
		self.isMotorForward(true);
		self.isMotorReverse(false);	
		self.setMotor("forward","Forward");
		}
	};
	
	self.setMotorReverse=function(){
	
	if(!self.isMotorReverse()){
		self.isMotorReverse(true);
		self.isMotorForward(false);
		self.setMotor("reverse","Reverse");
		}
	};

	self.setMotorLeft=function(){
	
	if(!self.isMotorLeft()){
		self.isMotorLeft(true);
		self.isMotorRight(false);
		self.setMotor("left","Turn left");
		}
	};

	self.setMotorRight=function(){
	
	if(!self.isMotorRight()){
		self.isMotorRight(true);
		self.isMotorLeft(false);
		self.setMotor("right","Turn right");
		}
	};
	
	self.setMotor=function(dir,status){
		self.ajaxGet(self.baseUrl+"motor/"+dir, function (data) {
		if(data!="OK")
			self.status("Kunde inte sätta riktning " + dir + ", fel uppstod", "error");
        else
            self.status(status);
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
        
        self.setCamAngle();
        self.setMotorSpeed();
        self.setMotorSpeedTurning();

	}
	self.setup();
};

RobotCarViewModel.prototype = new ViewModelBase();

