function RobotCarViewModel() {

	var self = this;
	
	//keyboard keys
	self.keyUp =38;
	self.keyDown =40;
	self.keyLeft =37;
	self.keyRight =39;
	
	self.baseUrl="/api/"

	//observables
	self.isMotorForward=ko.observable(false);
	self.isMotorReverse=ko.observable(false);
	self.isMotorLeft=ko.observable(false);
	self.isMotorRight=ko.observable(false);
	
	self.name=ko.observable("-");	
	self.status=ko.observable("awaiting command");

	$(window).keydown(function (event) {
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

	self.setName=function(){
	self.name("nytt namn");
	};
	
	self.setMotorForwardReverseStop=function(){
	self.status("MotorForwardReverseStop");	
	self.isMotorForward(false);
	self.isMotorReverse(false);
	self.setMotor("ForwardReverseStop");
	};
	
	self.setMotorLeftRightStop=function(){
	self.status("MotorLeftRightStop");
	self.isMotorLeft(false);
	self.isMotorRight(false);
	self.setMotor("LeftRightStop");
	};
	
	self.setMotorForward=function(){
	
	if(!self.isMotorForward()){
		self.status("MotorForward");
		self.isMotorForward(true);
		self.isMotorReverse(false);	
		self.setMotor("Forward");
		}
	};
	
	self.setMotorReverse=function(){
	
	if(!self.isMotorReverse()){
		self.status("MotorReverse");
		self.isMotorReverse(true);
		self.isMotorForward(false);
		self.setMotor("Reverse");
		}
	};

	self.setMotorLeft=function(){
	
	if(!self.isMotorLeft()){
		self.status("MotorLeft");
		self.isMotorLeft(true);
		self.isMotorRight(false);
		self.setMotor("Left");
		}
	};

	self.setMotorRight=function(){
	
	if(!self.isMotorRight()){
		self.status("MotorRight");
		self.isMotorRight(true);
		self.isMotorLeft(false);
		self.setMotor("Right");
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
	
		self.ajaxGet(self.baseUrl+"Status", function (data) {	
			self.name(data);
		}, function () {
			self.status("Kunde inte hämta info ");
		});
	
	}
	
	self.setup();
	
};

RobotCarViewModel.prototype = new ViewModelBase();

