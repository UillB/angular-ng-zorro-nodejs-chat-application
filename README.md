# Angular / NG-Zorro / NodeJS Chat Application

Angular (UI) and NodeJS (backend) application that demostrates the power of Angular + RxJS + NG-Zorro + NodeJS combination.

# Application main functional features
* Full-fledged chat application
* Ability to register the users 
* Ability to create the Chat Rooms
* Ability to join the Chat Room with many participatns
* 'Real-time' chat with the list of all users in the chat
* 'Real-time' chat with the list of all messages of the chat
* All the chat messages are being saved even if user has left the chat and joined the same chat again
* Ability to see all the Application chats

# Application main UI technical features
* <b>Asynchronous UI validations</b> while entering the UI data before submitting it to the backend
* Example of <b>RxJS Subjects</b> usage - managing the state, communicating between different components without the special needs for using the application state-management libaries such as Redux / NgRX / ngrx-data etc
* Basic <b>localStorage based authorization</b> with its own service
* Shown an example of Angular <b>Guards</b> usage
* Shown an example of Angular <b>custom pipes</b> usage in combination with <b>memoization</b> pattern (memo-decorator)
* Shown an example of <b>Singleton</b> pattern usage with Angular UI application crucial components (such as app.component.ts)
* Shown an example of <b>Observer</b> pattern usage by creating the global application service (event-bus.service.ts) which allows to subscribe to specified custom events and emit those events from any place across the entire application


## Requirements
* Git
* Node v12 (12.13.1 is preffered)
* NPM v6 (6.12.1 is preffered)
* Angular CLI v10 (10.1.7 is preffered)
# To run the app locally, please make sure that both UI and Backend works fine by following these steps:

# Client
```bash
git clone https://github.com/UillB/angular-ng-zorro-nodejs-chat-application.git
cd angular-ng-zorro-nodejs-chat-application
(optional, if Angular CLI is not installed) - npm install -g @angular/cli 
npm install
ng serve --open
```

# Server
```bash
git clone https://github.com/NetanelBasal/chat-be.git
Make sure Node latest is installed.
cd server
npm run nodemon
Make sure that server is up and running by navigating the http://localhost:3001/rooms
```

# Project structure

After creation, your UI project structure should like this:

```
angular-ng-zorro-nodejs-chat-application/
  src/
    app/
        components/
            account/
            avatar/
            chat/
            page-not-found/
        core/
            helpers/
            loader/
            models/
            services/
            core-module.ts
            ensure-module-loaded-once.guard.ts
        shared/
            ng-zorro/
            pipes/
            shared.module.ts
        app.component.html
        app.component.scss
        app.component.spec.ts
        app.component.ts
        app.module.ts
        app-routing.module.ts
        icons-provider.module.ts
    assets/
    environments/
    favicon.ico
    index.html
    main.ts
    polyfills.ts
    styles.scss
    test.ts
  .browserslistrc
  .editorconfig
  .gitignore
  angular.json
  karma.conf.js
  package.json
  package-lock.json
  README.md
  tsconfig.app.json
  tsconfig.json
  tsconfig.spec.json
  tslint.json
  e2e/
  node_modules/  
```


# Available Scripts
In the project directory you can run:

### `ng serve --open`

Runs the app in the development mode.<br>
Open [http://localhost:4200](http://localhost:4200) to launch the application in the browser

# Languages & tools

# HTML
* HTML5

# TypeScript
* Angular (UI Framework)
* RxJS (Built-in Angular JS library)
* NG-Zorro (Angular based UI components library)
* NodeJS (server with all crucial API Routes)

# CSS
* SCSS

# Possible issues
* If you cloned the UI code and launched it with the <b>ng serve --open</b> command, then, after very first launch, the application might reload for every interval of time even though no code changes were done. Please stop the terminal process, and <b>simply re-run the application again</b> with the same command <b>ng serve --open</b>
  

