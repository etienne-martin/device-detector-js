# device-detector-js

Device-detector-js is a precise user agent parser and device detector written in TypeScript, backed by the largest and most up-to-date open-source user agent database.

Device-detector-js will parse any user agent and detect the browser, operating system, device used (desktop, tablet, mobile, tv, cars, console, etc.), brand and model. Works with Node.js and in the browser.

This library is heavily tested and relies on over 10,000 tests to detect thousands of user agent strings, even from rare and obscure browsers and devices.

#### This is a javascript port of [Matomo device-detector](https://github.com/matomo-org/device-detector) (3.12.6).

[![Coveralls github](https://img.shields.io/coveralls/github/etienne-martin/device-detector-js.svg)](https://coveralls.io/github/etienne-martin/device-detector-js)
[![CircleCI build](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg)](https://circleci.com/gh/etienne-martin/device-detector-js)
[![node version](https://img.shields.io/node/v/device-detector-js.svg)](https://www.npmjs.com/package/device-detector-js)
[![npm version](https://img.shields.io/npm/v/device-detector-js.svg)](https://www.npmjs.com/package/device-detector-js)
[![npm monthly downloads](https://img.shields.io/npm/dm/device-detector-js.svg)](https://www.npmjs.com/package/device-detector-js)

## Features

- No dependencies
- TypeScript support
- Thoroughly tested

## Demo

https://lx3rzx16x9.codesandbox.io/

## Getting Started

### Installation

To use device-detector-js in your project, run:

```bash
npm install device-detector-js
```

### Usage

##### ES2015 import:
```javascript
import DeviceDetector from "device-detector-js";
```

##### TypeScript import:
```typescript
import DeviceDetector = require("device-detector-js");
```

**Example** - user agent detection:

```javascript
import DeviceDetector from "device-detector-js";

const deviceDetector = new DeviceDetector();
const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36";
const device = deviceDetector.parse(userAgent);

console.log(device);
```

Output:

```json
{
  "client": {
    "type": "browser",
    "name": "Chrome",
    "version": "69.0",
    "engine": "Blink",
    "engineVersion": ""
  },
  "os": {
    "name": "Mac",
    "version": "10.13",
    "platform": ""
  },
  "device": {
    "type": "desktop",
    "brand": "Apple",
    "model": ""
  },
  "bot": null
}
```

**Example** - bot detection:

```javascript
import BotDetector from "device-detector-js/dist/parsers/bot";

const botDetector = new BotDetector();
const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 (compatible; Googlebot-Mobile/2.1; +http://www.google.com/bot.html)";
const bot = botDetector.parse(userAgent);

if (bot) {
  console.log(bot);
}
```

Output:

```json
{
  "name": "Googlebot",
  "category": "Search bot",
  "url": "http://www.google.com/bot.html",
  "producer": {
    "name": "Google Inc.",
    "url": "http://www.google.com"
  }
}
```

## API Documentation

#### new DeviceDetector([options])

- `options` <[Object]> Options object which might have the following properties:
  - `skipBotDetection` <[boolean]> If true, bot detection will completely be skipped (bots will be detected as regular devices). Defaults to `false`.
  - `versionTruncation` <[0 | 1 | 2 | 3 | null]> Passing `null` disables version truncation, so full versions will be returned. Defaults to `1`, only minor versions will be returned (e.g. X.Y).
  
## TypeScript

Type definitions are included in this library and exposed via:

```typescript
import { DeviceDetectorResult, DeviceDetectorOptions } from "device-detector-js";
``` 

## ⚠️ Browser Environment

Even though this library can run in the browser, **it is strongly advised against doing so**, unless you are not concerned with performance. Keep in mind that using this library in browser-side code means sending around 432 KB of Regex rules and 144 KB of javascript (uncompressed and unminified), which may result in a poor user experience for people with a slow Internet connection.

**You may experience inconsistencies when running this library in a browser environment, as some browsers like Safari do not yet support lookbehind syntax.**
  
## What device-detector-js is able to detect

The lists below are auto generated and updated from time to time. Some of them might not be complete.

*Last update: 2020/01/13*

### List of detected operating systems:

AIX, Android, AmigaOS, Apple TV, Arch Linux, BackTrack, Bada, BeOS, BlackBerry OS, BlackBerry Tablet OS, Brew, CentOS, Chrome OS, CyanogenMod, Debian, DragonFly, Fedora, Firefox OS, Fire OS, FreeBSD, Gentoo, Google TV, HP-UX, Haiku OS, IRIX, Inferno, KaiOS, Knoppix, Kubuntu, GNU/Linux, Lubuntu, VectorLinux, Mac, Maemo, Mandriva, MeeGo, MocorDroid, Mint, MildWild, MorphOS, NetBSD, MTK / Nucleus, Nintendo, Nintendo Mobile, OS/2, OSF1, OpenBSD, Ordissimo, PlayStation Portable, PlayStation, Red Hat, RISC OS, Remix OS, RazoDroiD, Sabayon, SUSE, Sailfish OS, Slackware, Solaris, Syllable, Symbian, Symbian OS, Symbian OS Series 40, Symbian OS Series 60, Symbian^3, ThreadX, Tizen, Ubuntu, WebTV, Windows, Windows CE, Windows IoT, Windows Mobile, Windows Phone, Windows RT, Xbox, Xubuntu, YunOs, iOS, palmOS, webOS

### List of detected browsers:

2345 Browser, 360 Phone Browser, 360 Browser, Avant Browser, ABrowse, ANT Fresco, ANTGalio, Aloha Browser, Aloha Browser Lite, Amaya, Amigo, Android Browser, AOL Shield, Arora, Amiga Voyager, Amiga Aweb, Atomic Web Browser, Avast Secure Browser, AVG Secure Browser, Beaker Browser, Beamrise, BlackBerry Browser, Baidu Browser, Baidu Spark, Basilisk, Beonex, BlackHawk, Bunjalloo, B-Line, Brave, BriskBard, BrowseX, Camino, CCleaner, Coc Coc, Comodo Dragon, Coast, Charon, CM Browser, Chrome Frame, Headless Chrome, Chrome, Chrome Mobile iOS, Conkeror, Chrome Mobile, CoolNovo, CometBird, COS Browser, ChromePlus, Chromium, Cyberfox, Cheshire, Crusta, Cunaguaro, Chrome Webview, dbrowser, Deepnet Explorer, Delta Browser, Dolphin, Dorado, Dooble, Dillo, DuckDuckGo Privacy Browser, Ecosia, Epic, Elinks, Element Browser, eZ Browser, EUI Browser, GNOME Web, Espial TV Browser, Falkon, Faux Browser, Firefox Mobile iOS, Firebird, Fluid, Fennec, Firefox, Firefox Focus, Firefox Reality, Firefox Rocket, Flock, Firefox Mobile, Fireweb, Fireweb Navigator, FreeU, Galeon, Google Earth, Hawk Turbo Browser, hola! Browser, HotJava, Huawei Browser, IBrowse, iCab, iCab Mobile, Iridium, Iron Mobile, IceCat, IceDragon, Isivioo, Iceweasel, Internet Explorer, IE Mobile, Iron, Jasmine, Jig Browser, Jio Browser, K.Browser, Kindle Browser, K-meleon, Konqueror, Kapiko, Kinza, Kiwi, Kylo, Kazehakase, Cheetah Browser, LieBaoFast, LG Browser, Links, Lovense Browser, LuaKit, Lunascape, Lynx, mCent, MicroB, NCSA Mosaic, Meizu Browser, Mercury, Mobile Safari, Midori, Mobicip, MIUI Browser, Mobile Silk, Minimo, Mint Browser, Maxthon, Nokia Browser, Nokia OSS Browser, Nokia Ovi Browser, Nox Browser, NetSurf, NetFront, NetFront Life, NetPositive, Netscape, NTENT Browser, Oculus Browser, Opera Mini iOS, Obigo, Odyssey Web Browser, Off By One, ONE Browser, Opera GX, Opera Neon, Opera Devices, Opera Mini, Opera Mobile, Opera, Opera Next, Opera Touch, Ordissimo, Oregano, Origyn Web Browser, Openwave Mobile Browser, OmniWeb, Otter Browser, Palm Blazer, Pale Moon, Oppo Browser, Palm Pre, Puffin, Palm WebPro, Palmscape, Phoenix, Polaris, Polarity, Microsoft Edge, QQ Browser Mini, QQ Browser, Qutebrowser, QupZilla, Qwant Mobile, QtWebEngine, Realme Browser, Rekonq, RockMelt, Samsung Browser, Sailfish Browser, SEMC-Browser, Sogou Explorer, Safari, SalamWeb, Shiira, SimpleBrowser, Skyfire, Seraphic Sraf, Sleipnir, Snowshoe, Sogou Mobile Browser, Splash, Sputnik Browser, Sunrise, SuperBird, Super Fast Browser, START Internet Browser, Streamy, Swiftfox, Seznam Browser, t-online.de Browser, Tao Browser, TenFourFox, Tenta Browser, Tizen Browser, TweakStyle, UBrowser, UC Browser, UC Browser Mini, UC Browser Turbo, Uzbl, Vivaldi, vivo Browser, Vision Mobile Browser, Wear Internet Browser, Web Explorer, WebPositive, Waterfox, Whale Browser, wOSBrowser, WeTab Browser, Yandex Browser, Yandex Browser Lite, Xiino

### List of detected browser engines:

WebKit, Blink, Trident, Text-based, Dillo, iCab, Elektra, Presto, Gecko, KHTML, NetFront, Edge, NetSurf, Servo

### List of detected libraries:

aiohttp, curl, Faraday, Go-http-client, Google HTTP Java Client, Guzzle (PHP HTTP Client), HTTPie, HTTP_Request2, Java, libdnf, Mechanize, OkHttp, Perl, Python Requests, Python urllib, REST Client for Ruby, RestSharp, urlgrabber (yum), Wget, WWW-Mechanize

### List of detected media players:

Audacious, Banshee, Boxee, Clementine, Deezer, FlyCast, Foobar2000, Google Podcasts, iTunes, Kodi, MediaMonkey, Miro, mpv, Music Player Daemon, NexPlayer, Nightingale, QuickTime, Songbird, Stagefright, SubStream, VLC, Winamp, Windows Media Player, XBMC

### List of detected mobile apps:

AndroidDownloadManager, AntennaPod, Apple News, Baidu Box App, BeyondPod, BingWebApp, bPod, CastBox, Castro, Castro 2, CrosswalkApp, DoggCatcher, douban App, Facebook, Facebook Messenger, FeedR, Flipboard App, Google Go, Google Play Newsstand, Google Plus, Google Search App, iCatcher, Instacast, Instagram App, Line, NewsArticle App, Overcast, Pinterest, Player FM, Pocket Casts, Podcast & Radio Addict, Podcast Republic, Podcasts, Podcat, Podcatcher Deluxe, Podkicker, RSSRadio, Sina Weibo, SogouSearch App, tieba, WeChat, WhatsApp, Yahoo! Japan, Yelp Mobile, YouTube and *mobile apps using [AFNetworking](https://github.com/AFNetworking/AFNetworking)*

### List of detected PIMs (personal information manager):

Airmail, Barca, DAVdroid, Lotus Notes, MailBar, Microsoft Outlook, Outlook Express, Postbox, SeaMonkey, The Bat!, Thunderbird

### List of detected feed readers:

Akregator, Apple PubSub, BashPodder, Breaker, Downcast, FeedDemon, Feeddler RSS Reader, gPodder, JetBrains Omea Reader, Liferea, NetNewsWire, Newsbeuter, NewsBlur, NewsBlur Mobile App, PritTorrent, Pulp, QuiteRSS, ReadKit, Reeder, RSS Bandit, RSS Junkie, RSSOwl, Stringer

### List of brands with detected devices:

3Q, 4Good, Acer, Advan, Advance, AGM, Ainol, Airness, Airties, AIS, Aiwa, Akai, Alba, Alcatel, AllCall, Allview, Allwinner, Altech UEC, altron, Amazon, AMGOO, Amoi, ANS, Apple, Archos, Arian Space, Ark, Arnova, ARRIS, Ask, Assistant, Asus, Audiovox, AVH, Avvio, Axxion, Azumi Mobile, BangOlufsen, Barnes & Noble, BBK, BDF, Becker, Beeline, Beetel, BenQ, BenQ-Siemens, BGH, Bird, Bitel, Black Fox, Blackview, Blaupunkt, Blu, Bluboo, Bluegood, Bmobile, bogo, Boway, bq, Bravis, Brondi, Bush, CAGI, Capitel, Captiva, Carrefour, Casio, Casper, Cat, Celkon, Changhong, Cherry Mobile, China Mobile, Clarmin, CnM, Coby Kyros, Comio, Compal, Compaq, ComTrade Tesla, Concord, ConCorde, Condor, Coolpad, Cowon, CreNova, Crescent, Cricket, Crius Mea, Crosscall, Cube, CUBOT, CVTE, Cyrus, Danew, Datang, Datsun, Dbtel, Dell, Denver, Desay, DEXP, Dialog, Dicam, Digi, Digicel, Digiland, Digma, DMM, DNS, DoCoMo, Doogee, Doov, Dopod, Doro, Dune HD, E-Boda, E-tel, Easypix, EBEST, Echo Mobiles, ECS, EE, EKO, Eks Mobility, Elenberg, Elephone, Energizer, Energy Sistem, Ergo, Ericsson, Ericy, Essential, Essentielb, Eton, eTouch, Etuline, Eurostar, Evercoss, Evertek, Evolio, Evolveo, EvroMedia, Explay, Extrem, Ezio, Ezze, Fairphone, Famoco, Fengxiang, FiGO, FinePower, Fly, FNB, Fondi, FORME, Forstar, Foxconn, Freetel, Fujitsu, G-TiDE, Garmin-Asus, Gateway, Gemini, General Mobile, Geotel, Ghia, Gigabyte, Gigaset, Ginzzu, Gionee, GOCLEVER, Goly, GoMobile, Google, Gradiente, Grape, Grundig, Hafury, Haier, HannSpree, Hasee, Hi-Level, Highscreen, Hisense, Hoffmann, Homtom, Hoozo, Hosin, HP, HTC, Huawei, Humax, Hyrican, Hyundai, i-Joy, i-mate, i-mobile, iBall, iBerry, IconBIT, iHunt, Ikea, iKoMo, iLA, IMO Mobile, Impression, iNew, Infinix, InFocus, Inkti, InnJoo, Innostream, Inoi, INQ, Insignia, Intek, Intex, Inverto, iOcean, iPro, Irbis, iRola, iTel, iView, iZotron, JAY-Tech, Jiayu, Jolla, Just5, K-Touch, Kaan, Kalley, Karbonn, Kazam, KDDI, Kempler & Strauss, Keneksi, Kiano, Kingsun, Kocaso, Kodak, Kogan, Komu, Konka, Konrow, Koobee, KOPO, Koridy, KRONO, Krüger&Matz, KT-Tech, Kumai, Kyocera, LAIQ, Land Rover, Landvo, Lanix, Lark, Lava, LCT, Leagoo, Ledstar, LeEco, Lemhoov, Lenco, Lenovo, Leotec, Le Pan, Lephone, Lexand, Lexibook, LG, Lingwin, Loewe, Logicom, Lumus, LYF, M.T.T., M4tel, Majestic, Manta Multimedia, Masstel, Maxwest, Maze, Mecer, Mecool, Mediacom, MediaTek, Medion, MEEG, MegaFon, Meitu, Meizu, Memup, Metz, MEU, MicroMax, Microsoft, Mio, Miray, Mitsubishi, MIXC, MLLED, Mobicel, Mobiistar, Mobiola, Mobistel, Modecom, Mofut, Motorola, Movic, Mpman, MSI, MTC, MTN, MYFON, MyPhone, Myria, MyWigo, Navon, NEC, Neffos, Netgear, NeuImage, Newgen, NEXBOX, Nexian, Nextbit, NextBook, NGM, Nikon, Nintendo, NOA, Noain, Nobby, Noblex, Nokia, Nomi, Nous, NUU Mobile, Nvidia, NYX Mobile, O+, O2, Obi, Odys, Onda, OnePlus, OPPO, Opsson, Orange, Ordissimo, Ouki, OUYA, Overmax, Oysters, Palm, Panacom, Panasonic, Pantech, PCBOX, PCD, PCD Argentina, PEAQ, Pentagram, Philips, phoneOne, Pioneer, Pixus, Ployer, Plum, Point of View, Polaroid, PolyPad, Polytron, Pomp, Positivo, PPTV, Prestigio, Primepad, ProScan, PULID, Q-Touch, Qilive, QMobile, Qtek, Quantum, Quechua, R-TV, Ramos, RCA Tablets, Readboy, Rikomagic, RIM, Rinno, Ritmix, Riviera, Roadrover, Rokit, Roku, Rombica, Ross&Moor, Rover, RoverPad, RT Project, Safaricom, Sagem, Samsung, Sanei, Santin BiTBiZ, Sanyo, Savio, Sega, Selevision, Selfix, Sencor, Sendo, Senseit, Senwa, SFR, Sharp, Shuttle, Siemens, Sigma, Silent Circle, Simbans, Sky, Skyworth, Smart, Smartfren, Smartisan, Softbank, Sonim, Sony, Sony Ericsson, Spice, Star, Starway, STF Mobile, STK, Stonex, Storex, Sumvision, SunVan, SuperSonic, Supra, SWISSMOBILITY, Symphony, Syrox, T-Mobile, TB Touch, TCL, TechniSat, TechnoTrend, TechPad, Teclast, Tecno Mobile, Telefunken, Telego, Telenor, Telit, Tesco, Tesla, teXet, ThL, Thomson, TIANYU, Timovi, TiPhone, Tolino, Tooky, Top House, Toplux, Toshiba, Touchmate, TrekStor, Trevi, True, Tunisie Telecom, Turbo, Turbo-X, TVC, U.S. Cellular, Uhappy, Ulefone, UMIDIGI, Unimax, Uniscope, Unknown, Unnecto, Unonu, Unowhy, UTOK, UTStarcom, Vastking, Venso, Verizon, Vernee, Vertex, Vertu, Verykool, Vestel, VGO TEL, Videocon, Videoweb, ViewSonic, Vinsoc, Vitelcom, Vivax, Vivo, Vizio, VK Mobile, Vodafone, Vonino, Vorago, Voto, Voxtel, Vulcan, Walton, Web TV, Weimei, WellcoM, Wexler, Wiko, Wileyfox, Wink, Wolder, Wolfgang, Wonu, Woo, Woxter, X-TIGI, X-View, Xiaolajiao, Xiaomi, Xion, Xolo, Yandex, Yarvik, Yes, Yezz, Ytone, Yu, Yuandao, Yusun, Zeemi, Zen, Zenek, Zonda, Zopo, ZTE, Zuum, Zync, ZYQ, öwn

### List of detected bots:

360Spider, Aboundexbot, Acoon, AddThis.com, ADMantX, aHrefs Bot, Alexa Crawler, Alexa Site Audit, Amazon Route53 Health Check, Amorank Spider, Analytics SEO Crawler, ApacheBench, Applebot, Arachni, archive.org bot, Ask Jeeves, Awario, Awario, Backlink-Check.de, BacklinkCrawler, Baidu Spider, BazQux Reader, BingBot, BitlyBot, Blekkobot, BLEXBot Crawler, Bloglovin, Blogtrottr, BoardReader, BoardReader Blog Indexer, Bountii Bot, BrandVerity, Browsershots, BUbiNG, Buck, Butterfly Robot, Bytespider, CareerBot, Castro 2, Catchpoint, CATExplorador, ccBot crawler, Charlotte, Cliqzbot, CloudFlare Always Online, CloudFlare AMP Fetcher, Collectd, CommaFeed, CSS Certificate Spider, Cốc Cốc Bot, Datadog Agent, Datanyze, Dataprovider, Daum, Dazoobot, Discobot, Domain Re-Animator Bot, DotBot, DuckDuckGo Bot, Easou Spider, eCairn-Grabber, EMail Exractor, EmailWolf, Embedly, evc-batch, ExaBot, ExactSeek Crawler, Ezooms, eZ Publish Link Validator, Facebook External Hit, Feedbin, FeedBurner, Feedly, Feedspot, Feed Wrangler, Fever, Findxbot, Flipboard, FreshRSS, Generic Bot, Generic Bot, Genieo Web filter, Gigablast, Gigabot, Gluten Free Crawler, Gmail Image Proxy, Goo, Googlebot, Google Favicon, Google PageSpeed Insights, Google Partner Monitoring, Google Search Console, Google Structured Data Testing Tool, Grapeshot, Heritrix, Heureka Feed, HTTPMon, HubPages, HubSpot, ICC-Crawler, ichiro, IDG/IT, IIS Site Analysis, Inktomi Slurp, inoreader, IP-Guide Crawler, IPS Agent, Kaspersky, Kouio, Larbin web crawler, LCC, Let's Encrypt Validation, Lighthouse, Linkdex Bot, LinkedIn Bot, LTX71, Lycos, Magpie-Crawler, MagpieRSS, Mail.Ru Bot, masscan, Mastodon Bot, Meanpath Bot, MetaInspector, MetaJobBot, Mixrank Bot, MJ12 Bot, Mnogosearch, MojeekBot, Monitor.Us, Munin, Nagios check_http, NalezenCzBot, nbertaupete95, Netcraft Survey Bot, netEstate, NetLyzer FastProbe, NetResearchServer, Netvibes, NewsBlur, NewsGator, NLCrawler, Nmap, Nutch-based Bot, Nuzzel, oBot, Octopus, Omgili bot, Openindex Spider, OpenLinkProfiler, OpenWebSpider, Orange Bot, Outbrain, PagePeeker, PaperLiBot, Phantomas, PHP Server Monitor, Picsearch bot, Pingdom Bot, Pinterest, PocketParser, Pompos, PritTorrent, QuerySeekerSpider, Quora Link Preview, Qwantify, Rainmeter, RamblerMail Image Proxy, Reddit Bot, Riddler, Rogerbot, ROI Hunter, RSSRadio Bot, SafeDNSBot, Scooter, ScoutJet, Scrapy, Screaming Frog SEO Spider, ScreenerBot, Semrush Bot, Sensika Bot, Sentry Bot, SEOENGBot, SEOkicks-Robot, Seoscanners.net, Server Density, Seznam Bot, Seznam Email Proxy, Seznam Zbozi.cz, ShopAlike, Shopify Partner, ShopWiki, SilverReader, SimplePie, SISTRIX Crawler, SISTRIX Optimizer, Site24x7 Website Monitoring, Siteimprove, SiteSucker, Sixy.ch, Skype URI Preview, Slackbot, SMTBot, Snapchat Proxy, Sogou Spider, Soso Spider, Sparkler, Speedy, Spinn3r, Spotify, Sputnik Bot, sqlmap, SSL Labs, Startpagina Linkchecker, StatusCake, Superfeedr Bot, Survey Bot, Tarmot Gezgin, TelegramBot, The Knowledge AI, theoldreader, TinEye Crawler, Tiny Tiny RSS, TLSProbe, TraceMyFile, Trendiction Bot, TurnitinBot, TweetedTimes Bot, Tweetmeme Bot, Twingly Recon, Twitterbot, UkrNet Mail Proxy, UniversalFeedParser, Uptimebot, Uptime Robot, URLAppendBot, Vagabondo, Visual Site Mapper Crawler, VK Share Button, W3C CSS Validator, W3C I18N Checker, W3C Link Checker, W3C Markup Validation Service, W3C MobileOK Checker, W3C Unified Validator, Wappalyzer, WebbCrawler, Weborama, WebPageTest, WebSitePulse, WebThumbnail, WeSEE:Search, WikiDo, Willow Internet Crawler, WooRank, WordPress, Wotbox, YaCy, Yahoo! Cache System, Yahoo! Japan BRW, Yahoo! Link Preview, Yahoo! Slurp, Yahoo Gemini, Yandex Bot, Yeti/Naverbot, Yottaa Site Monitor, Youdao Bot, Yourls, Yunyun Bot, Zao, Ze List, zgrab, Zookabot, ZumBot

## Built with

* [Matomo device detector](https://github.com/matomo-org/device-detector) - A powerful device detection library.
* [node.js](https://nodejs.org/en/) - Cross-platform JavaScript run-time environment for executing JavaScript code server-side. 
* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript.
* [Jest](https://facebook.github.io/jest/) - Delightful JavaScript Testing.

## Contributing

When contributing to this project, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Update the [README.md](https://github.com/etienne-martin/device-detector-js/blob/master/README.md) with details of changes to the library.

Execute `yarn test` and update the [tests](https://github.com/etienne-martin/device-detector-js/tree/master/src/tests) if needed.

### How to update to a newer version of matomo?

This library needs to be updated when matomo releases a new version of their library. Here's how to proceed: 

1. Pull the master branch from this repo
2. Update the `https://github.com/matomo-org/device-detector#{version-number}` to the latest version of matomo device detector in the package.json
3. Run `yarn fixtures` to update to the latest fixtures. This will download new fixtures based on the version specified in the package.json
4. Run `yarn test` and update the library if some tests are failing
5. Open a PR

### Why do tests fail after downloading new fixtures?

When matomo releases a new version, they usually add support for new brands. [Those brands](https://github.com/matomo-org/device-detector/blob/1060530615c54796cc2045a030c7c605574060d2/Parser/Device/DeviceParserAbstract.php#L65) needs to be copied over to [this file](https://github.com/etienne-martin/device-detector-js/blob/master/src/tests/fixtures/brands.json).  

## Authors

* **Etienne Martin** - *Initial work* - [etiennemartin.ca](http://etiennemartin.ca/)
* **Alex Beauchemin** - *Contributor* - [linkedin.com/in/alexbeauchemin](https://www.linkedin.com/in/alexbeauchemin/)
* **Ayan Dey** - *Contributor* - [linkedin.com/in/dey-ayan](https://www.linkedin.com/in/dey-ayan) 

## License

This is a free/libre library under license LGPL v3 or later.
