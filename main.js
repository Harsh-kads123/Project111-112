Prediction1="";

Webcam.set({
    width:350,
    height:300,
    img_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="Captured_image" src="'+data_uri+'"/>';    
    });
}
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1WzhCxphP/model.json',modelLoaded());

function modelLoaded()
{
    console.log("Model Loaded");
}

function speak()
{
    var synth=window.speechSynthesis;
    speak_data="The Prediction is "+Prediction1;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
    img=document.getElementById('Captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results)
{
  if(error){
      console.error(error);
  }
  else{
      console.log(results);
      document.getElementById("result_gesture_name").innerHTML=results[0].label;
      Prediction1=results[0].label;
      speak();
      if(result[0].label == "Peace-out" )
      {
          document.getElementById("result_emoji").innerHTML="&#9996;";
      }
      if(result[0].label == "Hi-Five" )
      {
          document.getElementById("result_emoji").innerHTML="&#9995;";
      }
      if(result[0].label == "Soooper" )
      {
          document.getElementById("result_emoji").innerHTML="&#128076;";
      }
      if(result[0].label == "Thumbs-Up" )
      {
          document.getElementById("result_emoji").innerHTML="&#128077;";
      }
      if(result[0].label == "Thumbs-Down" )
      {
          document.getElementById("result_emoji").innerHTML="&#128078;";
      }
  }
}