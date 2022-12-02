# Simple WebApp to Track Vacation Balance

## Deployment to gh-pages
Full guide: https://github.com/gitname/react-gh-pages#7-push-the-react-app-to-the-github-repository

1. Push recent changes 
2. Run "npm run deploy"

That will cause the predeploy and deploy scripts defined in package.json to run.

Under the hood, the predeploy script will build a distributable version of the React app and store it in a folder named build. Then, the deploy script will push the contents of that folder to a new commit on the gh-pages branch of the GitHub repository, creating that branch if it doesn't already exist.

By default, the new commit on the gh-pages branch will have a commit message of "Updates". You can specify a custom commit message via the -m option, like this:

$ npm run deploy -- -m "Deploy React app to GitHub Pages"