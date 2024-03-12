// ----- REQUÊTES (MODEL)

const nano = require('nano')(process.env.NANO_URL);
const dbLieux = nano.db.use(process.env.DB_NAME);

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Liste des lieux
async function getListeLieux()
{
    const query = {
        "selector": {}, 
        "fields": [],
    };

    let liste = await dbLieux.find(query);
    return liste.docs;
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Détails d'un lieu
async function getLieuById(idLieu) {
    const query = {
            "selector": {
            "idLieu": idLieu
        }, 
        "fields": [],
    }
    let lieu = await dbLieux.find(query);
    if(lieu.docs.length != 0)
    {
        return lieu.docs[0];
    }
    else
    {
        return 404;
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Récupération de tous les id
async function getAllId()
{
    const query = {
        "selector": {}, 
        "fields": ["idLieu"],
    };

    let listeId = await dbLieux.find(query);
    return listeId.docs;
}

// Ajout d'un lieu
async function addLieu(lieu)
{
    // Code commenté qui marche si on a un int en tant que idLieu (+ rajouter des parseInt) | Du coup, fait buguer l'appli Kotlin LOOOL
    /*// Création d'un index pour faire le sort
    const index = {
        index: {
            fields: ["idLieu"]
          },
        name: "idLieu-index"
    };

    await dbLieux.createIndex(index);

    // On récupère l'idLieu max
    const query = {
        selector: {},
        sort: [{ idLieu: "desc" }],
        limit: 1
    };

    let maxLieu = await dbLieux.find(query);
    let maxIdLieu = maxLieu.docs[0].idLieu + 1;

    let newLieu = {
        "idLieu": maxIdLieu,
        "nomLieu": lieu.nomLieu,
        "imageUrl": lieu.urlImage,
        "badgeUrl": lieu.urlBadge,
        "categorie": lieu.categorie,
        "lat": lieu.latitude,
        "long": lieu.longitude,
        "idCategorie": lieu.idCategorie,
        "descriptionMystere": lieu.descriptionMystere,
        "description": lieu.descriptionComplete
    };*/

    let newLieu = {
        "idLieu": lieu.idLieu,
        "nomLieu": lieu.nomLieu,
        "imageUrl": lieu.urlImage,
        "badgeUrl": lieu.urlBadge,
        "categorie": lieu.categorie,
        "lat": lieu.latitude,
        "long": lieu.longitude,
        "idCategorie": lieu.idCategorie,
        "descriptionMystere": lieu.descriptionMystere,
        "description": lieu.descriptionComplete
    }

    let result = await dbLieux.insert(newLieu);
    return result;
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Modification d'un lieu
async function modifyLieu(lieu, newLieu)
{
    let modifLieu = {
        "_id": lieu._id,
        "_rev": lieu._rev,
        "idLieu": lieu.idLieu,
        "nomLieu": newLieu.nomLieu,
        "imageUrl": newLieu.urlImage,
        "badgeUrl": newLieu.urlBadge,
        "categorie": newLieu.categorie,
        "lat": newLieu.latitude,
        "long": newLieu.longitude,
        "idCategorie": newLieu.idCategorie,
        "descriptionMystere": newLieu.descriptionMystere,
        "description": newLieu.descriptionComplete
    };

    let result = await dbLieux.insert(modifLieu);
    return result;
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// Suppression d'un lieu
async function deleteLieu(lieu)
{
    let result = await dbLieux.destroy(lieu._id, lieu._rev);
    return result;
}

module.exports = { getListeLieux, getLieuById, getAllId, addLieu, modifyLieu, deleteLieu };