import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import './main.html';

interface = "la barre espace"

pressed = true

raceTimes = {}

secondes = 0

total = 0

dizièmes = 0

position = 0

compteur = 1

isItNight = false

intervalsArray1 = []

textArray = [
//0
()=>`Pouvez-vous appuyer sur ${interface} s'il vous plaît?`,
//1
()=>`Bravo! vous avez mis seulement ${secondes},${dizièmes} seconde(s) à appuyer sur ${interface}.`,
//2
()=>`du point de vue de la rapidité de votre réaction, vous vous placez en ${position}e position`,
//3
()=>`par rapport aux ${total} autre(s) personnes qui ont visité ce site avant vous.`,
//4
()=>`Je vous invite à venir remettre votre titre en jeu, si vous l'osez, le 14 Janvier aux Bains Douches (Montbéliard).`,
]

isMobile = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check; 
  // Note here that tablet will be treated as PC, too!
};

FlowRouter.route('/', {
  name:"home",  
    action: function() {
        // test logique téléphone ou ordi? et redirect to reader
        FlowRouter.go("/subs")
    }
});


FlowRouter.route('/subs', {
  name:"subs",
    action: function() {
      if(isMobile()){
            BlazeLayout.render('mobileLayout');
      }else{
            BlazeLayout.render('desktopLayout');
        }
    }
});

Template.desktopLayout.onRendered(function(){

  initializeSvg()

  allPeeps = document.getElementsByClassName("hand")
  console.log(allPeeps)

  for (var i = allPeeps.length - 1; i >= 0; i--) {
    animateHand(i)
  }

  document.getElementById("blah").innerHTML = textArray[0]()

  setTimeout(()=>{
    pressed = false
    raceTimes.start = new Date()
    document.getElementById("blah").style.opacity = "1"
  },1000)

})

Template.mobileLayout.onRendered(function(){

 initializeSvg()

  interface = "votre écran"
  
  window.addEventListener('touchend', function (e){
    touchOrKeyEvent()
  })

  allPeeps = document.getElementsByClassName("hand")
  console.log(allPeeps)

  for (var i = allPeeps.length - 1; i >= 0; i--) {
    animateHand(i)
  }

  document.getElementById("blah").innerHTML = textArray[0]()

  setTimeout(()=>{
    pressed = false
    raceTimes.start = new Date()
    document.getElementById("blah").style.opacity = "1"
  },1000)

})




function animateHand(i){
    peepNumber = i

  function timerFunction(peepNumber){

    if (isItNight) {
      return
    }else{

      let delay = 2000 + Math.floor(Math.random() * 8000)

      intervalsArray1[peepNumber] = setTimeout(()=>{
        // logic here
        howmanyaudio = (document.getElementsByClassName("audio").length)-1
        var audio = document.getElementById("audio"+Math.floor(1+Math.random() * howmanyaudio))
        audio.volume=0.2;
        audio.play();

        console.log("adding peep ", peepNumber)
        allPeeps[peepNumber].classList.add("animateHand");

          setTimeout(()=>{
            console.log("removing peep ", peepNumber)
            allPeeps[peepNumber].classList.remove("animateHand");
          }, 500)

      timerFunction(peepNumber);
      
      }, delay);

    }
  } 
  
  timerFunction(peepNumber);
}


showNight = function(){

  document.getElementById("blah").style.opacity = 0

  document.body.style.backgroundColor = "#1a1a1a"

  isItNight = true
  buttonUpDown = true;

  for (var i = intervalsArray1.length - 1; i >= 0; i--) {
    window.clearInterval(intervalsArray1[i])
  }

  setInterval(()=>{
    if (buttonUpDown) {
      document.getElementById("buttontop").style.transform="translateY(2px)"
    }else{
      document.getElementById("buttontop").style.transform="translateY(0px)"
    }
    buttonUpDown = !buttonUpDown
  },500)

  allHidden = document.getElementsByClassName("firstHidden")

  for (var i = allHidden.length - 1; i >= 0; i--) {
    allHidden[i].classList.remove("firstHidden")
  }
}

document.onkeydown = function(e) {
  e = e || window.event
  if(e.keyCode =='32'){
    touchOrKeyEvent()
  }
}

touchOrKeyEvent = function(){
  if (pressed == false) {
    moveOn()
    document.getElementById("blah").innerHTML = textArray[compteur]()
    compteur +=1
  }else{
    return
  }

  pressed = true

}

moveOn = function(){

  logScore()

  autonext = setInterval(function(){
    if(compteur < textArray.length){
      document.getElementById("blah").innerHTML = textArray[compteur]()
      compteur +=1
    }else{
      window.clearInterval(autonext)
      showNight()
    }
  },7000)

}

logScore = function(){
  raceTimes.finish = new Date()

  secondes = Math.floor((raceTimes.finish - raceTimes.start)/1000);
  dizièmes = Math.floor(((raceTimes.finish - raceTimes.start)%1000)/ 10);

  if (secondes<1) {
    item = ()=>"Vous êtes sûr.e que vous avez pas triché en visitant le site deux fois? hmm. Bien joué!"
    textArray.splice(2, 0, item)
  }

  Meteor.call('logScore', raceTimes, (error, result) => { 
      total = (result.totalVisits)-1
      position = result.position
      console.log(error || result)

      if (result.totalVisits == result.position) {
        item = ()=>"Vous êtes dernier.e quoi en gros. Ça veut dire que vous avez peut-être regardé longtemps mon dessin, ça me touche, merci."
        textArray.splice(4, 0, item)
      }
   });
  }

initializeSvg = function(){
  const handIds = ["handpeep1","handpeep2","handpeep3","handpeep4","handpeep5","handpeep6","handpeep7","handpeep8", "handpeep9", "handpeep11", "handpeep0","handtrio","handduethom","handduetmeuf"]
  const toHide = ["scribb", "butonbot", "butontop", "buttontop", "light", "clicsamuel", "clicresas", "clicamicale"]
  const mixBlendGuy = ["light", "color"]

  for (var i = handIds.length - 1; i >= 0; i--) {
    target = document.getElementById(handIds[i])
    if (target != null) {
      target.classList.add("hand")
    }
  }

  for (var i = toHide.length - 1; i >= 0; i--) {
    target = document.getElementById(toHide[i])
    if (target != null) {
      target.classList.add("firstHidden","nightrans")
    }
  }

  for (var i = mixBlendGuy.length - 1; i >= 0; i--) {
    target = document.getElementById(mixBlendGuy[i])
    if (target !=null) {
      target.classList.add("firstHidden","nightrans")
      target.style.mixBlendMode="multiply"      
    }
  }

}
