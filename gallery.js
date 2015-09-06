var imageNames = require("./images/index.json");

var page = tabris.create("Page", {
  title: "The Big Bang Theory",
  background: "black",
  topLevel: true
});

var fullImage = tabris.create("ImageView", {
  layoutData: {top: 0, bottom: 0, left: 0, right: 0},
  image: {src: "images/" + imageNames[0] + ".jpg"},
  scaleMode: "auto"
}).appendTo(page);

var scrollView = tabris.create("ScrollView", {
  direction: "horizontal",
  layoutData: {left: 0, right: 0, bottom: 0, height: 164},
  background: "rgba(32, 32, 32, 0.6)"
}).appendTo(page);

imageNames.forEach(function(image, index) {
  tabris.create("ImageView", {
    layoutData: {top: 7, left: index * 157, width: 150, height: 150},
    image: {src: "images/" + image + "_thumb.jpg", width: 150, height: 150},
    highlightOnTouch: true
  }).on("tap", function() {
    fullImage.set("image", {src: "images/" + image + ".jpg"});
  }).appendTo(scrollView);
});

var fullscreenAction = tabris.create("Action", {
  title: "Fullscreen",
  placementPriority: "high"
}).on("select", toggleAction);

var thumbnailsAction = tabris.create("Action", {
  title: "Thumbnails",
  placementPriority: "high",
  visible: false
}).on("select", toggleAction);

page.open();

function toggleAction() {
  if (scrollView.get("visible")) {
    scrollView.set("visible", false);
    thumbnailsAction.set("visible", true);
    fullscreenAction.set("visible", false);
  } else {
    scrollView.set("visible", true);
    thumbnailsAction.set("visible", false);
    fullscreenAction.set("visible", true);
  }
}