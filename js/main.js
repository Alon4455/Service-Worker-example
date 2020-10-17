//makesure sw are supperted

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw_cached_site.js")
      .then((reg) => console.log("reg", reg))
      .catch((err) => console.log("err", err));
  });
}
