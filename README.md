# shopping-cart

This repository build using node js with framework Hapi.js , Sequelize ORM, Swagger, Lab.
first  before install you need clone this repo

```
git clone git@github.com:zainul/shopping-cart.git
```

after it next need to install dependencies using 

```
npm install
```

go to clone directory and install sequelize cli

```
npm install --save sequelize-cli
```

after sequelize installed run db:migrate in your directory, make sure db already exist and configuration in config/config.json

```
sequelize db:migrate
```

for make test run:

```
npm test
```

the test result will be in file

```
./test-log.info
```

first need fill the master entity like :
  - product category
  - product
  - inventory
  - product per inventory

and then do insert receive product to fill the stock in inventory:
  - receive product

and then setting discount on :
  - coupon
  - discount coupon
  - discount total purchase

more complete to see and try in documentation create by hapi-swagger
```
http://localhost:3000/documentation
```

after it can do use sale and sale item like in shopping cart 
Assume the user has been authenticate
