//javascript for toggle menu
var navLinks = document.getElementById("navLinks");
var link = document.querySelectorAll(".nav-links ul li a");
link.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.style.right = "-200px";
  });
});

document.getElementById("close").addEventListener("click", () => {
  navLinks.style.right = "0";
});
document.getElementById("burger").addEventListener("click", () => {
  navLinks.style.right = "-200px";
});

//scroll animations
window.sr = ScrollReveal();
sr.reveal(".animate-infirst", {
  origin: "center",
  duration: 2500,
  distance: "0rem",
  delay: 400,
});
sr.reveal(".animate-in", {
  origin: "center",
  duration: 1500,
  distance: "0rem",
  delay: 2000,
});

//scroll to top on reload
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}

//form submission to server
$("form").on("submit", (e) => {
  e.preventDefault();
  var usern = $("#uname").val().trim();
  const uname = usern.replace(/[^a-zA-Z ]/g, "");
  const uemail = $("#uemail").val().trim();
  var usert = $("#utext").val().trim();
  const utext = usert.replace(/[^a-zA-Z0-9]/g, "");
  const uurl = $("#uurl").val().trim();
  const data = {
    uname,
    uemail,
    utext,
    uurl,
  };
  $.post("/email", data, function () {
    console.log("Server received data");
  });

  //reload page on submission
  document.getElementById("btn").innerHTML = "Sent!";
  setTimeout(() => {
    document.getElementById("form").style.display = "none";
  }, 2000);
  setTimeout(() => {
    document.getElementById("sent-message").style.display = "block";
  }, 3000);
  // setTimeout(reload, 2000);
  // function reload() {
  //   window.location.reload();
  //   window.scrollTop(0);
  // }
});
