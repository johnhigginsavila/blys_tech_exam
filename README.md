
# Instructions in running the apps

**Step1: install node 10 and docker in your system**

**Step2: To run using Docker Compose, Run command docker-compose up --build**

**Alternatively the apps can be run using node separately**
```
client-side:
  cd angular-code-validator
  ng serve

server-side:
  cd api
  npm run start
```

# Running Tests
**Normal Unit test for client: bash test.sh**

**Headless Unit test for client: bash test-headless.sh**