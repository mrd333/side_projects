Float Positioning


Explain float property


Important notes with popcode example


Wrap box divs in parent container and set contrast background
Declare two boxes with contrasting colors
Question how to float these
When both floated - question where has the background color gone (Explain collapsing parents in gotcha below)
Add box 3 with no float
Question where is it? -> Explain document flow and how it is hidden behind left box, show by adding padding to covered box
Float box 3 to right to show how it meets with other boxes
Add box 4 with no float - should be able to answer the question again
Float box right in contrasting color
Refer to youtube site - vertical clips -> Question how could this be done with right floated three boxes
Explain clear property and what it does
Clear boxes 3 & 4 right to produce effect






--------------------------------------------------------------------------------------------------------------------------------


Float Gotchas


Collapsing Parents
If a parent element contains nothing but floated elements the parent will collapse (Explain this using divs)
Explain that floated child elements will flow out of their parent container sometimes as their no longer part of the normal document flow.
Show students clearfix property to be added to parent container.


					Image Pushdown


Happens when the floated image is wider than the float - causes next element pushdown possibly. Ensure
            overflow : hidden



--------------------------------------------------------------------------------------------------------------------------------


If time left


Navigation work


Setup and run through navigation.
