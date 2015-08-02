//prefixes:
//d_ distance
//r_ radius
//h_ height
//w_ width
//l_ length
//m_ margin
//o_ offset

$fn=50;

r_outer=3;
r_inner=1.5;
r_screwhole=2;
h_upper=13;
h_total=20;

d_upper = 3 + (r_outer*2);
o_cube = h_total-h_upper;
l_cube = d_upper;

l_baseplate=24;
w_baseplate=r_outer*2;
h_baseplate=2;
o_screwhole_baseplate=7.5;

difference(){

union(){
    
       translate([-l_baseplate/2,-w_baseplate/2,0])
        cube([l_baseplate,w_baseplate,h_baseplate]);
    
    
    cylinder(r=r_outer,h=h_total);

    translate([0,d_upper,h_total-h_upper])
        cylinder(r=r_outer,h=h_upper);
 
    translate([-r_outer,0,o_cube])
        cube([r_outer*2,l_cube,h_upper]);
        }
  translate([0,d_upper,h_total-h_upper])
cylinder(r=r_inner,h=h_upper*2);
        
        
translate([o_screwhole_baseplate,0,0])
    cylinder(r=r_screwhole,h=h_baseplate);     

translate([-o_screwhole_baseplate,0,0])
    cylinder(r=r_screwhole,h=h_baseplate);     
    
        
}
