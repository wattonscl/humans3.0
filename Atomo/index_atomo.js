window.addEventListener("DOMContentLoaded", () => {
    const frontFace = document.getElementById("front");
    const backFace = document.getElementById("back");
    const topFace = document.getElementById("top");
    const bottomFace = document.getElementById("bottom");
    const leftFace = document.getElementById("left");
    const rightFace = document.getElementById("right");
  
    function moveImages() {
      const time = Date.now() * 0.001;
  
      const radius = 100;
      const orbitSpeed = 0.5;
  
      const frontX = radius * Math.cos(orbitSpeed * time);
      const frontY = radius * Math.sin(orbitSpeed * time);
      frontFace.style.transform = `translate(${frontX}px, ${frontY}px)`;
  
      const backX = radius * Math.cos(orbitSpeed * time + Math.PI);
      const backY = radius * Math.sin(orbitSpeed * time + Math.PI);
      backFace.style.transform = `translate(${backX}px, ${backY}px)`;
  
      const topX = radius * Math.cos(orbitSpeed * time + Math.PI / 2);
      const topZ = radius * Math.sin(orbitSpeed * time + Math.PI / 2);
      topFace.style.transform = `translate(${topX}px, 0, ${topZ}px)`;
  
      const bottomX = radius * Math.cos(orbitSpeed * time + (3 * Math.PI) / 2);
      const bottomZ = radius * Math.sin(orbitSpeed * time + (3 * Math.PI) / 2);
      bottomFace.style.transform = `translate(${bottomX}px, 0, ${bottomZ}px)`;
  
      const leftY = radius * Math.cos(orbitSpeed * time + Math.PI / 2);
      const leftZ = radius * Math.sin(orbitSpeed * time + Math.PI / 2);
      leftFace.style.transform = `translate(0, ${leftY}px, ${leftZ}px)`;
  
      const rightY = radius * Math.cos(orbitSpeed * time + (3 * Math.PI) / 2);
      const rightZ = radius * Math.sin(orbitSpeed * time + (3 * Math.PI) / 2);
      rightFace.style.transform = `translate(0, ${rightY}px, ${rightZ}px)`;
  
      requestAnimationFrame(moveImages);
    }
  
    moveImages();
  });
  