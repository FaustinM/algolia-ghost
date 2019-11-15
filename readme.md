


![Algolia](https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Algolia-logo.svg/1280px-Algolia-logo.svg.png)

# Algolia x Ghost
Pour pouvoir utiliser un champ de recherche Algolia avec Ghost, j'ai dû créer un webhook qui à chaque modification de post, modifie l'index

## Les endpoints

 - /updatePost -> Mettre à jour des données
 - /newPost -> Ajouter un post
 - /delPost -> Supprimer un post
 - / -> Vérifier que le serveur fonctionne
 - /info -> Vérifier les infos de algolia (WIP)
 - /sync -> Synchroniser les deux bases de donnés

## Les dépendances

* [Algolia](https://www.algolia.com/)
* [Express](https://expressjs.com)
* [html-to-text](https://www.npmjs.com/package/html-to-text)
* [node-fetch](https://www.npmjs.com/package/node-fetch)
