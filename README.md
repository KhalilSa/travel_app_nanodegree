# Note
This app is the last required submission for the udacity frontend development nanodegree program.

Please DON'T COPY THE CONTENT OF THIS REPO for your project submission to avoid plagiarism, check out this [guide regarding plagiarism](https://udacity.zendesk.com/hc/en-us/categories/360000151251-Plagiarism).

# Travel App
This simple web app allow you to plan &amp; save your trips by showing current weather of the desired location, moreover It displays an image of that place/country.

I hope you find this project useful :)

## Table Of Contents

1. [About the Project](#about-the-project)
2. [API(s) Used](#api\(s\)-used)
3. [Development Strategy](#development-strategy)
4. [Additional Features](#additional-features)
5. [Get Up And Running](#get-up-and-running) 
6. [Technologies Used](#web-technologies-used)
7. [Test](#test)
8. [screenshots](#screenshots)
9. [Licence](#licence)

## About the Project

The project will include a simple form where you enter the location you are travelling to and the date you are leaving &amp; returning. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast; For That we'll be using WeatherBit API which only accepts coordinates of the location to pull weather information. For that, we are using Geonames API that lets us obtain latitude and longitude of the location we'd like to travel. As you can see, in our API, for us to pull the weather data, first we need to get the location information from a different API. Once we have all of this data, we use Pixabay API to display an image of the location entered. You can also save your trips, for this I used both the server and the localStorage object.

## API(s) Used

* [Geonames API](http://www.geonames.org/export/web-services.html) - Geographical database from which the location data is pulled
* [Weatherbit API](https://www.weatherbit.io/api) - Weather API for current and future weather data
* [Pixabay API](https://pixabay.com/api/docs/) - RESTful interface for searching and retrieving free images and videos released under the Pixabay License.

## Development strategy

1. Start by duplicating [My evaluate news nlp Project](https://github.com/KhalilSa/evaluate_new_nlp_frontend_nanodegree) Repo, then replace server `index.js` file by `server.js` file from [My Weather Journal App Project](https://github.com/KhalilSa/weather_journal_app_Udacity_project)
2. Install required dependencies
3. Setting Webpack Configs: Almost Identical to that from [My evaluate news nlp Project](https://github.com/KhalilSa/evaluate_new_nlp_frontend_nanodegree), I just added jquery plugin:

```
new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        })
```

also add `cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/**/*")]` to `CleanWebpackPlugin` config in `webpack.dev.js` plugins list
and updated some scripts in `package.json`.
4. Creating UI using html5 &amp; scss: Setup a form where users can enter the trip destination and the dates
5. Pull data including lattitude, longtitude, country name, and country code from Geonames API using user input
6. Pass this data to Weatherbit API along with user entered dates to obtain weather information
7. Introduce a countdown to find out how many days to the trip
8. Use location and country name to pull images from Pixabay API
9. Use localStorage to save Data

## Additional Features

1. Add end date and display length of the trip
2. Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
3. Users can review the trip info and cancel before saving it.
4. Use Local Storage to save the data so that when they close, then revisit the page, their information is still there.

## Get Up and Running

1. `cd` into your new folder then Download or clone the project:
```
git clone https://github.com/KhalilSa/travel_app_nanodegree
```
2. Install dependencies
```
npm i
```
3. Create `.env` file and add
```
GEONAMES_KEY=<Your Username>
WEATHERBIT_API_KEY=<Your Weatherbit api key>
PIXABAY_API_KEY=<Your Pixabay api key>
```
4. Build &amp; Start the server
```
npm build
```
5. Setup the environment development or production
```
npm run build-dev
```
or 
```
npm run build-prod
```
6. Test with Jest
```
npm run test
```

## Web Technologies Used

* [Sass](https://sass-lang.com/documentation) - The web framework used
* [Jquery](https://jquery.com/) - Javascript Library for animation and event handling
* [Webpack](https://webpack.js.org/concepts/) - Asset Management
* [Babel](https://babeljs.io/) - JavaScript Compiler
* [Node.js](https://nodejs.org/en/) - JavaScript Runtime
* [Express.js](https://expressjs.com/) - Server Framework for Node.js
* [Jest](https://jestjs.io/) - Testing suit
* [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers) - For offline capability

## Test
Actually I wrote some tests but they seem to fail for some reason, to be honest I need some help in writing more meaningful tests.

## Screenshots
That's how the page looks like:
![Screenshot of the travel planner](/screenshots/travelplannerscreenshot1.png)
![Another screenshot for the travel planner](/screenshots/travelplannerscreenshot2.png)
![Another screenshot for the travel planner](/screenshots/travelplannerscreenshot3.png)

## License
This project is licensed under the MIT License - see the `LICENSE` file for details
