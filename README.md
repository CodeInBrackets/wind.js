# ![logomakr_01gz5x](https://user-images.githubusercontent.com/3071208/38959874-9addaa8e-4362-11e8-9904-38fba6503ae2.png)
![GitHub release](https://img.shields.io/github/release/codeinbrackets/wind.js.svg)
![npm](https://img.shields.io/npm/v/wind.js.svg)
[![Build Status](https://travis-ci.org/CodeInBrackets/wind.js.svg?branch=master)](https://travis-ci.org/CodeInBrackets/wind.js)
[![Coverage Status](https://coveralls.io/repos/github/CodeInBrackets/wind.js/badge.svg?branch=master)](https://coveralls.io/github/CodeInBrackets/wind.js?branch=master)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![issues Welcome](https://img.shields.io/badge/issues-welcome-brightgreen.svg)
![npm](https://img.shields.io/npm/l/wind.js.svg)
![GitHub issues](https://img.shields.io/github/issues/codeinbrackets/wind.js.svg)
![GitHub pull requests](https://img.shields.io/github/issues-pr/codeinbrackets/wind.js.svg)
![Downloads](https://img.shields.io/npm/dw/wind.js.svg)

Wind is a JavaScript library for building software using the actor system model.

* **Actors are easy to reason about**: An actor is the unit of state and logic of your application.
They are transactional, so you don't need to handle state rollbacks in case of errors.
* **Actors improve performance**: Asynchronous by default, every actor actual communication is non-blocking so slow actors will not block fast actors.
* **Actors are extensible**: As actors are built on top of objects, actor classes can be inherited, 
composed and injected.

## Features

Wind.js doesn't have any fancy feature (yet) but it has a strong architectural conventions and foundation that can be
used for different types of applications.

* Actors are reliable because they are transactional. You don't need to bother yourself with error recovery.
* Actors are performant, as they are pull-based and decoupled from other actors lifecycle.
* Actors are easy to debug. All messages come with information about the sender and all the state information is saved
in a time machine, for further debugging and navigation.
* The Actor System has an event bus. Actors can subscribe, publish and request messages from any topic and subscriptions
can be handled at any time.
* The Actor System is highly extensive. You can add your own supervisor and materializer to add new features like
implicit persistence or rendering of actors.

## Quick start

Creating your first actor system is easy and you don't need to understand everything that is happening under the hood.
First you must install the package:

`npm install wind.js --save`

Then create your first ActorSystem

```js
import ActorSystem from "wind.js";

let system = new ActorSystem();
system.start();
```

And create your actor class:

```js
class Ping extends system.Actor {
    onReceive({message}) {
        console.log(message.toUpperCase());
    }
}
```

Then you only need to instantiate your actor and send messages to it:

```js
let myPinger = new Ping();
system.tell(myPinger.id, "ping");
```

The application will continue running and processing messages until you stop the actor system:

```js
system.stop();
```
If you run the application you will see the following output:

```
PING
```

## Documentation

If you want deeper documentation on how to use the actor system, take a look at [here](docs/index.md).

## Contribution ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) ![Issues Welcome](https://img.shields.io/badge/issues-welcome-brightgreen.svg)

PR and issues are always welcome as a quick way of contributing to the project. Remember to be polite, this is a open source
project and ordinary requirements for PRs and issues are also a requirement.

If you want to be a long-term contributor and participate actively on the design of new features on the project, contact
us! Check the package.json to see who you need to contact.

### Logo
Check out the new logo that I created on <a href="http://logomakr.com" title="Logo Makr">LogoMakr.com</a> https://logomakr.com/01Gz5x
