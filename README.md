# ROMS take-home assigment
---

## Task1

### Run
```bash
# Install packages
yarn install

# Backend service will start on localhost:3002
yarn run dev:backend

# Frontend page will host on localhost:3001
yarn run dev:frontend
```

### Feature
* Search
* Sort
* Paging

### Tech pick
* Frontend
  * [TypeScript](https://github.com/microsoft/TypeScript) - There is no reason to use javascript or coffeescript in this project. TypeScript provides a more robust architecture for projects, finds bugs early, and is easy to refactor.
  * [React](https://github.com/facebook/react) - One of the most popular front-end frameworks, and TypeScript works well together.
  * [MobX](https://github.com/mobxjs/mobx) - I prefer MobX to Redux. It is simple, flexible, and can build beautiful and not redundant code.
  * [TypedStyle](https://github.com/typestyle/typestyle) - A small CSS-IN-JS library. I like it, because it's very simple and intuitive.
  * [MaterialUI](https://github.com/mui/material-ui) - One of the most well-known front-end UI libraries. In this project, Ant-design is also a good fit, but I prefer the Material-UI design style.
* Backend
  * [TypeScript](https://www.typescriptlang.org/) - Using the same language for both the back-end and front-end is helpful in many ways, especially in situations where performance is not specifically required.
  * [TypeGraphQL](https://github.com/MichalLytek/type-graphql) - A GraphQL library that I really like. It combines well with TypeScript and ORM, making the code type-safe and more readable.
  * [GraphQL-Yoga](https://github.com/dotansimha/graphql-yoga) - A simple, convenient GraphQL host. I prefer to use it, because Apollo has too many features I don't need.
  * [MikroORM](https://github.com/mikro-orm/mikro-orm) - The best NodeJS ORM I know so far. Very high quality, almost bug-free (compared to TypeORM), and a query builder to use when performance is needed.

## Task2

### Graph
Please check [ROMS_task2.drawio.pdf](./ROMS_task2.drawio.pdf)

### Design
* I am familiar with GCP, so all the cloud services I mentioned will be based on GCP, but these are very common services and alternatives can be found on AWS or Azure.
* The design goal is to be able to carry tens of thousands of stores, hundreds of thousands or millions of data sent per second, and to output real-time (about 10 minutes to update) charts after collation.
* I encountered a similar challenge when I worked at QCDN, where we had to collect and distribute a large number of CDN logs, so the feasibility of this design was proven.
* In this case, the primary challenge is to withstand the hundreds of thousands or millions of data transmissions per second. The best solution is to use a serverless handler like CloudFunction/Lamda. This type of service is designed to be extremely scalable and can withstand large amounts of transient data (e.g. after hours, during peak customer dinner shopping hours). Another design approach is to use a scalable server, such as AppEngine or CloudRun. This type of service is also scalable, but takes longer to scale and may have problems with transient high traffic.
* In order to avoid crashing the general database due to large number of writes, a batch write mechanism is necessary. This can be achieved by using memory-based database and cron jobs.
* Another problem to solve is how to analyze huge amount of data (terabytes or petabytes). If the amount of data to be analyzed is very large, we can use BigQuery to implement it. But if we only need recent data, CloudSQL can handle it. Another optimization is to periodically move old data that is not used frequently to a "cold storage database", which reduces the burden on the main database when querying.
* For the final output report, to avoid repeated queries in the main database, you can store the frequently used data in the cache database.

## Author
* [Eddie Hsu](https://github.com/apolkingg8)


