import generativeArt from "./img/projects/generative.png";
import weword from "./img/projects/weword.png";
import chime from "./img/projects/chime.png";
import rollout from "./img/projects/rollout.png";
// import socialmedai from "./img/projects/socialmedai.png";
import multitaskilus from "./img/projects/multitaskilus.png";
// import honestlyy from "./img/projects/honestlyy.png";
import sqar from "./img/projects/sqar.png";
import sqr from "./img/projects/sqr.png";
import odyssey from "./img/projects/odyssey.png";
import jhumpa from "./img/projects/jhumpa.png";
import justgothatway from "./img/projects/justgothatway.png";
import electric from "./img/projects/electric.png";
import affirm from "./img/projects/affirm.png";
import whoaffirm from "./img/projects/whoaffirm.png";
import shift from "./img/projects/shift.jpg";
import finerflame from "./img/projects/finerflame.jpg";
import riprimaz from "./img/projects/riprimaz.jpg";
import sftransit from "./img/projects/sftransit.png";

export type Project = {
  title: string;
  content: string;
  date: string;
  url?: string;
  imgSrc?: string;
  href?: string;
};

export const CODE_PROJECTS: Project[] = [
  {
    title: "weword",
    date: "winter 2019",
    imgSrc: weword,
    content:
      "i used some websockets to build a crowdsourced writing game. anonymous internet users contributed 20,000 words until 4chan destroyed it.",
    href: "https://medium.com/shiftcreatorspace/can-the-internet-crowdsource-stories-a-story-of-losing-some-hope-regaining-it-then-losing-it-all-97ca9c0bbdaf",
  },
  {
    title: "generative art",
    date: "winter 2021",
    imgSrc: generativeArt,
    content:
      "i used p5 and threejs to code up some neat lookin generative art for fun. i also wrote a medium article about my progress and struggles.",
    href: "https://g.noahfiner.com",
  },
  {
    title: "chime menu",
    date: "summer 2020",
    imgSrc: chime,
    content:
      "not the bank. i worked with a few people on a qr code menu startup. i led the frontend and built out 20 pages of react & redux. we got us a few hundred orders per week back in covid times.",
    href: "https://chimemenu.com/",
  },
  {
    title: "rollout",
    date: "never lol",
    imgSrc: rollout,
    content:
      "failed peer to peer delivery startup. i built a bunch of react native screens that never got hooked up to a backend lol",
    href: "https://rollout.noahfiner.com/",
  },
  // {
  //   title: "socialmedAI",
  //   date: "fall 2018",
  //   imgSrc: socialmedai,
  //   content:
  //     "lil hackathon project where we analyzed what made instagram posts good or bad. our group won best use of clarifAI's API and got a tote bag.",
  //    href: "https://www.youtube.com/watch?v=rRRWZ08uLQE",
  // },
];

export const NON_CODE_PROJECTS: Project[] = [
  {
    title: "sftransit.fun",
    date: "2025",
    imgSrc: sftransit,
    content:
      "anonymously launched fun train quiz by purchasing bart ads. made 50+ assets in figma draw and animated them in react. got front page of r/sanfrancisco + r/bart and interviewed by sfgate and sfstandard. 30k+ responses.",
    href: "https://www.sfgate.com/local/article/bart-station-ad-san-francisco-transit-test-20766361.php",
  },
  {
    title: "who killed rimaz?",
    date: "2024",
    imgSrc: riprimaz,
    content:
      "hosted an insane murder mystery party with friends by renting a venue, writing four puzzles, coding a detective dashboard w/ live voting, and buying $100 of dippin' dots",
    href: "https://partiful.com/e/LbdrKbsjnmRsQ39nwqds",
  },
  {
    title: "@umichaffirmations",
    date: "2021 & 22",
    imgSrc: affirm,
    content:
      "i anonymously created and ran a viral post-ironic maximalist college meme page. i grew it from 0 to 13k followers, donated $200 of merch profits, and hosted scavenger hunts + a snowball fight",
    href: "https://www.michigandaily.com/statement/i-am-the-college-experience-post-ironic-affirmations-spread-to-campuses-around-the-world/",
  },
  {
    title: "who is @umichaffirmations?",
    date: "march 22",
    imgSrc: whoaffirm,
    content:
      "for my admin reveal i forced students to solve 8 puzzles involving morse code, a piazza class, and wordle for $350 of prizes. 3,500 started the hunt but only 108 brave souls finished.",
    href: "https://www.michigandaily.com/news/students-solve-series-of-puzzles-to-uncover-identity-of-umichaffirmations/",
  },
  {
    title: "mc finer flame",
    date: "forever",
    imgSrc: finerflame,
    content:
      "hear me rap about coding & covid, then later sing about my emotions. i produce in ableton and record in my closet.",
    href: "https://open.spotify.com/artist/6logsn6gZDzDoEdZvnKn1d?si=4aGPOZm3TyGgBA6w9Y18ZQ",
  },
  {
    title: "shift creator space",
    date: "2019-22",
    imgSrc: shift,
    content:
      "i co-led shift creator space, a special community of 30 people that encouraged creativity and making things you actually care about. helped w/ events, small discussions, showcases, and vibes",
    href: "https://2021.shiftcreator.space",
  },
];

export const JQUERY_GAMES: Project[] = [
  {
    title: "multitaskilus",
    date: "fall 2016",
    imgSrc: multitaskilus,
    content:
      "a lit game where you have fun by getting stressed. got a bunch of my friends to hate me for this one.",
    href: "https://multitaskilus.noahfiner.com/",
  },
  // {
  //   title: "honestlyy",
  //   date: "2017",
  //   imgSrc: honestlyy,
  //   content:
  //     "a game where you answer random questions. uses postgres and rails. there's a 70% chance heroku shut this server down.",
  // },
  {
    title: "just go that way",
    date: "2016",
    imgSrc: justgothatway,
    content: "a game where you just go that way",
    href: "https://justgothatway.noahfiner.com/",
  },
  {
    title: "particle simulation",
    date: "fall 2018",
    imgSrc: electric,
    content:
      "i convinced my teacher to let me code up some electrons whizzing around so i didn't need to write an essay",
    href: "https://electric-force-sim.noahfiner.com/",
  },
  {
    title: "sqar",
    date: "2016",
    imgSrc: sqar,
    content:
      "you are a blue box and you have to escape the red boxes. a game of strategy, wit, and cool shadows i spent 3 days on",
    href: "https://sqar.noahfiner.com/",
  },
  {
    title: "odyssey games",
    date: "2016",
    imgSrc: odyssey,
    content:
      "my teacher let me code a bunch of lit games instead of writing an essay about homer's odyssey. play them by mashing your keyboard.",
    href: "https://odyssey-games.noahfiner.com/hub.html",
  },
  {
    title: "jhumpa simulator",
    date: "2016",
    imgSrc: jhumpa,
    content:
      "another teach let me code a hype game instead of writing an essay. a psychoanalysis of author jhumpa lahiri where you play as her brain repressing emotions.",
    href: "https://jhumpa-simulator.noahfiner.com/",
  },
  {
    title: "sqr",
    date: "2015",
    imgSrc: sqr,
    content:
      "the prequel of sqar. the first game that i coded. you are a blue box and you gotta see how long you can evade the red ones.",
    href: "https://sqr.noahfiner.com/",
  },
];
