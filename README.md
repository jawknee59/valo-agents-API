# Valorant Agents API

This api will allow the users of our react front-end applications to CRUD Valorant's agents and their abilities

This application uses token authentication instead of sessions.

## Resources

### Agents

###### Routes Table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/agents`                | `pets#index`      |
| GET    | `/agents/:id`            | `pets#show`       |
| POST   | `/agents/`               | `pets#create`     |
| PATCH  | `/agents/:id`            | `pets#update`     |
| DELETE | `/agents/:id`            | `pets#delete`     |

### Users

###### Routes Table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |

