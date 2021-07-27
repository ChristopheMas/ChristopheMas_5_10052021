const commandeReboot = JSON.parse(localStorage.getItem("commande"));

if(commandeReboot != null) {
    localStorage.clear();
}