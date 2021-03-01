# Google Docs HTML Cleaner

Convert exported Google Docs HTML to clean, semantic HTML

## Usage

Google Docs can export a document as HTML. But if you want to import
that HTML somewhere else, you'll have problems because Docs exports
HTML in a way other tools may not understand. This site cleans up the
Google Docs export, and gives you clean, semantic HTML that you can
import into rich text editors.

In Google Docs, go to `File > Download As > Webpage`. Then make sure to un-zip the downloaded zip file. Next, just grab the HTML file, drag it into this site, and drop it on the big button. The **Clean Output** box should now show your cleaned-up HTML code! Just click the copy button to put it in your clipboard. That's all there is to it! Note that you may see some funny characters - but it should render fine.

If you want to copy/paste in HTML, that works too! Just make sure to get everything, especially the `<head>` tag, then paste it all in the **Import** box.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn format`

Formats the code with `prettier` and `eslint`.

#### `yarn lint`

Checks code formatting.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
