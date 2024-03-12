// ----- ROUTER

const controllerLieux = require("../controllers/controllerLieux");

const express = require("express");
const routerLieux = express.Router();

// --------------------------------------------------------------------------------------------------------------------------------------------------------

routerLieux.get("/", controllerLieux.connexion);

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Liste des lieux
routerLieux.get("/lieux", controllerLieux.listeLieux);

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Ajout d'un lieu
routerLieux.get("/ajout-lieu", controllerLieux.ajoutLieu);

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Validation du formulaire
routerLieux.post("/validation-ajout-lieu", controllerLieux.validationFormAjouter);

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Formulaire de modification d'un lieu
routerLieux.get("/form-modifier-lieu/:idLieu", controllerLieux.showForm);

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Validation du formulaire
routerLieux.post("/validation-modifier-lieu/:idLieu", controllerLieux.validationFormModifier);

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Validation du formulaire
routerLieux.get("/supprimer-lieu/:idLieu", controllerLieux.supprimerLieu);

// --------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = { routerLieux };