---
layout: entry
title: ELIZA
author: pswg
lang: Node.js
---

<div style="float: right"><img src="avatar.png" src="Image of Eliza"></div>

ELIZA, your personal digital therapist. This is a recreation of one the first conversational agents
ever written. 

> ELIZA is an early natural language processing computer program created from 1964 to 1966 at the
> MIT Artificial Intelligence Laboratory by Joseph Weizenbaum. Created to demonstrate the
> superficiality of communication between humans and machines, Eliza simulated conversation by
> using a 'pattern matching' and substitution methodology that gave users an illusion of
> understanding on the part of the program, but had no built in framework for contextualizing
> events. Directives on how to interact were provided by 'scripts', written originally in MAD-Slip,
> which allowed ELIZA to process user inputs and engage in discourse following the rules and
> directions of the script. The most famous script, DOCTOR, simulated a Rogerian psychotherapist
> (in particular, Carl Rogers, who was well-known for simply parroting back at patients what
> they'd just said) and used rules, dictated in the script, to respond with non-directional
> questions to user inputs. As such, ELIZA was one of the first chatterbots and one of the first
> programs capable of attempting the Turing Test.

> &mdash; Source: [Wikipedia](https://en.wikipedia.org/wiki/ELIZA)

## Usage

ELIZA will join the `#general` channel and listen to mentions of her name and respond with a
general message about herself.

ELIZA will respond to any direct messages by starting a therapy session with the sender, which
will expire after 10 minutes of inactivity. Users may also directly end a therapy session by
simply saying `quit`, or any of the other "stop words" she recognizes.

## Design

Libraries used:

- `irc-framework` A better IRC framework for node.js. For bots and full clients.
- `elizabot` Adaptation of http://www.masswerk.at/elizabot/ eliza chat bot to a node.js command
   line app.

ELIZA uses a very simple pattern-matching system to parse input phrases and formulate pseudo-random
responses based on pre-defined templates in an effort to redirect any statements back onto the
user. She listens for certain keywords, such as "feel" or "dream" to identify opportunities for
further questioning. She will also try to 'reflect' certain phrases back to the user, for example
if the user says, "I am sad", ELIZA might respond, "I am sorry to hear that you are sad."

She has very basic contextual memory of previous topics, allowing for some degree of conversational
cohesiveness. Here's an example conversation:

 > **human**: Hi  
 > **ELIZA**: Please tell me what's been bothering you.  
 > **human**: I have a headache  
 > **ELIZA**: You say you have a headache ?  
 > **human**: That's right  
 > **ELIZA**: Tell me more about that.  
 > **human**: I feel tired  
 > **ELIZA**: Tell me more about such feelings.  
 > **human**: I could not sleep last night  
 > **ELIZA**: Do you say you could not sleep last night for some special reason ?  
 > **human**: the room was too hot  
 > **ELIZA**: What does that suggest to you ?  
 > **human**: I should have turned on the air  
 > **ELIZA**: That's quite interesting.  
 > **human**: Bye  
 > **ELIZA**: Goodbye.  This was really a nice talk.

The full lexicon of ELIZA's keywords and possible responses can be found here:

 - https://github.com/tkafka/node-elizabot/blob/master/elizadata.js
