const express = require("express");
const router = express.Router();
const Bike = require("../models/Bike");
const User = require("../models/User");
const helpers = require("../helpers/function");


router.get("/", helpers.isAuth, (req, res) => {
  console.log()
  let auth =req.isAuthenticated()
  const user = req.params
  Bike.findById()
  console.log('esta sera la visa del map',auth);
  res.render('map/map',{auth:auth} ) 
});

(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      let { longitude, latitude } = position.coords;
      const user_position = [longitude, latitude];
      map.setCenter(user_position).setZoom(15);
      const popup = new mapboxgl.Popup().setHTML("Ya te encontré mijo");
      const marker = new mapboxgl.Marker()
        .setLngLat(user_position)
        .setPopup(popup)
        .addTo(map);
    },
    err => {
      console.log("No te dieron chance morro", err);
    }
  );
} else {
  console.log("Usa chrome mijo");
}
let n,mark,pop;
{{#each bike }}
 n = "{{this.name}}"
 pop = new mapboxgl.Popup().setText(n);
 mark = new mapboxgl.Marker()
  .setLngLat([{{ this.location.coordinates.[0] }}, {{ this.location.coordinates.[1] }}])
  .setPopup(pop)
  .addTo(map);
{{/each}}
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

module.exports = router;
