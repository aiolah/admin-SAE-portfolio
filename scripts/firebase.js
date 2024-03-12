// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3x6qg4v6w7iYa6ECVr3SGV4nP0jxpzAk",
    authDomain: "admin-castres-au-tresor.firebaseapp.com",
    projectId: "admin-castres-au-tresor",
    storageBucket: "admin-castres-au-tresor.appspot.com",
    messagingSenderId: "2565763926",
    appId: "1:2565763926:web:11920b2ff5fe0a266e9cf7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// On vérifie si l'utilisateur est bien connecté ou non
auth.onAuthStateChanged((user) => {
    if (user) {
        // L'utilisateur est connecté
        // console.log('Utilisateur connecté:', user.uid);
    } else {
        // Utilisateur non connecté : redirection directe
        if(window.location.href != "https://aiolah.alwaysdata.net/")
        {
            window.location.replace("/");
        }
    }
});

// Formulaire de connexion
let email;
let password;
let formConnexion = document.getElementById("formConnexion");

if(formConnexion != undefined)
{
    formConnexion.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(formConnexion);

        email = formData.get("email");
        password = formData.get("password");

        // Appel de l'API Firebase de connexion à un compte 
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // console.log("Vous êtes connecté !");

            window.location.href = "/lieux";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorMessage);

            window.location.href = "/?status=false";
        });
    });
}

// Déconnexion
let disconnectButton = document.querySelector("#deconnexion");
if(disconnectButton != undefined)
{
    disconnectButton.addEventListener("click", deconnexion);
    function deconnexion()
    {
        signOut(auth).then(() => {
            // console.log("Utilisateur déconnecté !");
        });
    }
}