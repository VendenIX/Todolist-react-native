Demo de l'application: https://www.youtube.com/watch?v=tkCRqmgGa4Q

Required: npm, (neo4j si pas de VM)

How to install:
Prendre la machine virtuelle avec neo4j dedans déjà tout installé

Pour installer la VM:
Aller sur VirtualBox
Aller dans file
Import applience
Là tu mets le fichier dbadmin.ova 
Ensuite il faut changer la RAM et les ports 
Réseau, Port rewarding, tu ajoutes 2 règles:
tu remplaces les 0 par dans l'ordre:
2222 -> 22
4000 -> 4000

Démarrer la VM:
vboxmanage startvm dbadmin --type headless

Pour mettre le fichier graphql/neo4j dans la bdd 
Se positionner à l'emplacement de l'archive todo.tgz
scp -P 2222 todo.tgz tp@127.0.0.1:
mdp: tp

Ensuite on se connecte à la VM:
ssh -p 2222 tp@127.0.0.1
mdp: tp
tar xvfz todo.tgz
cd todo
npm i
sudo neo4j start
npm run start
(Ne pas mettre à jour ça peut causer des soucis de dépendances)

A présent la partie BDD est fonctionnelle au port localhost:4000

Pour lancer l'application:
aller à l'emplacement de App.js et taper:
npm i --no-bin-links
npm run start 
press w pour lancer l'app sur internet sur son navigateur par defaut
(Ne pas mettre à jour ça peut causer des soucis de dépendances)
