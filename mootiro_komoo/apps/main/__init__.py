html {
    padding: 0;
    margin: 0;
}
body {
  /* http://www.ms-studio.com/articles.html */
  font-family: Ubuntu, Helvetica, 'Trebuchet MS', sans-serif;
  font-size: 14px;
  margin: 0;
  padding: 0;
  background-color: #fff;
}
img { border: 0px }
/* Link pattern */
a { text-decoration: none }
a:link    { color: #F39200 }
a:visited { color: #F39200 }
a:hover   { color: black }
a:active { background-color: #eee }
ul {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}
table { border-collapse: collapse }
/* Reusable styles */
.button {
    background-color: #3EBAC2;
    color: #fff;
    border: none;
    border-radius        : 6px;
    -moz-border-radius   : 6px;
    -webkit-border-radius: 6px;
    cursor: pointer;
    padding: 3px;
}
/* Mootiro Bar */
.mootiro_bar a { color: #3EBAC2 }
/* Structural elements */
#root {
    width: 100%;
    clear: both;
}
#logo {
    display: inline-block;
    font-family: monospace;
    font-size: 30px;
    padding: 0 10px;
}
#top {
    padding: 15px 0;
    background: #dceff4;
}
#top #menu {
    display: inline-block;
    background: #eed;
    margin-bottom: 5px;
}
#top #menu li {
    display: inline-block;
    margin: 0;
    padding: 4px 15px;
    float: left;
}
#top #menu li,
.map-tab,
.map-button {
    border: 1px solid #c7c7c7;

    background-color: #ededed;
    /* Generated from: http://gradients.glrzad.com/ */
    background-image: linear-gradient(bottom, #CECECE 0%, #EDEDED 100%) !important;
    background-image: -o-linear-gradient(bottom, #CECECE 0%, #EDEDED 100%) !important;
    background-image: -moz-linear-gradient(bottom, #CECECE 0%, #EDEDED 100%) !important;
    background-image: -webkit-linear-gradient(bottom, #CECECE 0%, #EDEDED 100%) !important;
    background-image: -ms-linear-gradient(bottom, #CECECE 0%, #EDEDED 100%) !important;
    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #CECECE), color-stop(1, #EDEDED)) !important;
    -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#CECECE, endColorstr=#EDEDED)";
}
#top #menu li:hover, #top #menu li.selected,
.map-tab:hover, .map-tab.selected,
.map-button:hover, .map-button.selected {
    color: #fff;
    background: #3EBAC2 !important;
}
#top #menu li:first-child,
.map-tab:first-child {
    border-radius        : 6px 0 0 6px;
    -moz-border-radius   : 6px 0 0 6px;
    -webkit-border-radius: 6px 0 0 6px;
}
#top #menu li:last-child,
.map-tab:last-child {
    border-radius        : 0 6px 6px 0;
    -moz-border-radius   : 0 6px 6px 0;
    -webkit-border-radius: 0 6px 6px 0;
}
.map-button {
    display: inline-block;
    padding: 5px;
    margin: 0 5px;
}
.map-panel,
.map-button {
    border-radius        : 6px;
    -moz-border-radius   : 6px;
    -webkit-border-radius: 6px;
}
.map-panel {
    background: #dceff4;
}
.map-panel .content,
.map-panel .map-panel-buttons,
.map-panel .map-panel-title{
    margin: 10px;
}
#top #menu, #top #search { margin-left: 60px }

#search-bar {
    width: 450px;
    font-size: 16px;
}
#search-button { margin-left: 4px }
