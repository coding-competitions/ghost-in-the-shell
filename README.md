<div class="ghp-hide">
  <em>NOTE:</em> Due to limitations of GitHub's markdown rendering, it is 
  highly recommended that you view this page 
  <a href="https://coding-competitions.github.io/ghost-in-the-shell/">here</a>.
</div>

# Ghost in the Shell

The internet is a strange place full of dark and mysterious beings. When you talk with another
user online, you never know exactly who or *what* is on the other side of the monitor. Some
servers could in fact be
👻<span class="ghp-haunted"><i>h</i><i>a</i><i>u</i><i>n</i><i>t</i><i>e</i><i>d</i></span>👻.

You're going to create a program to haunt a server yourself in the form a chat bot. Make it 
<span class="ghp-haunted"><i>S</i><i>P</i><i>O</i><i>O</i><i>P</i><i>Y</i><i>™</i><i>!</i></span>

## Challenge

Write a complete program capable of mimicking naturalistic human conversation via [IRC][1]. Your
program (bot) must be packaged within a Docker container for easy deployment.

The submission must be accompanied by a `README.md` file which contains details about the design
and purpose of your chatbot, with a yaml header in the following format:

    ---
    layout: entry
    title: { title / nick }
    author: { github username }
    lang: { language }
    ---

    { description of the entry }

    ## Usage

    { description of commands or tips for interacting with the bot }

    ## Design

    { description of various components / tools used }

See the the [ELIZA](_bots/eliza/README) sample bot.

You may use any word lists / lexicons / corpora data you like to parse inputs or construct
responses, but all data used must be freely available and open to inspection by others by download,
or the data must be included as source code in the submission (and should be kept to a reasonable
size). This includes for example,

  - [Princeton's WordNet Lexicon][2]
  - [Open Source Shakespeare Database][3]
  - A log of a given Twitter user's tweets

However, this would *exclude* any data that is not freely available or cannot be readily inspected
by others, such as:

  - [IBM's Watson][4] or other closed-source or cloud-hosted AI.
  - [Mechanical Turk][5]-type solutions that offload work to human.

Whatever data is used, you must explain were that data came from and how that data is used by your
bot.

You may additionally use any libraries beyond the core libraries of your platform, but you must
explain how each library is used by your bot.

Your chatbot must identify itself as a bot using the `+B` user mode, must avoid spamming users or
channels, and it should try to avoid getting into an infinite loop chatting with other bots.

### Utilities

To generate an environment for local testing and development you may use the provided
`docker-compose.yml` file. If you're not familiar with Docker or Docker Compose, see
[Docker](Docker.md).

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

A submission may be rejected if it fails to satisfy any of the requirements 
described above, if the moderators of the competition are unable to compile or 
run the program, or if the entry appears to be copied from other entries 
without any significant modification. For additional guidelines, see 
[Judging](Judging.md).

This is a **subjective** competition, meaning the winner will be decided by 
popular vote. Votes will be cast via an online poll. A link to the poll will be
provided when the voting session begins. Any eligible voter is welcome vote on
any accepted entry, *including their own*.

The final vote count shall be taken on **Monday, November 4, 2019**. Votes
submitted after this date shall not be counted.

The entry that receives the most votes shall be declared the winner. In the 
event of a tie, the entry with the lower golf score shall be declared the 
winner.

## Awards

*TBD*.

  [1]: https://en.wikipedia.org/wiki/Internet_Relay_Chat
  [2]: https://wordnet.princeton.edu/
  [3]: http://www.opensourceshakespeare.org/
  [4]: https://www.ibm.com/watson
  [5]: https://en.wikipedia.org/wiki/The_Turk
  [7]: https://irssi.org/