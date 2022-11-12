<img src="" alt="project logo" align="right"/>

# StickerChecker &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

StickerChecker is, well... a sticker checker!


## About it

Starting a future project as Typescrypt POC.

Inspired from the 2022 World Cup Sticker Album release and from using some early incomplete apps available, we felt we could do something even better with what we have learnt the last few months.

To challenge ourselves, we decided to create our own Sticker Manager :)

Features:
  - Create an account

Planned features:
  - Mark the stickers you own (including repeated ones)
  - Register special stickers you draw (Legendaries: rookie, bronze, silver, gold)
  - Check your sticker album progress
  - List only your repeated ones
  - List only your needed ones


## Built With
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="logo typescript"/> </br>


## How to run

Build the database locally and run the back end to start testing!

POST: /signup --> creates account
BODY: { "username": "Flavinho", "email": "flavio@copa.com", "password": "joga10" }

POST: /signin --> login
BODY: { "email": "flavio@copa.com", "password": "joga10" }

PUT: /user --> changes account's username
HEADER: { "authorization": token }
BODY: { "password": "joga10", "username": "Flaviao" }

GET: /user --> list account's total stickers (to test this in different scenarios, insert/remove/update entries from "userStickers" table via terminal or DB app like beekeeper/pgadmin/dbeaver)
HEADER: { "authorization": token }

DELETE: /user --> deletes account
HEADER: { "authorization": token }
BODY: { "password": "joga10" }


## Versioning

v1.0.0 - Launch
