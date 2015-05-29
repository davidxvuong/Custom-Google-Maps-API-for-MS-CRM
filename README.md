# Custom Google Maps for Microsoft Dynamics CRM

##Motivation

At the MS Society of Canada, the Client Services team uses a piece of software called the [Microsoft Dynamics CRM](https://www.microsoft.com/en-us/dynamics/crm.aspx).The team uses this software to track down the amount of funding for equipment for patients suffering from Multiple Sclerosis.
There was also an embedded feature such that when there is an incoming call from a client, it would pop up the record of the client and the client service representative would then log all the information from the conversation.

Sometimes the client would need to go to an MS Society office to deal with some paperwork. My task was to develop a custom map that would display the nearby offices relative to the client's home address.

When the record of the client is retrieved, the CRM would pass in the address of the client into a JavaScript function called submitAddress(). For simplicity in designing the rest of the custom map, we represent this with a textbox that holds the address and a button that triggers the function.

##Implementation

- There are hundred of MS Society offices accross Canada, each of which has it's own Client Services team. All of the MS Society offices was conveniently stored inside an XML file (including other information such as the longitude and latitude coordinates). Using the [ajax function](http://api.jquery.com/jquery.ajax/) in jQuery, I was able to loop through each tag and retrieve the necessary information when the page is first loaded and display all the office locations on the map.
- I implemented a marker factory in order to generate the appropriate marker tags used to display on the map. The marker takes in the longitude and latitude coordinates of each office and returns a marker object. When a marker is clicked, the address is then showed in a dialog box.
- The information passed in by the CRM is usually in the form readable by humans. We would need to display the user's location on the map by geocoding the address and retrieve it's latitude and logitude coordinates. The marker factory function was then called to display he client's address in the center of the map alongside with the other offices. The client service representative would then be able to identify which is the closest office in the region of the client.

##Result & Output

On load:

![Alt text](https://dl.dropboxusercontent.com/u/9118489/Github%20Pictures/MS-CRM/1.png)

After clicking on one of the office locations:

![Alt text](https://dl.dropboxusercontent.com/u/9118489/Github%20Pictures/MS-CRM/2.png)

After entering the current office location (to be replaced by the information fetched by the CRM):

![Alt text](https://dl.dropboxusercontent.com/u/9118489/Github%20Pictures/MS-CRM/3.png)

After clicking on one of the home icon:

![Alt text](https://dl.dropboxusercontent.com/u/9118489/Github%20Pictures/MS-CRM/4.png)

Clicking on the closest office close to the home icon:

![Alt text](https://dl.dropboxusercontent.com/u/9118489/Github%20Pictures/MS-CRM/5.png)
