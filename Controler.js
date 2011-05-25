var Head : Transform;

//Models

var Face : GameObject;

private var Lobes : GameObject;
private var Broadmann : GameObject;
private var Gyri : GameObject;
private var Tracts : GameObject;
private var Nuclei : GameObject;
var LBrain : GameObject[];
var RBrain : GameObject[];

var leftChildren;
var rightChildren;
var tractsChildren;
var nucleiChildren;

private var lastObjectActive;
private var justStarted;

//Prefab SpawnPoints
var broadmannSpawn : Transform;
var lobesSpawn : Transform;
var gyriSpawn : Transform;
var tractsSpawn : Transform;
var nucleiSpawn : Transform;

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

//Testing Label
var theLabel: SpriteText;
private var lastObjectTouched : Transform;


// Use this for initialization
function Start () 
{
	
	justStarted = true;
		
	//register delegate for sliders
	faceSlider.Value = 0;
	SliderChanged(faceSlider);
	tractsSlider.Value = 0;
	SliderChanged(tractsSlider);
	RSlider.Value = 1;
	LSlider.Value = 1;
	nucleiSlider.Value = 0;
	SliderChanged(nucleiSlider);
	
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
	
	
	if(subViewButton.Text == "Hemisphere")
	{
		subViewButton.controlIsEnabled = false;
	}
	
	
	
	
	
}

function CreateInstances()
{
	if(justStarted)
	{
		print("Instantiating models");
		Broadmann = Instantiate(Resources.Load("Broadmann")) as GameObject;
		Broadmann.transform.parent = Head;
		Broadmann.transform.position = broadmannSpawn.transform.position;//Vector3(-1.109, -0.031, -1.684);
		Broadmann.transform.rotation = broadmannSpawn.transform.rotation;
		LBrain[1] = Broadmann.Find("BroadmannLeft") as GameObject;
		RBrain[1] = Broadmann.Find("BroadmannRight") as GameObject; 
		Broadmann.SetActiveRecursively(false);
	
		Lobes = Instantiate(Resources.Load("Lobes")) as GameObject;
		Lobes.transform.parent = Head;
		Lobes.transform.position = lobesSpawn.transform.position;
		Lobes.transform.rotation = lobesSpawn.transform.rotation;
		LBrain[2] = Lobes.Find("LobesLeft") as GameObject;
		RBrain[2] = Lobes.Find("LobesRight") as GameObject; 
		Lobes.SetActiveRecursively(false);
		
		Gyri = Instantiate(Resources.Load("Gyri")) as GameObject;
		Gyri.transform.parent = Head;
		Gyri.transform.position = gyriSpawn.transform.position;
		Gyri.transform.rotation = gyriSpawn.transform.rotation;
		LBrain[3] = Gyri.Find("GyriLeft") as GameObject;
		RBrain[3] = Gyri.Find("GyriRight") as GameObject; 
		Gyri.SetActiveRecursively(false);
	
		Tracts = Instantiate(Resources.Load("Tracts")) as GameObject;
		Tracts.transform.parent = Head;
		Tracts.transform.position = tractsSpawn.transform.position;
		Tracts.transform.rotation = tractsSpawn.transform.rotation;
		tractsChildren = Tracts.GetComponentsInChildren(Transform);
	
		Tracts.SetActiveRecursively(true);
	
		Nuclei = Instantiate(Resources.Load("Nuclei")) as GameObject;
		Nuclei.transform.parent = Head;
		Nuclei.transform.position = nucleiSpawn.transform.position;
		Nuclei.transform.rotation = nucleiSpawn.transform.rotation;
		nucleiChildren = Nuclei.GetComponentsInChildren(Transform);

		Nuclei.SetActiveRecursively(true);
		
		justStarted = false;
	}
	else
	{
		print("instances already loaded");	
	}
}
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

		switch(switchBar.SelectedItem.Text)
		{
		case "Hemisphere" :
	
			subViewButton.controlIsEnabled = false;
			LBrain[0].SetActiveRecursively(true);
			RBrain[0].SetActiveRecursively(true);
			leftChildren = LBrain[0].GetComponentsInChildren(Transform);
			rightChildren = RBrain[0].GetComponentsInChildren(Transform);
			SliderChanged(RSlider);
			SliderChanged(LSlider);
			
			if(lastObjectActive)
			{
				LBrain[lastObjectActive].SetActiveRecursively(false);
				RBrain[lastObjectActive].SetActiveRecursively(false);	
			}	
		
			lastObjectActive = 0;
			break;	
		case "Broadmann" :
			subViewButton.panel = "BroadmannListPanel";
			LBrain[1].SetActiveRecursively(true);
			RBrain[1].SetActiveRecursively(true);
			leftChildren = LBrain[1].GetComponentsInChildren(Transform);
			rightChildren = RBrain[1].GetComponentsInChildren(Transform);
			SliderChanged(RSlider);
			SliderChanged(LSlider);
		
			LBrain[lastObjectActive].SetActiveRecursively(false);
			RBrain[lastObjectActive].SetActiveRecursively(false);	
			
		
			lastObjectActive = 1;
			break;
		case "Lobes" :
			subViewButton.panel = "LobesListPanel";
			LBrain[2].SetActiveRecursively(true);
			RBrain[2].SetActiveRecursively(true);
			leftChildren = LBrain[2].GetComponentsInChildren(Transform);
			rightChildren = RBrain[2].GetComponentsInChildren(Transform);
			SliderChanged(RSlider);
			SliderChanged(LSlider);
			
			LBrain[lastObjectActive].SetActiveRecursively(false);
			RBrain[lastObjectActive].SetActiveRecursively(false);	
			
		
			lastObjectActive = 2;
			break;
		case "Gyri" :
			subViewButton.panel = "GyriListPanel";
			LBrain[3].SetActiveRecursively(true);
			RBrain[3].SetActiveRecursively(true);
			leftChildren = LBrain[3].GetComponentsInChildren(Transform);
			rightChildren = RBrain[3].GetComponentsInChildren(Transform);
			SliderChanged(RSlider);
			SliderChanged(LSlider);
			
			LBrain[lastObjectActive].SetActiveRecursively(false);
			RBrain[lastObjectActive].SetActiveRecursively(false);	
			
		
			lastObjectActive = 3;
			break;		
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
						
						Face.renderer.material.color.a = obj.Value*0.4;
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
   							tractChild.renderer.material.shader = Shader.Find("Specular");
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


function TouchOnModel(obj : Transform)
{	
	if(lastObjectTouched != obj && obj.renderer)
	{
		if(lastObjectTouched)
		{
			lastObjectTouched.renderer.material.shader = Shader.Find("Transparent/Diffuse");
		}
		theLabel.Text = obj.transform.name;
	
		if(RSlider.Value > 0.1)
		{
			RSlider.Value = 0.1;
			SliderChanged(RSlider);
		}
		if(LSlider.Value > 0.1)
		{
			LSlider.Value = 0.1;
			SliderChanged(LSlider);
		}
	
		
		obj.renderer.material.shader = Shader.Find("Diffuse");
		
		
		lastObjectTouched = obj;
	}
	
		
	
	
}




