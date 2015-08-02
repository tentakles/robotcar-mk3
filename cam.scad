//prefixes:
//d_ distance
//r_ radius
//h_ height
//w_ width
//l_ length
//m_ margin
//o_ offset

/*

module screw_hole(d_screwhole,r_screwhole,m_screwhole,h_plate,w_plate,l_plate,length,q){

    r_screwhole_perim = r_screwhole+m_screwhole;

    difference(){
    
   union(){       
                 translate([0,0,h_plate/2])
      cube([d_screwhole*2,r_screwhole_perim*2,h_plate],center=true);

        translate([-d_screwhole,0,0]){   
          difference(){
            cylinder(r=r_screwhole_perim,h_plate);
         //   cylinder(r=r_screwhole,h_plate);
          }
        }   
        
        translate([d_screwhole,0,0]){   
          difference(){
            cylinder(r=r_screwhole_perim,h_plate);
         //   cylinder(r=r_screwhole,h_plate);
          }
        }   
   }
   
           translate([-d_screwhole,0,0]){   
          difference(){
         //   cylinder(r=r_screwhole_perim,h_plate);
            cylinder(r=r_screwhole,h_plate);
          }
        }   
        
        translate([d_screwhole,0,0]){   
          difference(){
          //  cylinder(r=r_screwhole_perim,h_plate);
            cylinder(r=r_screwhole,h_plate);
          }
        }  
   }
}

module hole_pattern(o_hole_pattern,r_hole_pattern,h_hole_pattern,xnum,ynum,q){
       
$fn=q;
 
 for (xpos=[1:xnum], ypos = [1:ynum]) // do twelve iterations, using each xpos with each ypos
   translate([xpos*o_hole_pattern, ypos*o_hole_pattern, 0]) #cylinder(r=r_hole_pattern,h=h_hole_pattern);

}

module plate(d_screwhole,r_screwhole,m_screwhole,h_plate,w_plate,l_plate,length,q){
    
$fn=q;

    r_screwhole_perim = r_screwhole+m_screwhole;
    o_front_screws=(l_plate/2)+r_screwhole_perim;
    
    back_screw_offset=-(l_plate/2)+4+(r_screwhole/2);
    front_screw_offset=back_screw_offset+24.5;

difference(){  

union(){ 
  translate([0,36,h_plate/2])
        cube([w_plate,l_plate,h_plate],center=true);
      
  translate([0,o_front_screws-21,0]) 
    screw_hole(d_screwhole,r_screwhole,m_screwhole,h_plate,w_plate,l_plate,length,q);
    } 
    
      translate([0,front_screw_offset,0])
         #cylinder(r=r_screwhole,h_plate);
    
       translate([0,back_screw_offset,0])
         #cylinder(r=r_screwhole,h_plate);

      o_hole_pattern=10;
    r_hole_pattern=4;
    xnum=2;
    ynum=12;
    
    translate([-8,-25,0])
        hole_pattern(o_hole_pattern,r_hole_pattern,r_hole_pattern,xnum,ynum,q);
    
    translate([-24,-25,0])
        hole_pattern(o_hole_pattern,r_hole_pattern,r_hole_pattern,1,ynum,q);

}

}


module servo_mount(r_hole,o_hole_1,o_hole_2,q){  
    $fn=q;
    
    h_riser=0;
    
    h_servo_mount=18;
    
    l_servo_mount=7.25;
    w_servo_mount=3;
    
    l_servo=41;
    
    o_side=7;
    
    module servo_mount(){  
      
        w_cylinder=w_servo_mount*2;
        
        difference(){
            translate([0,0,h_servo_mount/2])   
                cube([l_servo_mount,w_servo_mount,h_servo_mount],center=true);
            
             translate([0,-(w_cylinder/2),o_hole_1+h_riser])  
                rotate([0,90,90])
                    cylinder(r=r_hole,w_cylinder);
            
            
            translate([0,-(w_cylinder/2),o_hole_2+h_riser])  
                rotate([0,90,90])
                    cylinder(r=r_hole,w_cylinder);
            
            }
    } 

    oy_servo_mount=13.5 - o_side;
    ox_servo_mount=l_servo_mount + l_servo + 0.5 ;
    
    translate([-24.75,oy_servo_mount,0]){
        servo_mount();
    
        translate([ox_servo_mount,0,0])
            servo_mount();
    }
    
    
    
//translate([0,-1,-1/2]) 
 //   #cube([59,45,1],center=true);
    
    
translate([-0.5,1.5,h_riser/2]) 
    cube([41,33,h_riser],center=true);


h_stabiliser=h_servo_mount/2;

translate([-7,19.5,h_stabiliser/2])   
       cube([l_servo_mount,w_servo_mount,h_stabiliser],center=true);

h_servo_mount_2 =14;

translate([20-10,-(16.5 + 6),0]) {   

difference(){
    
   translate([0,0,h_servo_mount_2/2]) 
    cube([l_servo_mount,2,h_servo_mount_2],center=true);
            
translate([0,-1.5,h_riser+10.5])  
    rotate([0,90,90])
        cylinder(r=r_hole,3);
    
}
}


    
}

//test 1 
//plate(d_screwhole=30,r_screwhole=4.5,h_plate=3,w_plate=50,l_plate=10,q=60);

//test 2
//plate(d_screwhole=30,r_screwhole=4.5/2,h_plate=2,w_plate=50,l_plate=10,q=60);

//test 3
q=75;

//plate(d_screwhole=30,r_screwhole=4.1/2,m_screwhole=2,h_plate=2,w_plate=17,l_plate=80,q=q);

//servo mount test 1
//$fn=100;


//integration test 1

plate(d_screwhole=30,r_screwhole=4.1/2,m_screwhole=2,h_plate=2,w_plate=47,l_plate=110,q=q);

translate([0,56+7 ,2])  
    rotate([0,0,90])
servo_mount(r_hole=4.5/2,o_hole_1=5,o_hole_2=14.5,q=q);
*/

//integration test 3

$fn=30;

w_module = 26.3;
h_module=10;

d_module = 1.75;

o_mount = 2;

clearance_module=2*2;

h_mount=15;
w_mount=20;

d_mount=9;

O_screwhole_side=17/2;
r_screwhole=1.5;

d_screwholes=6;

module solids(){
      cube([d_module+o_mount,w_module+o_mount,h_module],center=true);
}


translate([0,0,h_module/2])
difference(){
    
  solids();
    
    translate([0,0,o_mount/2])
        cube([d_module,w_module,h_module],center=true);
    
    
   translate([-1,0,1+ o_mount/2])
        cube([d_module,w_module-clearance_module,h_module],center=true);
    
    
    translate([o_mount/2,0,0])
        cube([d_module,w_module -clearance_module,h_module],center=true);
    
}

difference(){

union(){
translate([d_mount,0,h_mount/2])
    cube([d_module,w_module+o_mount,h_mount],center=true);

translate([3.5,0.5+ w_module/2,h_module/2])
    cube([10,o_mount/2,h_module],center=true);

translate([3.5,-(0.5+ w_module/2),h_module/2])
    cube([10,o_mount/2,h_module],center=true);
}


 translate([d_screwholes,O_screwhole_side,12])  
    rotate([0,90,0])
        cylinder(r=r_screwhole,h=5);

 translate([d_screwholes,-O_screwhole_side,12])  
    rotate([0,90,0])
        cylinder(r=r_screwhole,h=5);

 translate([d_screwholes,0,7.5])  
    rotate([0,90,0])
        cylinder(r=6,h=5);


}


