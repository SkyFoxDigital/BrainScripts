var targetItem : GameObject;
var GUICamera : Camera;

//item movement
var rotationRate : float = 0.3;
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





function Start()
{

	//targetItem = GameObject.Find("Brain").gameObject;
	zoomDistance = Camera.main.orthographicSize;
	
}




function FixedUpdate()
{
	
	if (Input.touchCount > 0) 
	{		//	If there are touches...
			var theTouch : Touch = Input.GetTouch (0);		//	Cache Touch (0)
			
			var ray = GUICamera.camera.ScreenPointToRay(theTouch.position);
			
			
			if(Physics.Raycast(ray,hit,40))
         	{
         			if(hit.collider.gameObject.tag == "GUICollider")
         			{
         				//Hitting GUI elements
         				print("Hit GUI");
         			}	
         			else if(hit.collider.gameObject.tag == "TouchCollider")
         			{
         				print("Hit Models");
         				if(Input.touchCount == 2)
						{
							var theTouch2 : Touch = Input.GetTouch (1);
							var currentDistance : Vector2 = (theTouch.position - theTouch2.position);
							var previousDistance : Vector2 = (theTouch.position - theTouch.deltaPosition) - (theTouch2.position - theTouch2.deltaPosition);
				
							var theDelta = currentDistance.magnitude - previousDistance.magnitude;
				
							//print(theDelta);
							zoomDistance = Mathf.Clamp(zoomDistance-theDelta*Time.deltaTime,zoomMin,zoomMax);
		
							Camera.main.orthographicSize = zoomDistance; 
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
         		
         						if(theTouch.tapCount == 2)
         						{
         							targetItem.transform.rotation = Quaternion.identity;
         						}
         			
         					}
						}
         			}		 	
				
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


