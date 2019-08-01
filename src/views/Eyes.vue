<template lang="html">
  <div class="eyes"></div>
</template>

<script>
export default {
  name: 'eyes',
  mounted () {
    /* eslint-disable */
    let isSpinning = true;
    let eyeBallSize = 120;

    let eyeX = 20;
    let eyeY = 20;
    let cursorX = 0;
    let cursorY = 0;

    let maxY = 3.9;
    let minY = 2.4;

    let minX = -1;
    let maxX = 1;

    let eyeColors = ["#a29bfe", "#74b9ff", "#ff7675", "#fab1a0", "#81ecec", "#55efc4"];

    let eyeballs = [];
    createEyeballs();

    function createEyeballs(){
      for(let x = 0; x < 105; x++){
        let eyeBallElem = document.createElement("canvas");
        eyeBallElem.id = "eyeball"+x;
        eyeBallElem.width = 120;
        eyeBallElem.height = 120;
        document.querySelector('.eyes').append(eyeBallElem);
        new createZdogEyeball(x);
      }
    }

    function createZdogEyeball(index){
      let eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];

      this.illo = new Zdog.Illustration({
        element: '#eyeball'+index,
        zoom: 10,
        dragRotate: true,
      });

      this.head = new Zdog.Shape({
        addTo: this.illo,
        stroke: 12,
        color: "white",
      });

      this.eyeFill = new Zdog.Ellipse({
        addTo: this.head,
        width: 6,
        height: 6,
        color: eyeColor,
        fill: true,
        translate: { x: 0, y: 0, z: -5.9},
      });

      this.pupil = new Zdog.Ellipse({
        addTo: this.head,
        diameter: 2,
        color: "black",
        fill: true,
        translate: { x: 0, y: 0, z: -6},
      });

      this.highlight = new Zdog.Ellipse({
        addTo: this.head,
        width: .5,
        height: .5,
        color: "white",
        fill: true,
        translate: { x: -1, y: -1.5, z: -7},
      });

      this.eyeX = document.getElementById("eyeball" + index).getBoundingClientRect().left;
      this.eyeY = document.getElementById("eyeball" + index).getBoundingClientRect().top;

      this.illo.updateRenderGraph();
      eyeballs.push(this);
    }

    function animate() {
      for(let z = 0; z < eyeballs.length; z++){
        let eyeX = eyeballs[z].eyeX;
        let eyeY = eyeballs[z].eyeY;

        let maxDistance = 400;

        let differenceX = cursorX - (eyeX + eyeBallSize/2);
        if(differenceX > maxDistance){
          differenceX = maxDistance;
        }
        if(differenceX < -maxDistance){
          differenceX = -maxDistance;
        }
        let ratioY = 1 - (differenceX + maxDistance)/(maxDistance*2);
        eyeballs[z].illo.rotate.y = ratioY * (maxY - minY) + minY;

        let differenceY = cursorY - (eyeY + eyeBallSize/2);
        if(differenceY > maxDistance){
          differenceY = maxDistance;
        }
        if(differenceY < -maxDistance){
          differenceY = -maxDistance;
        }
        let ratioX = 1 - (differenceY + maxDistance)/(maxDistance*2);
        eyeballs[z].illo.rotate.x = ratioX * (maxX - minX) + minX;


        let distance = Math.pow(Math.pow(differenceX, 2) + Math.pow(differenceY, 2), .5);
        let pupilMin = 2;
        let pupilMax = 5;

        if(distance > maxDistance){
          distance = maxDistance;
        }
        if(distance < -maxDistance){
          distance = -maxDistance;
        }
        let ratioEye = 1-(distance + maxDistance)/(maxDistance*2);
        let pupilDiameter = ratioEye * (pupilMax - pupilMin) + pupilMin;
        eyeballs[z].pupil.diameter = pupilDiameter;
        eyeballs[z].pupil.updatePath();
        eyeballs[z].illo.updateRenderGraph();
      }
      // animate next frame
      requestAnimationFrame( animate );
    }
    // start animation
    animate();

    window.addEventListener("mousemove", function(e){
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    window.addEventListener("resize", function(){
       for(let x = 0; x < eyeballs.length; x++){
         eyeballs[x].eyeX = document.getElementById("eyeball" + x).getBoundingClientRect().left;
         eyeballs[x].eyeY = document.getElementById("eyeball" + x).getBoundingClientRect().top;
       }
    });
  }
}
</script>

<style lang="scss" scoped>

  .eyes {
    width: calc(100% + 40px);
    margin-left: -20px;
    text-align: center;
    background-color: rgba(#d68662, 0.1);
    cursor: none;
  }

</style>
