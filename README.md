<p align="center">
  <img width="120" height="120" src="https://user-images.githubusercontent.com/7409802/120087645-11cf8a80-c0c0-11eb-8d24-40d7352f150f.png">
</p>

# basecamp-essentials

Opinionated features to increase your productivity with basecamp

<p align="center">
  <img width="1000" src="https://user-images.githubusercontent.com/7409802/120087649-18f69880-c0c0-11eb-9016-a8a058aed030.png">
</p>

### Extension available

[Chrome](https://chrome.google.com/webstore/detail/basecamp-essentials/aebodfjhnegpfdainpppdnkondmdcnhh)

### Features

- Reply
- Reply all
- Clear my temporary comment
- Greater Boost

### Tools

- Typescript
- Jquery
- Webpack
- ESLint
- Prettier

### Architecture

```
while(true)
renders        ----> Dom
Event Handlers <---- Dom
sleep(2000)
```

Ps:. (Basecamp Essentials) features will always work regardless of whether the page has been loaded or not. The architecture tries to keep its operation always updated so that the user does not have to update the page every time. The project was designed in this way to maintain a good user experience.

Event Handlers on loops can cause MemoryLeak, but its nmecessary to make dynamic things works. But, be careful not to forget to unsubscribe before registering a new handler.

(Without unregister)
![image](https://user-images.githubusercontent.com/7409802/120116723-df756a00-c15f-11eb-8651-8a09db84ecb9.png)

(Unregistering)
![image](https://user-images.githubusercontent.com/7409802/120118407-c6bd8200-c168-11eb-9a1e-57dd032574a1.png)

### What problems can you help

1. [refactor] Remove SetInterval and use recursive function to prevent memoryleak
2. [refactor] Organize content.ts Separate renders from eventHanlders at the same file, or create a filer per strategy and content.js will be our bootstrap
3. [refactor] Remove unused script from package.json
4. [test] Implement tests. PLease read [this](https://jestjs.io/pt-BR/docs/tutorial-jquery) before
5. [feat] Hide items from the "heys" list that do not make direct reference
6. [refactor] Improve the performance by reusing known nodes
7. [fix] Reply is displayed on some basecamp pages that have no relation to the "chat" feature
8. [fix] Boost size does not work sometimes
9. [fix] (Solved) "Reply all" is very very slow after some time
10. [feat] Add more or all available emojis
11. [feat] Improve Chrome Extension configuration and presentation, Bootstrap nav is breaking

### How to contribute

- Open an "issue" requesting a feature or reporting a problem

### Running the project

```sh
  yarn
  yarn start
```

1. Open on Chrome [Extensions](chrome://extensions/)
2. Click on "load without compression"
3. Select dist folder from project
4. Open Basecamp and see how it works
