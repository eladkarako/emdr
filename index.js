"use strict";
var audio = document.querySelector("audio");

HTMLAudioElement.prototype.is_playing  = function(){return !(this.paused);};
HTMLAudioElement.prototype.toggle_play = function(){
                                                    (true === this.is_playing()) ? this.pause() : this.play();
                                                   };

var MAX_MODE = 7;   //modes available 0-to-6 (7 modulu).


function get_mode(){  //extract last (or not existing) mode from cookie. does not update cookie.
  var number = document.cookie
                       .split(';')
                       .shift()
                       .split("=")
                       .pop()
                       .replace(/\s+/g,"")
                       ;
  number = (true === /NaN/i.test(  String(Number(number))  )) ? 0 : Number(number);   //valid number (fallback to 0).
  return number;
}


function set_mode(number){    //
  number = number % MAX_MODE;
  document.cookie = "mode=" + number + "; ";
}


/* ╔═══════════════╗
   ║ program start ║
   ╚═══════════════╝ */


try{
audio.play();     //auto-play audio.
}catch(err){}


document.querySelector('html').setAttribute("mode", get_mode());    //corrent mode

set_mode(  get_mode() + 1  );                                       //advance to next-mode.


self.document.title = "#" + get_mode();
try{
top.document.title  = "#" + get_mode();
}catch(err){}


/* ╔══════════════════╗
   ║ keyboard control ║
   ║ 1-audio toggle.  ║
   ║ 2-change mode.   ║
   ╚══════════════════╝ */


function keydown_handler(ev){
  if(49 === ev.keyCode || 49 === ev.which){
    audio.toggle_play();
  }
  else if(50 === ev.keyCode || 50 === ev.which){
    set_mode(  get_mode() + 1  ); //advance to next-mode.
    document.querySelector('html').setAttribute("mode", get_mode());    //corrent mode

    self.document.title = "#" + get_mode();
    try{
    top.document.title  = "#" + get_mode();
    }catch(err){}
  }
  console.log(ev);
}

self.onkeydown = keydown_handler;