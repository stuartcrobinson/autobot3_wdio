// @ts-check
import { Load } from '../../../aqua/support/hooks';
import { editorPage } from '../../ui-model/wordsmith/editor/editor.page';

describe('Create a project', () => {
  before(() => { Load.cityGuideTemplateFromGallery(); });

  it('from CSV upload', () => {
    editorPage.openPreviewButton.click_waitForNotExisting();

    editorPage.previewPane.narrativeOutput.waitForText(expected);

    TODO no this doesn't work
    TODO no this doesn't work
    TODO no this doesn't work
    TODO no this doesn't work
    TODO no this doesn't work
    TODO no this doesn't work
    TODO no this doesn't work

    how to test the preview?  
    * make sure the text length is within a certain range? 
    * make sure text changes for each data row change using carets
    * make sure text changes for each data row change by typing in values
    * make sure first sentence contains 'Houston'
    * make sure "refresh" changes the narrative
    * make sure toast pops up for render html
    * include some html and make sur eit renders -- add this string to top of template: <a href="www.google.com">mylink</a>
        * then do visual test of the 'a' link in the html-preview
        * then do viz test when render is turned off
        use this text:
        <div><a href="www.google.com">mylink</a>
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
</div>

  });
});


const expected = `Officially the fifth-largest city in the United States, Houston definitely has quite a bit to offer. Here are a few of the most-recommended choices when spending some time in Space City:

Houston is home to numerous impressive museums, galleries, and exhibits. Three of the most famous collections can be found at the Museum of Fine Arts, Houston Museum of Natural Science, and Holocaust Museum, though others to consider are the Health Museum, Buffalo Soldier National Museum, Space Center Houston, ArtCar Museum, Museum of Fine Arts, and Houston Museum of Natural Science.

After seeing an exhibit or two, why not scope out some of the terrific outdoor attractions that Houston has to offer? Hermann Park, Buffalo Bayou Park, and Memorial Park should all be on your radar. Discovery Green, Bayou Bend, Cullen Sculpture Garden, East End Park, and Smither Park are other great outdoor options.

Depending on what your itinerary allows, you may find that a couple of the local sports teams are in action. The major franchises (the Astros, Texans, and Rockets) continually draw big audiences, while the other teams (the Dynamo and Aeros) typically cater to some of the biggest die-hard supporters around.

Additional worthwhile places we'd suggest experiencing in the Houston area include NASA Space Center, Cockrell Butterfly Center, Waterwall, Theatre Under the Stars, Rodeo Houston, Glenwood Cemetery, Rothko Chapel, and Beercan House.`;



// A fast-growing city that seems to have something for everybody, Houston and its surroundings the fifth-biggest metro in the United States. Let's summarize a few of our best recommendations when spending some time in Space City:

// Houston is home to a wide array of impressive exhibits and museums. Three of the most noteworthy collections can be found at the Museum of Fine Arts, Houston Museum of Natural Science, and Holocaust Museum, while others worth seeing are the Health Museum, Buffalo Soldier National Museum, Space Center Houston, ArtCar Museum, Museum of Fine Arts, and Houston Museum of Natural Science.

// After experiencing an exhibit or two, how about scoping out one or two of the wonderful outdoor spaces that are scattered around the Houston metro? Hermann Park, Buffalo Bayou Park, and Memorial Park should absolutely be on your radar. Other solid outdoor options include Discovery Green, Bayou Bend, Cullen Sculpture Garden, East End Park, and Smither Park.

// Depending on the time of the year, you may find that a couple of the local sports teams are in action. The big-ticket franchises (the Astros, Texans, and Rockets) frequently draw large audiences, while the other famous teams (the Dynamo and Aeros) offer serious athletic competition in fun, more-intimate atmospheres.

// Additional Houston-area spots to consider include NASA Space Center, Cockrell Butterfly Center, Waterwall, Theatre Under the Stars, Rodeo Houston, Glenwood Cemetery, Rothko Chapel, and Beercan House.


// Officially the fifth-largest city in the United States, Houston definitely has quite a bit to offer. Here are a few of the most-recommended choices when spending some time in Space City:

// Houston is home to numerous impressive museums, galleries, and exhibits. Three of the most famous collections can be found at the Museum of Fine Arts, Houston Museum of Natural Science, and Holocaust Museum, though others to consider are the Health Museum, Buffalo Soldier National Museum, Space Center Houston, ArtCar Museum, Museum of Fine Arts, and Houston Museum of Natural Science.

// After seeing an exhibit or two, why not scope out some of the terrific outdoor attractions that Houston has to offer? Hermann Park, Buffalo Bayou Park, and Memorial Park should all be on your radar. Discovery Green, Bayou Bend, Cullen Sculpture Garden, East End Park, and Smither Park are other great outdoor options.

// Depending on what your itinerary allows, you may find that a couple of the local sports teams are in action. The major franchises (the Astros, Texans, and Rockets) continually draw big audiences, while the other teams (the Dynamo and Aeros) typically cater to some of the biggest die-hard supporters around.

// Additional worthwhile places we'd suggest experiencing in the Houston area include NASA Space Center, Cockrell Butterfly Center, Waterwall, Theatre Under the Stars, Rodeo Houston, Glenwood Cemetery, Rothko Chapel, and Beercan House.