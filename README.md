# AMT User Study Code for [XKGE](https://github.com/adaruna3/explainable-kge)

## Install

1) First copy the appropriate explanation files from `explainable-kge` repo to `./src/data/`. The copied explanation files we used are already provided. We've also included needed robot videos for the user preferences study in `./public/videos/`.
2) Begin hosting the user study server at local host to test it:
    - Install [node](https://nodejs.org/en/).
    - Run 'npm install' in the top-level of this repo.
    - Run 'npm run start' to begin the server at port `3000` on `localhost`.
    - Inspect the [user study website](http://localhost:3000/).
3) To host the user study on the web using [Firebase](https://firebase.google.com/):
    - Install firebase.
    - Run `npm run build` to build the user study web files.
    - Run `firebase deploy` to publish the user study to the web.
4) You will need to make additional changes to make the user study store data to dropbox. See [dropbox dev pages](https://www.dropbox.com/developers/reference)