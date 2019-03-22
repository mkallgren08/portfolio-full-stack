var fulltime = "Working full-time during project";
var bootcamp = "Built while attending a coding bootcamp";
var parttime = "Working part-time during project"

projectInfo = [
  {
    name: "Factory Generator with Multi-User Support",
    time: ["Mid-February 2019", "10 days" , "Average 3 hours a day", fulltime],
    type: "Coding Challenge",
    value: "node_factory",
    stack: ["MERN - Mongo DB, Express, React, Node"],
    other: ["Pusher IO, React Bootstrap, Mongoose"],
    description: ['This was made as a coding challenge for a job interview. I was given '+ 
    ' a project description and what the page requirements were. These included: '+ 
    '\n- a database of my choice \n- real-time capabilities NOT enabled through Google Firebase' +
    '\n- user-input validation \n- protection against injection attacks' + 
    'I had never used websockets to provide realtime interactivity before - I had always used Google Firebase - '+
    'so I had to teach myself websocket protocols and techniques for this project.', 
    'I also included mutual exclusion (mutex) protocols  to prevent multiple users from editing the '+ 
    'same data simultaneously.',
    'I built the site to the correct specifications but did not get the job - they went with ' + 
    'someone who - at the time - was more experienced than me.']
  },
  {
    name: "Interactive Game Resource Map",
    time: ["December 2018 - January 2019", "6 weeks" , "About 1-2 hours on weekends and some weekdays", fulltime],
    type: "Personal Project",
    value: "resource_map",
    stack: ["REN - React, Express, Node"],
    other: ["Corel Image Editing Suite", "React Bootstrap"],
    description: ["I built this tool when I started playing Fallout 76, an " +
    "open-world RPG set in a post-nuclear-war Applachia, specifically West Virginia. ",
    "One of the features of the game is the ability to set up automated excavators atop in-world nodes. " + 
    "Someone on Reddit had created a static resource map with all known node locations marked on the map, " + 
    "but users could not filter the map by resource - it was a good starting point, but too cluttered to be " + 
    "truly user friendly. So I built this tool to make it more so.",
    "Using the Redditor's map as a base file, I created a map of each individual resource and then overlaid them " + 
    "on each other, similar to old transparency sheets for overhead projectors. Users could then filter the resources " + 
    "by name to declutter the map and have an easier time determined where they may want to set up camp.",
    "I don't use Reddit much, so I haven't posted this tool there, but I received positive feedback from Fallout 76 players " + 
    "when I posted a link to the tool on my Facebook profile. I have also received feedback from users and will incorprate some " + 
    "of their suggestions if the tool continues to be utilized (the game is not doing too well several months after release, so " +
    "this project may become more of a theoretical, rather than a pratical, exercise)."]
  },
  {
    name: "Geovane (beta)",
    time: ["Initial Build: August 2017", "Current Build: January 2018 onwards", "Initial Build: 1 week" , "Current Build: ongoing", 
    "Intial build: 6 hours a day", "Current Build: occasional multi-hour sprints", "Intial Build: Built while attending a coding bootcamp " + 
    "working on a 3-person team", "Current Build: Working solo with a full-time job."],
    type: "Bootcamp & Personal Project",
    value: "geovane",
    stack: ["MEHN - Mongo DB, Express, Handlebars, Node"],
    other: ["jQuery, Mongoose, Google Maps API, Open Weather API, Corel Image Editing Suite"],
    description: ["This project stemmed from the first group project I "+
    "worked on in UNCC's coding bootcamp. One of my group partners and I " + 
    "had relocated to the Charlotte area from up north and would often " + 
    "drive long distances. One thing we both noted was that it was " + 
    "difficult to find concise weather forecasts for an extended trip. " +
    "We decided to build a tool that can solve that issue",
    "In both the alpha and beta versions of the project, the Google Maps API is used to plot a route. From that response "+
    "we can pull geolocation data from the information returned by to run a query to the Open Weather API to "+
    "get the current weather at that location. "+ 
    "We can then overlay a weather icon along the route generated by Google Maps. " + 
    "I also created several custom avatars to show what the current weather was in a " + 
    "UI designed for those with either a) reading diffulties or b) a preference " + 
    "for a visual representation of data versus a textual representation.",
    "This beta version is built on a full stack, whereas the alpha version "+
    " - created in bootcamp - was built on a static frontend website, with no potential "+
    "to create user profiles and favorites. This beta version lays the "+
    "framework to include that functionality, as well as query weather forecasts, "+
    "not just the current weather."]
  },
  {
    name: "Trivia Game",
    time: ["July 2017","3 days", "3-4 hours per day", bootcamp],
    type: "Bootcamp Project",
    value: "trivia",
    stack: ["HTML5, CSS3, JavaScript"],
    other: ["jQuery, Bootstrap, Custom Dataset"],
    description: ['This was a project made during my coding bootcamp. We were given '+ 
    ' instructions on what the website needed to accomplish. These included: \n- score keeping for correct answers' +
    '\n- a timer that cuts the user off if the time limit is exceded \n- the ability to accurately read user input',
    "This project does not use a dataset for it's questions and answers - it was at a time in te bootcamp before " + 
    "we had been introduced to using datasets, databases, and were even still very new to using 3rd party APIs. " + 
    "As a future imporovement, I may rebuild this site using a trivia dataset/API just to spruce it up."]
  },
  {
    name: "Catch 'Em All!",
    time: ["September 2017","1 week", "5-6 hours per day", bootcamp],
    type: "Bootcamp Project",
    value: "pokemon",
    stack: ["Handlebars, Node, Express, MySQL Database"],
    other: ["jQuery, Dataset, Bootstrap, Passport, Sequelize, Chai, Mocha, Nightmare"],
    description: ['This was the second group project made during my coding bootcamp. We were given '+ 
    ' instructions on what the website needed to have. These included: \n- a SQL database to store data' +
    '\n- user profiles \n- authentication protocls \n- the ability to accurately read user input '+
    '\n- a server on the backend to handle routing\n- a dataset to populate the database (optional)',
    "My group was browsing available datasets and we came across one with all the base stats of the then-available" + 
    "Pokemon. We hadn't been able to come up with a Project idea that at least one of us really didn't like, and " + 
    "creating a Pokemon website was the frist idea that we were at the very least ambivalent to, so we decided to " + 
    "create a survey that would help you assemble your ideal Pokemon team and would help you find other trainers with " + 
    "similar teams.",
    "I was primarily in charge of constructing the survey page and writing a custom data access layer that would parse the " + 
    "users survey answers into a usable SQL query that could return a semi-randomized Pokemon team."]
  },
  {
    name: "Hangman",
    time: ["November 2017 - December 2017","1 week", "5-6 hours per day", bootcamp],
    type: "Bootcamp/Personal Project",
    value: "pokemon",
    stack: ["MERN - Mongo DB, Express, React, Node"],
    other: ["Dataset, React Bootstrap, Corel Image Editing Suite"],
    description: ["This project was intially a challenge-homework from the Coding Bootcamp that I was unable to complete. " + 
    "After the bootcamp was completed I went back and rebuilt the site using a full MERN stack to become more familiar " + 
    "with React.", 
    "I used a biodiversity dataset from New York State's wildlife management agencies to get the options for the user to guess." + 
    "I also used Corel Draw to create an animated hangman."]
  },
  {
    name: "Arduino Projects",
    time: ["2014 - present"],
    type: "Personal Projects",
    value: "arduino",
    stack: ["C++"],
    other: ["Arduino IDE, Arduino Microcontrollers, robotic peripherals, sensors, etc"],
    description: ["I'm an amatuer roboticist and Internet of Things (IoT) enthusiast. This is a repo of my current Arduino code in case anyone is interested!"]
  },
  {
    name: "Find Your Gif",
    time: ["July 2017","2 days","2 hours a day",bootcamp],
    type: "Bootcamp Project",
    value: "gif_search",
    stack: ["HTML5, CSS3, JavaScript"],
    other: ["jQuery, Bootstrap, Ajax, Giphy API"],
    description: ["This was an early homework assignment in our bootcamp to help introduce " + 
    "us to Ajax, making API calls, and using jQuery to manipulate the DOM based on user input and "+ 
    "API responses. It uses a very basic stack and basic API calls, but it's a fun project."]
  },
  {
    name: "BBC World News Scraper",
    time: ["September 2017","2 days","5 hours a day",bootcamp],
    type: "Bootcamp Project",
    value: "bbc_scraper",
    stack: ["MEHN - Mongo DB, Express, Handlebars, Node"],
    other: ["jQuery, Mongoose, Bootstrap, Cheerio"],
    description: ["This was a later homework assignment in our bootcamp to introduce us to using MongoDB. " + 
    "We were also introduced to Cheerio, a package that allows users to remotely load a webpage and scroll "+ 
    "through it for data which is then collected - i.e. 'scraped'. ",
    "Using MongoDB, users can save article links from BBC World news as well as write notes on saved articles for later review."]
  },
  {
    name: "Retail Site Recreation",
    time: ["November 2017","2 days","8 hours a day",parttime],
    type: "Coding Challenge",
    value: "retail_page",
    stack: ["HEN - Handlebars, Express, Node"],
    other: ["jQuery, Custom Dataset"],
    description: ['This was made as a coding challenge for a job interview. I was given '+ 
    ' a wireframe model and told what sort of interactive features the page needed to have. ' + 
    'I built the site to the correct specifications but did not get the job - they went with ' + 
    'someone who - at the time - was more experienced than me.']
  },
  {
    name: "Description coming soon!",
    value: "test",
    stack: [""],
    other: [""],
    description: ['Come back in a little bit to see what I have to say about this project!']
  }
]

module.exports = projectInfo;