//Models

var Face : GameObject;
var Tracts : GameObject; 
var Nuclei : GameObject;
var LBrain : GameObject[];
var RBrain : GameObject[];

var leftChildren;
var rightChildren;
var tractsChildren;
var nucleiChildren;

// Scroll lists
var trackList : UIScrollList;
var subViewLists : UIScrollList[];
var itemPrefab : GameObject;
var trackNumber : int;
var subViewItemNumber : int[];

//Menu switchable item
var subViewButton : UIBtnChangePanel;

//Control items
var faceSlider : UISlider;
var RSlider : UISlider;	
var LSlider : UISlider;
var tractsSlider : UISlider;
var nucleiSlider : UISlider;
var switchBar : UIScrollList;

//FPS variables
var updateInterval = 0.5;
private var lastInterval : double; // Last interval end time
private var frames = 0; // Frames over current interval
private var fps : float; // Current FPS


// Use this for initialization
function Start () 
{
	
	
	tractsChildren = Tracts.GetComponentsInChildren(Transform);
	nucleiChildren = Nuclei.GetComponentsInChildren(Transform);
	
	//Frames per second initialization
	lastInterval = Time.realtimeSinceStartup;
    frames = 0;
	
	//register delegate for sliders
	faceSlider.Value = 1;
	tractsSlider.Value = 1;
	RSlider.Value = 1;
	LSlider.Value = 1;
	
	faceSlider.AddValueChangedDelegate(SliderChanged);
	RSlider.AddValueChangedDelegate(SliderChanged);
	LSlider.AddValueChangedDelegate(SliderChanged);
	tractsSlider.AddValueChangedDelegate(SliderChanged);
	nucleiSlider.AddValueChangedDelegate(SliderChanged);
	
	
	// Add scroll list items:
	for(var i : int = 0; i<trackNumber; ++i)
	{
		var tLi : UIListItem = trackList.CreateItem(itemPrefab, "Track" + (i+1));
		tLi.data = (i+1);
		
		tLi.AddValueChangedDelegate(TrackSelected);
		
	}
	
	for(var n1 : int = 0; n1<subViewItemNumber[0]; ++n1)
	{
		
		var bLi : UIListItem = subViewLists[0].CreateItem(itemPrefab, "Broadmann" + (n1+1));
		bLi.data = (n1+1);
		bLi.AddValueChangedDelegate(TrackSelected);
	}
	
	for(var n2 : int = 0; n2<subViewItemNumber[1]; ++n2)
	{
		
		var lLi : UIListItem = subViewLists[1].CreateItem(itemPrefab, "Lobes" + (n2+1));
		lLi.data = (n2+1);
		lLi.AddValueChangedDelegate(TrackSelected);
	}
	
	for(var n3 : int = 0; n3<subViewItemNumber[2]; ++n3)
	{
		
		var gLi : UIListItem = subViewLists[2].CreateItem(itemPrefab, "Gyri" + (n3+1));
		gLi.data = (n3+1);
		gLi.AddValueChangedDelegate(TrackSelected);
	}
	switchBar.AddValueChangedDelegate(SwitchChanged);
	switchBar.SetSelectedItem(0);
	SwitchChanged();
	subViewButton.Text = switchBar.SelectedItem.Text;
	
	if(subViewButton.Text == "Hemisphere")
	{
		subViewButton.controlIsEnabled = false;
	}
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

function OnGUI () 
{
	// Display label with two fractional digits
    GUILayout.Label("" + fps.ToString("f2"));
}
// Update is called once per frame
function TrackSelected (obj : UIListButton)
{
	var bt : UIListButton = obj;
	
	var theData = bt.data;
	print(theData);
	
	
}

function PresetBrainPressed ()
{
	
	faceSlider.Value = 0;
	SliderChanged(faceSlider);
	RSlider.Value = 1;
	SliderChanged(RSlider);
	LSlider.Value = 1;
	SliderChanged(LSlider);
	nucleiSlider.Value = 0;
	SliderChanged(nucleiSlider);
	tractsSlider.Value = 0;
	SliderChanged(tractsSlider);

}


function PresetTractsPressed ()
{
	
	faceSlider.Value = 0;
	SliderChanged(faceSlider);
	RSlider.Value = 0;
	SliderChanged(RSlider);
	LSlider.Value = 0;
	SliderChanged(LSlider);
	nucleiSlider.Value = 0;
	SliderChanged(nucleiSlider);
	tractsSlider.Value = 1;
	SliderChanged(tractsSlider);

}

function PresetNucleiPressed ()
{
	
	faceSlider.Value = 0;
	SliderChanged(faceSlider);
	RSlider.Value = 0;
	SliderChanged(RSlider);
	LSlider.Value = 0;
	SliderChanged(LSlider);
	nucleiSlider.Value = 1;
	SliderChanged(nucleiSlider);
	tractsSlider.Value = 0;
	SliderChanged(tractsSlider);
	

}

function SwitchChanged ()
{
	subViewButton.Text = switchBar.SelectedItem.Text;
	if(subViewButton.Text == "Hemisphere")
	{
		subViewButton.controlIsEnabled = false;
		LBrain[0].SetActiveRecursively(true);
		RBrain[0].SetActiveRecursively(true);
		leftChildren = LBrain[0].GetComponentsInChildren(Transform);
		rightChildren = RBrain[0].GetComponentsInChildren(Transform);
		SliderChanged(RSlider);
		SliderChanged(LSlider);
		for(var i : int = 1; i < 4 ; i++)
		{
			LBrain[i].SetActiveRecursively(false);
			RBrain[i].SetActiveRecursively(false);	
			
		}
	}	
	else
	{
		switch(subViewButton.Text)
		{
		case "Broadmann" :
			subViewButton.panel = "BroadmannListPanel";
			LBrain[1].SetActiveRecursively(true);
			RBrain[1].SetActiveRecursively(true);
			leftChildren = LBrain[1].GetComponentsInChildren(Transform);
			rightChildren = RBrain[1].GetComponentsInChildren(Transform);
			SliderChanged(RSlider);
			SliderChanged(LSlider);
			for(var iB : int = 0; iB < 4; iB++)
			{
				if(iB != 1)
				{
					LBrain[iB].SetActiveRecursively(false);
					RBrain[iB].SetActiveRecursively(false);
					
				}	
				
			}
			break;
		case "Lobes" :
			subViewButton.panel = "LobesListPanel";
			LBrain[2].SetActiveRecursively(true);
			RBrain[2].SetActiveRecursively(true);
			leftChildren = LBrain[2].GetComponentsInChildren(Transform);
			rightChildren = RBrain[2].GetComponentsInChildren(Transform);
			SliderChanged(RSlider);
			SliderChanged(LSlider);
			for(var iL : int = 0; iL < 4; iL++)
			{
				if(iL != 2)
				{
					LBrain[iL].SetActiveRecursively(false);
					RBrain[iL].SetActiveRecursively(false);	
					
				}	
			}
			break;
		case "Gyri" :
			subViewButton.panel = "GyriListPanel";
			LBrain[3].SetActiveRecursively(true);
			RBrain[3].SetActiveRecursively(true);
			leftChildren = LBrain[3].GetComponentsInChildren(Transform);
			rightChildren = RBrain[3].GetComponentsInChildren(Transform);
			SliderChanged(RSlider);
			SliderChanged(LSlider);
			for(var iG : int = 0; iG < 4; iG++)
			{
				if(iG != 3)
				{
					LBrain[iG].SetActiveRecursively(false);
					RBrain[iG].SetActiveRecursively(false);	
					
				}
			}
			break;		
		}
		
		subViewButton.controlIsEnabled = true;
	}
}


function SliderChanged(obj : UISlider)
{
	
	var sliderTitle = obj.Text;	
	
	
	switch(sliderTitle)
		{
		case "Face" :
			if(obj.Value == 0)
					{
						Face.renderer.enabled = false;	
					}
					else
					{
						Face.renderer.enabled = true;	
						if(obj.Value == 1)
  		 				{
   							Face.renderer.material.shader = Shader.Find("Diffuse");
   						}
  						else
  						{
   							Face.renderer.material.shader = Shader.Find("Transparent/Diffuse");
   						}
						Face.renderer.material.color.a = obj.Value;
					}
			
			break;
		case "Brain R" :
			
			for(var RChild : Transform in rightChildren)
			{
				
				if(RChild.GetComponent(Renderer))
				{
					if(obj.Value == 0)
					{
						RChild.renderer.enabled = false;	
					}
					else
					{
						RChild.renderer.enabled = true;	
						if(obj.Value == 1)
  		 				{
   							RChild.renderer.material.shader = Shader.Find("Diffuse");
   						}
  						else
  						{
   							RChild.renderer.material.shader = Shader.Find("Transparent/Diffuse");
   						}
						RChild.renderer.material.color.a = obj.Value;
					}
				}
			}
			break;	
			
		case "Brain L" :
			
			for(var LChild : Transform in leftChildren)
			{
				
				if(LChild.GetComponent(Renderer))
				{
					if(obj.Value == 0)
					{
						LChild.renderer.enabled = false;	
					}
					else
					{
						LChild.renderer.enabled = true;	
						if(obj.Value == 1)
  		 				{
   							LChild.renderer.material.shader = Shader.Find("Diffuse");
   						}
  						else
  						{
   							LChild.renderer.material.shader = Shader.Find("Transparent/Diffuse");
   						}
						LChild.renderer.material.color.a = obj.Value;
					}
				}
			}
			break;
			
		case "Tracts" :
			
			for(var tractChild : Transform in tractsChildren)
			{
				
				if(tractChild.GetComponent(Renderer))
				{
					if(obj.Value == 0)
					{
						tractChild.renderer.enabled = false;	
					}
					else
					{
						tractChild.renderer.enabled = true;	
						if(obj.Value == 1)
  		 				{
   							tractChild.renderer.material.shader = Shader.Find("Diffuse");
   						}
  						else
  						{
   							tractChild.renderer.material.shader = Shader.Find("Transparent/Diffuse");
   						}
						tractChild.renderer.material.color.a = obj.Value;
					}
				}
			}
			break;
		case "Nuclei" :
			
			for(var nucleiChild : Transform in nucleiChildren)
			{
				if(nucleiChild.GetComponent(Renderer))
				{
					if(obj.Value == 0)
					{
						nucleiChild.renderer.enabled = false;	
					}
					else
					{
						nucleiChild.renderer.enabled = true;	
						if(obj.Value == 1)
  		 				{
   							nucleiChild.renderer.material.shader = Shader.Find("Diffuse");
   						}
  						else
  						{
   							nucleiChild.renderer.material.shader = Shader.Find("Transparent/Diffuse");
   						}
						nucleiChild.renderer.material.color.a = obj.Value;
					}
				}

			}
			break;		
		}
	
		

}








