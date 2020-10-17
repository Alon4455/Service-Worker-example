//makesure sw are supperted

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw_set_cached.js ")
      .then((reg) => console.log("reg", reg))
      .catch((err) => console.log("err", err));
  });
}
