var PythonShell = require('python-shell');

var F = require('firebase')
var myF = new F('https://teapot1.firebaseio.com')

var temp = 0;

var dist = 0;
var timer= 0;
var stage= 0;

PythonShell.defaultOptions = { scriptPath: '../python' };



function dis(){


var pyshell = new PythonShell('t2.py');

pyshell.on('message', function (m) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(m);
  console.log('distance is '+temp)
 
//timer is started
if(stage == 3){
   if(timer<=15){
 	console.log('alarm 2 timer not run out yet')
	timer++;
	dis()	
   }

   else{
	console.log('alarm 2  expired consquence 3')
	stage = 0;
	timer = 0;
	dis();
   }



}






//timer is started
if(stage == 2){
   if(timer<=10){
 	console.log('alarm 1 timer not run out yet')
	timer++;
	dis()	
   }

   else{
	console.log('alarm1  expired consquence 2')
	myF.set({'name':'fire on the stove grandma'})
	stage=3;
	dis();
   }



}






//timer is started
if(stage ==1){
   if(timer<=5){
 	console.log('timer not run out yet')
	timer++;
	dis()	
   }

   else{
	console.log('timer expired consquence 1')
	stage=2;
	dis();
   }



} 





//timer is off
 if(stage==0){
    if(m<100){
       console.log('gradma in front of oven -- testing for passby or operating the stove');
       temp=m;
	
       if(dist==0){
	       setTimeout(function(){
	         dist=m;
		 dis()
		},3000);
	}
	
	else{

	console.log('she is there')
		stage=1;
		timer=1;
		dis();
	}
    }

    else{
	console.log('no one there')
 	setTimeout(function(){
        temp=0;
	 dis()
	},3000);


   }

 }






});
}

dis()
