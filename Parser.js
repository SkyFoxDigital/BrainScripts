import System.Xml;


//TextBox

var textBox : UIListItem;
var textSource : TextAsset;
// npc data
var npcName : String;
var npcType : String;

// chat data
var maxData : int;
var showData : int;
var data : String[];

//Dictionary for Data

var textDataBase : Hashtable = new Hashtable();
var dataKeys = new Array();
var dataValues = new Array();

function Start()
{
	// initialise data
	maxData = 0;
	showData = 0;
	npcName = "unset";
	npcName = "unset";
	data = null;
	
	//readxml from chat.xml in project folder (Same folder where Assets and Library are in the Editor)
      var reader:XmlReader = XmlReader.Create("Assets/MyTextAssets/TextSourceXML.xml");
	  //while there is data read it
      while(reader.Read())
      {
		//when you find a npc tag do this
         if(reader.IsStartElement("npc"))
         {
			// get attributes from npc tag
            npcName=reader.GetAttribute("name");
			maxData = parseInt(reader.GetAttribute("entries"));
			
			
			
			//allocate string pointer array
			data = new String[maxData];
			
			//read speach elements (showdata is used instead of having a new int I reset it later)
			for(showData = 0;showData<maxData;showData++)
			{
				
				reader.Read();
				if(reader.IsStartElement("speach"))
				{
					//fill strings
					textDataBase[npcName as String] = reader.ReadString();
					
				}
			}
			//reset showData index
			showData=0;
         }
      }
      
      
	var str = textDataBase["Tract1"];
	textBox.Text = str;

	for(var item : DictionaryEntry in  textDataBase)
	{
		dataKeys.Add(item.Key);	
		dataValues.Add(item.Value);	
	}	
	
	
	
	
	
	
	
	
	
	
	
}