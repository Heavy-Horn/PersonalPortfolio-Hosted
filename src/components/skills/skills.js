const expandButton = document.getElementById("moreSkills");
const extraSkills = document.getElementsByClassName("moreStuff");

expandButton.addEventListener("click", () => {
  for(let i = 0; i < extraSkills.length; i++){
    extraSkills[i].classList.toggle("hidden");
  };

  if(expandButton.innerHTML.includes("More")) {
    expandButton.innerHTML = "&#9650; Less";
  } else {
    expandButton.innerHTML = "&#9660; More";
  };
});
