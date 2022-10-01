(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("level1",
{ "compressionlevel":-1,
 "height":21,
 "infinite":false,
 "layers":[
        {
         "data":[112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 3, 6, 6, 8, 8, 8, 8, 8, 6, 6, 3, 0,
            0, 7, 3, 6, 6, 8, 8, 8, 6, 6, 3, 7, 0,
            0, 11, 7, 3, 6, 6, 8, 6, 6, 3, 7, 11, 0,
            0, 15, 11, 7, 3, 6, 6, 6, 3, 7, 11, 15, 0,
            0, 15, 15, 11, 7, 3, 3, 3, 7, 11, 15, 15, 0,
            0, 15, 15, 15, 11, 3, 3, 3, 11, 15, 15, 15, 0,
            0, 15, 15, 11, 7, 3, 3, 3, 7, 11, 15, 15, 0,
            0, 15, 11, 7, 3, 6, 6, 6, 3, 7, 11, 15, 0,
            0, 11, 7, 3, 6, 6, 8, 6, 6, 3, 7, 11, 0,
            0, 7, 3, 6, 6, 8, 8, 8, 8, 6, 3, 7, 0,
            0, 3, 6, 6, 8, 8, 8, 8, 8, 6, 6, 3, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":21,
         "id":1,
         "name":"Kachelebene 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":13,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.9.0",
 "tileheight":8,
 "tilesets":[
        {
         "firstgid":1,
         "source":"tiles1.tsx"
        }],
 "tilewidth":16,
 "type":"map",
 "version":"1.9",
 "width":13
});