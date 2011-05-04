var brainRight: GameObject;

var brainLeft: GameObject;

var brainConnection: GameObject;

var mySkin : GUISkin;

var showView;
var viewButtonText : String;

var slider1 : float=1;
var slider2 : float=1;
var slider3 : float=1;

var updateInterval = 0.5;
private var lastInterval : double; // Last interval end time
private var frames = 0; // Frames over current interval
private var fps : float; // Current FPS

function Start() {
    lastInterval = Time.realtimeSinceStartup;
    frames = 0;
    viewButtonText = "Views";
}

function OnGUI () {
	
	GUI.skin = mySkin;
	
	if(GUI.Button(Rect(30,620,100,30),viewButtonText))
	{
		showView = !showView;
		if(!showView)
		{
			viewButtonText = "Views";
		}
	}
	
	if(showView)
	{
	viewButtonText = "Hide Sliders";	
	GUI.Label(Rect(50,680,80,20),"Right Side");	
  	slider1 = GUI.HorizontalSlider( Rect(20,700,175,30), slider1,0, 1);
   if(slider1 == 1)
  	 
   {
   		
   		brainRight.renderer.material.shader = Shader.Find("Diffuse");
   }
   else{
   		brainRight.renderer.material.shader = Shader.Find("Transparent/Diffuse");
   }
   
   brainRight.renderer.material.color.a = slider1;
	
   GUI.Label(Rect(300, 680 ,80,20),"Left Side");	
  	slider2 = GUI.HorizontalSlider( Rect(280, 700 ,175,30), slider2,0, 1);
   if(slider2 == 1)
  	 
   {
   		brainLeft.renderer.material.shader = Shader.Find("Diffuse");
   }
   else{
   		brainLeft.renderer.material.shader = Shader.Find("Transparent/Diffuse");
   }
   
   brainLeft.renderer.material.color.a = slider2;
   
   GUI.Label(Rect(550, 680 ,150,20),"Brain Connection");	
  	slider3 = GUI.HorizontalSlider( Rect(520, 700 ,175,30), slider3,0, 1);
   if(slider3 == 1)
  	 
   {
   		brainConnection.renderer.material.shader = Shader.Find("Diffuse");
   }
   else{
   		brainConnection.renderer.material.shader = Shader.Find("Transparent/Diffuse");
   }
   
   brainConnection.renderer.material.color.a = slider3;
	}	

	 
	 // Display label with two fractional digits
    GUILayout.Label("" + fps.ToString("f2"));
	
	
   
   
   
   
}
function Update() {
    ++frames;
    var timeNow = Time.realtimeSinceStartup;
    if( timeNow > lastInterval + updateInterval )
    {
        fps = frames / (timeNow - lastInterval);
        frames = 0;
        lastInterval = timeNow;
    }
}


