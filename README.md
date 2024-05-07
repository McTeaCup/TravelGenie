# TravelGenie
This is the repository for the Chas Challenge 2024 for Grupp-5. This is the source code for the Travel Genie, an aplication to help you schedule your vacation.

[Github Structure Help](/documentation/github.md)

## Branch Structure
For easy workflow each developer *(Frontend/Backend/DevOps)* will have their own branch to fork from. This is so that each developer can test their features in a safe environment. Here are the branches accessible:

![image if branch structure](github-media/branch-structure.png)

- `main`
 
  This branch will always have the latest stable build of Travel Genie and should not be pushed to if there is not a specific reason for it!

- `dev`

  The `dev` branch will be the hub of all currently finished features so that both frontend and backend can work together with the latest changes and updates.

- `discipline-feature-<id>`
  
  The feature `<id>` is referring to an issue that can be found on the [issue page](https://github.com/McTeaCup/TravelGenie/issues). The reason why we specify the ID of the issue is so that we can easily identify what branch belongs to what feature/fix as well as what features/fix have been completed.
  The naming convention should can be split up into three parts. Discipline (frontend/backend/devops), feature/fix and finally issue ID. Read more in [here](/documentation/github.md)
