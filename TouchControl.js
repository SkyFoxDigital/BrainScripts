var targetItem : GameObject;
var GUICamera : Camera;
var ambient : GameObject;
//item movement
var rotationRate : float = 0.5;
private var wasRotating;

var zoomMin : float;
var zoomMax : float;
private var zoomDistance : float;

//ScrollingBar
private var scrollPosition : Vector2 = Vector2.zero;
private var scrollVelocity : float = 0;
private var timeTouchPhaseEnded: float;
private var inertiaDuration : float = 0.5f;

private var itemInertiaDuration : float = 1.0f;
private var itemTimeTouchPhaseEnded: float;
private var rotateVelocityX : float = 0;
private var rotateVelocityY : float = 0;


var hit: RaycastHit;
//Collider and Layers
var touchCollider : GameObject;
private var sphereCollider : SphereCollider;
var layerMaskGUI = 1 << 9;
var layerMask;

//Scripts references
var controler : Controler;

function Start()
{

	//targetItem = GameObject.Find("Brain").gameObject;
	zoomDistance = 0;
	//sphereCollider = touchCollider.GetComponent(SphereCollider) as SphereCollider;
	//sphereRadius = sphereCollider.radius;
	layerMask =~ layerMaskGUI;
	
	controler = GetComponent(Controler);
}




function FixedUpdate()
{
	
	if (Input.touchCount > 0) 
	{		//	If there are touches...
			var theTouch : Touch = Input.GetTouch (0);		//	Cache Touch (0)
			
			var ray = Camera.main.ScreenPointToRay(theTouch.position);
			var GUIRay = GUICamera.ScreenPointToRay(theTouch.position);
			
			if(Physics.Raycast(GUIRay,hit,50,layerMaskGUI))
         	{
         			//Hit GUI elements
         			
         	}	
         	else if(Physics.Raycast(ray,hit,50,layerMask))
         	{			
         			
         			if(Input.touchCount == 2)
						{
							var theTouch2 : Touch = Input.GetTouch (1);
							var currentDistance : Vector2 = (theTouch.position - theTouch2.position);
							var previousDistance : Vector2 = (theTouch.position - theTouch.deltaPosition) - (theTouch2.position - theTouch2.deltaPosition);
				
							var theDelta = currentDistance.magnitude - previousDistance.magnitude;
				
							//print(theDelta);
							zoomDistance = Mathf.Clamp(zoomDistance-theDelta*Time.deltaTime*1.2,zoomMin,zoomMax);
							
							
							//Camera.main.orthographicSize = zoomDistance; 
							targetItem.transform.position.z = zoomDistance;
							ambient.transform.position.z = zoomDistance;

							
						}
						
						
         				if(Input.touchCount == 1)
						{
							if (theTouch.phase == TouchPhase.Began) 
         					{
         						wasRotating = false;	
         					}		
         					
         					if (theTouch.phase == TouchPhase.Moved) 
         					{
          		        		RotateTransform.autoRotation = false;
         						targetItem.transform.Rotate(theTouch.deltaPosition.y * rotationRate, -theTouch.deltaPosition.x * rotationRate,0,Space.World);
         						wasRotating = true;
         					}		
         	
         					if (theTouch.phase == TouchPhase.Ended || theTouch.phase == TouchPhase.Canceled) 
         					{
         						if(wasRotating==true)
         						{
         							if(Mathf.Abs(theTouch.deltaPosition.x) >=5)
         							{
         								rotateVelocityX = theTouch.deltaPosition.x / theTouch.deltaTime;
           							}
           							if(Mathf.Abs(theTouch.deltaPosition.y) >=5)
         							{
         								rotateVelocityY = theTouch.deltaPosition.y / theTouch.deltaTime;
           							}	
         						itemTimeTouchPhaseEnded = Time.time;
         						}
         						else if(hit.collider.gameObject.tag != "TouchCollider"){
         							controler.TouchOnModel(hit.transform);
         							//Debug.Log(hit.transform.name);
         						}
         						if(theTouch.tapCount == 2)
         						{
         							targetItem.transform.rotation = Quaternion.identity;
         						}
         			
         					}
						}
         			//}		 	
				
			}


			
						
			
	}
	if(Input.touchCount == 0 )
    {
         if(scrollVelocity != 0.0)
         	{
         		//slowing down
         		var t : float = (Time.time - timeTouchPhaseEnded) / inertiaDuration;
         		var frameVelocity : float = Mathf.Lerp(scrollVelocity, 0 , t);
         				
         		scrollPosition.x -= frameVelocity * Time.deltaTime;
         				
         		if(t >= inertiaDuration)
         			scrollVelocity = 0.0f;
         				
         				
         	}	
         
         if(rotateVelocityX != 0.0f || rotateVelocityY != 0.0f)
         	{
         		//slowing down
         		var ty : float = (Time.time - itemTimeTouchPhaseEnded) / itemInertiaDuration;
         		var XVelocity : float = Mathf.Lerp(rotateVelocityX, 0 , ty);
         		var YVelocity : float = Mathf.Lerp(rotateVelocityY, 0 , ty); 	
         		
         				
         		if(ty >= inertiaDuration)
         		{
         			rotateVelocityX = 0.0f;
         			rotateVelocityY = 0.0f;
         			
         		}	
         		//targetItem.transform.Rotate(YVelocity*Time.deltaTime, -XVelocity * Time.deltaTime * rotationRate,0,Space.World);		
         				
         	}	
        
        
      }	
}
