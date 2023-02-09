# Valorant Agents API

This api will allow the users of our react front-end applications to CRUD Valorant's agents and their abilities

This application uses token authentication instead of sessions.

## Resources

### Agents

###### Routes Table

| Verb   | URI Pattern              | Controller#Action   |
|--------|--------------------------|---------------------|
| GET    | `/agents`                | `agents#index`      |
| GET    | `/agents/:id`            | `agents#show`       |
| POST   | `/agents/`               | `agents#create`     |
| PATCH  | `/agents/:id`            | `agents#update`     |
| DELETE | `/agents/:id`            | `agents#delete`     |

### Users

###### Routes Table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |

### Abilities

###### Routes Table

| Verb   | URI Pattern                                 | Controller#Action      |
|--------|---------------------------------------------|------------------------|
| POST   | `/abilities/:agentId`                       | `abilities#create`     |
| PATCH  | `/abilities/:agentId/:abilityId`            | `abilities#update`     |
| DELETE | `/abilities/:agentId/:abilityId`            | `abilities#delete`     |
