// ----- CONTROLLER

const modelLieux = require("../models/modelLieux");

// --------------------------------------------------------------------------------------------------------------------------------------------------------

function connexion(req, res)
{
    let status = req.query.status;

    // Si identifiants incorrects
    if(status == "false")
    {
        res.render("connexion", { status: status });
    }
    else
    {
        res.render("connexion");
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Liste des lieux
async function listeLieux(req, res)
{
    const lieux = await modelLieux.getListeLieux();
    let status = req.query.status;
    let type = req.query.type;

    // Modification réussie (après redirection)
    if(status)
    {
        res.render("lieux", { lieux: lieux, status: status, type: type });
    }
    else
    {
        res.render("lieux", { lieux: lieux });
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Formulaire d'ajout d'un lieu
async function ajoutLieu(req, res)
{
    let listeId = await modelLieux.getAllId();
    
    let listeExistedId = [];
    listeId.forEach((data) => {
        listeExistedId.push(parseInt(data.idLieu));
    });

    let randomId = Math.max(...listeExistedId) + 1;

    res.render("ajout-lieu", { newId: randomId });
}

// Fonction récursive qui permet de générer un nombre qui n'est pas contenu dans la liste passée en paramètre
// function generateNumber(listeId)
// {
//     // On génère un nombre aléatoire entre 1 et 100
//     let randomNumber = Math.floor(Math.random() * 100) + 1;

//     if(!listeId.includes(randomNumber))
//     {
//         return randomNumber;
//     }
//     else
//     {
//         return generateNumber(listeId);
//     }
// }

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Validation du formulaire d'ajout
async function validationFormAjouter(req, res)
{
    const lieu = req.body;
    let result = await modelLieux.addLieu(lieu);

    if(result.ok == true)
    {
        // Redirection vers la liste des lieux avec affichage d'un message de validation
        res.redirect("/lieux?status=true&type=ajout");
    }
    else
    {
        // On reste sur le formulaire d'ajout avec affichage d'un message d'erreur
        res.redirect("/ajout-lieu?status=false");
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Formulaire de modification d'un lieu
async function showForm(req, res)
{
    const idLieu = req.params.idLieu;
    let status = req.query.status;

    const lieu = await modelLieux.getLieuById(idLieu);

    if(lieu != 404)
    {
        // Erreur de validation du formulaire
        if(!status)
        {
            res.render("details-lieu", { lieu: lieu, status: status });
        }
        else
        {
            res.render("details-lieu", { lieu: lieu });
        }
    }
    else
    {
        // Lieu non trouvé
        res.redirect("/lieux?status=false");
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Validation du formulaire de modification
async function validationFormModifier(req, res)
{
    const idLieu = req.params.idLieu;
    const newLieu = req.body;

    const lieu = await modelLieux.getLieuById(idLieu);
    let result = await modelLieux.modifyLieu(lieu, newLieu);

    if(result.ok == true)
    {
        // Redirection sur la liste des lieux avec affichage d'un message de validation
        res.redirect("/lieux?status=true&type=modification");
    }
    else
    {
        // Redirection vers le formulaire de modification avec affichage d'un message d'erreur
        res.redirect("/form-modifier-lieu?status=false");
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Suppression d'un lieu
async function supprimerLieu(req, res)
{
    const idLieu = req.params.idLieu;

    const lieu = await modelLieux.getLieuById(idLieu);
    let result = await modelLieux.deleteLieu(lieu);

    if(result.ok == true)
    {
        // Redirection sur la liste des lieux avec affichage d'un message de validation de la suppression
        res.redirect("/lieux?status=true&type=suppression");
    }
    else
    {
        // Redirection sur la liste des lieux avec affichage d'un message d'erreur
        res.redirect("/lieux?status=false");
    }
}

module.exports = { connexion, ajoutLieu, listeLieux, showForm, validationFormAjouter, validationFormModifier, supprimerLieu };