# Todo List Application

Une application de gestion de tâches (Todo List) développée avec Angular pour le frontend, Spring Boot pour le backend et PostgreSQL comme base de données. Elle permet de créer, modifier, supprimer et réorganiser des tâches, avec gestion de la priorité et un mode sombre.


## Fonctionnalités

- Ajouter et supprimer des tâches
- Définir la priorité d'une tâche (non importante, faible, moyenne, urgente) avec pastilles colorées
- Drag & drop pour réorganiser les tâches dans l'ordre shouaité
- Mode sombre / clair
- Stockage de l'ordre des tâches dans `localStorage`
- Backend RESTful avec Spring Boot et PostgreSQL


## Prérequis

- Node.js et npm
- Angular CLI
- Java 17+
- Maven
- PostgreSQL


## Base de données

> ℹ️ Le fichier `application.properties` est déjà configuré dans le projet. Vous n'avez pas besoin de le modifier si vous utilisez les mêmes noms pour la base (`tododb`), l'utilisateur (`todo_user`) et le mot de passe (`todo_mdp`).

1. Connectez-vous à PostgreSQL avec un superutilisateur :
```bash
psql -U postgres
```

2. Créez la base de données :
```bash
CREATE DATABASE tododb;
```

3. Créez un utilisateur avec mot de passe :
```bash
CREATE USER todo_user WITH PASSWORD 'todo_mdp';
GRANT ALL PRIVILEGES ON DATABASE tododb TO todo_user;
```

## Lancer le backend

1. Ouvrez un terminal dans le dossier backend/
```bash
cd ~/todo-app/backend$
```

2. Compilez et lancez le projet :
```bash
mvn clean install
mvn spring-boot:run
```

3. Le backend démarre sur http://localhost:8080/


## Lancer le frontend

1. Ouvrez un terminal dans le dossier frontend/
```bash
cd ~/todo-app/frontend$
```

2. Compilez et lancez le projet :
```bash
npm install
```

3. Lancez l'application Angular :
```bash
ng serve
```

4. Le frontend démarre sur http://localhost:4200/


## Utilisation

- Ajouter une tâche via le formulaire (titre + priorité)
- Modifier la priorité directement dans la liste
- Cocher une tâche pour la marquer comme complétée
- Supprimer une tâche avec le bouton ❌
- Glisser-déposer les tâches pour les réorganiser
- Activer le mode sombre / clair via le bouton en haut à droite


## Notes

- L’ordre des tâches est sauvegardé dans `localStorage`
- La priorité par défaut est “non importante” si elle n’est pas définie
- Le drag & drop utilise Angular CDK


## Endpoints REST exposés par le backend

- `GET /todos` : Récupérer toutes les tâches
- `POST /todos` : Créer une nouvelle tâche
- `PUT /todos/{id}` : Mettre à jour une tâche
- `DELETE /todos/{id}` : Supprimer une tâche


## Auteur

- **Nom** : tahlisfove


## Licence

Ce projet est sous licence MIT.