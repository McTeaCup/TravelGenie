# TravelGenie

## Branch structure
For easy workflow each developer *(Frontend/Backend/DevOps)* will have their own branch to fork from. This is so that each developer can test their features in a safe envioremnt. Here are the branches accessable:

![image if branch structure](github-media/branch-structure.png)

- 'main'
   This branch should be avoided to interact with and should only be used as the latest stable edition of the product. There will be a workflow that auto-merge the dev branch at the end of the week just before the retrospective so the group as a colective can try out the latest version.

- 'dev'
   This branch will be a meltingpot of the latest updates/features added in the latest sprint. Make sure that when pushing to this branch that you've merged it into your own branch and that your feature still works.

- 'frontend'/'backend'/'devops'
   This branch is dedicated to the backend team so that all disepline-related features can work in harmony. This branch should also be up-to-date as ofen as possible to the dev branch.
   - 'frontend'
      Collection of the latest frontend features
   - 'backend'
      Collection of the latest backend features
   - 'devops'
      Collection of the latest workflows/devops features

- 'feature/<id>'
   These branches are forks from the related disepline-branch based on features that are being developed. The ID of the feature should be the same as the issue added in the GitHub repo. This is to keep track of which issues are still in development/closed.
