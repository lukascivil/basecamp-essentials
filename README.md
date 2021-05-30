<p align="center">
  <img width="120" height="120" src="https://user-images.githubusercontent.com/7409802/120087645-11cf8a80-c0c0-11eb-8d24-40d7352f150f.png">
</p>

# basecamp-essentials
Opinionated features to increase your productivity with basecamp

<p align="center">
  <img width="1000" src="https://user-images.githubusercontent.com/7409802/120087649-18f69880-c0c0-11eb-9016-a8a058aed030.png">
</p>


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
sleep(3000)
```

Ps:. (Basecamp Essentials) features will always work regardless of whether the page has been loaded or not. The architecture tries to keep its operation always updated so that the user does not have to update the page every time. The project was designed in this way to maintain a good user experience.


### What problems can you help
1. [refactor] Remove SetInterval and use recursive function to prevent memoryleak
2. [refactor] Organize content.ts Separate renders from eventHanlders at the same file, or create a filer per strategy and content.js will be our bootstrap
3. [refactor] Remove unused script from package.json
4. [test] Implement tests
5. [feat] Hide items from the "heys" list that do not make direct reference
6. [refactor] Improve the performance by reusing known nodes
7. [fix] Reply is displayed on some basecamp pages that have no relation to the "chat" feature
8. [fix] Boost size does not work sometimes
