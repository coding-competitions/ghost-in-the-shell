<div class="ghp-hide">
  <em>NOTE:</em> Due to limitations of GitHub's markdown rendering, it is 
  highly recommended that you view this page 
  <a href="https://coding-competitions.github.io/ghost-in-the-shell/">here</a>.
</div>

# Ghost in the Shell

The internet is a strange place full of dark and mysterious beings. When you talk with another
user online, you never know exactly who or *what* is on the other side of the monitor. Some
servers could in fact be 👻<span class="ghp-haunted">haunted</span>👻.

## Challenge

Write a complete program capable of mimicking naturalistic human conversation via [IRC][1].

You may use any word lists / lexicons / corpora data you like to parse inputs or construct
responses, but all data used must be freely available and open to inspection by others by download,
or the data must be included as source code in the submission (and should be kept to a reasonable
size). This includes for example,

  - [Princeton's WordNet Lexicon][2]
  - [Open Source Shakespeare Database][3] 
  - A log of a given Twitter user's tweets.

However, this would *exclude* any data that is not freely available or cannot be readily inspected
by others, such as:

  - [IBM's Watson][4] or other closed-source or cloud-hosted AI.
  - [Mechanical Turk][5]-type solutions that offload work to human.

Whatever data is used, you must explain were that data came from and how that data is used by your
bot.

You may additionally use any libraries beyond the core libraries of your platform, but you must
explain how each library is used by your bot.

Your bot must be packaged within a Docker container for deployment.

### Utilities

To generate an environment for local testing and development you may use the provided
`docker-compose.yml` file. If you're not familiar with Docker or Docker Compose, see [Docker][6].

To start the development environment, use

    docker-compose up

To add your bot to the development environment, add a new entry to the `docker-compose.yml`
file under `services`, like this:

    services:
      # ----- BOTS -----
      mybot:
        build: ./_bots/mybot
        restart: always

To test your bot, connect to the web interface via http://localhost:9000/ or using your IRC client
of choice, e.g. using [irssi][7]

    irssi -c localhost

To rebuild the docker container for your bot after you've made changes locally, use

    docker-compose up --build

To tear down any artifacts from the development environment, use

    docker-compose down


## Submissions

To submit an entry to this competition, start off by forking this repo. Create 
a new subdirectory under `_bots/` to house your entry, and develop your 
code under there. Write a `README.md` file which includes the relevant 
information as described in the [Challenge](#Challenge). Once you're satisfied 
with the results, submit a pull request to have your entry merged in with the 
others.

Contestants may submit multiple entries.

Entries must be submitted as a pull request on or before
**Wednesday, October 30, 2019**.

## Judging

## Awards

  [1]: https://en.wikipedia.org/wiki/Internet_Relay_Chat
  [2]: https://wordnet.princeton.edu/
  [3]: http://www.opensourceshakespeare.org/
  [4]: https://www.ibm.com/watson
  [5]: https://en.wikipedia.org/wiki/The_Turk
  [6]: Docker.md
  [7]: https://irssi.org/