# device-detector-js

The Universal Device Detection library will parse any User Agent and detect the browser, operating system, device used (desktop, tablet, mobile, tv, cars, console, etc.), brand and model. Works with Node.js and in the browser.

This library is heavily tested and relies on over 6000 tests to detect thousands of different device types.

#### This is a javascript port of [Matomo device-detector](https://github.com/etienne-martin/matomo-device-detector) (3.11.2).

[![Coveralls github](https://img.shields.io/coveralls/github/etienne-martin/device-detector-js.svg)](https://coveralls.io/github/etienne-martin/device-detector-js)
[![CircleCI build](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg)](https://circleci.com/gh/etienne-martin/device-detector-js)
[![node version](https://img.shields.io/node/v/device-detector-js.svg)](https://www.npmjs.com/package/device-detector-js)
[![npm version](https://img.shields.io/npm/v/device-detector-js.svg)](https://www.npmjs.com/package/device-detector-js)
[![npm monthly downloads](https://img.shields.io/npm/dm/device-detector-js.svg)](https://www.npmjs.com/package/device-detector-js)

## Online Demo

https://lx3rzx16x9.codesandbox.io/

## Getting Started

### Installation

To use device-detector-js in your project, run:

```bash
npm install device-detector-js
```

### Usage

##### CommonJS
```javascript
const DeviceDetector = require("device-detector-js");
```

##### TypeScript
```typescript
import DeviceDetector = require("device-detector-js");
```

**Example** - simple user agent detection:

```javascript
const DeviceDetector = require("device-detector-js");

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
const BotDetector = require("device-detector-js/dist/parsers/bot");

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
  - `cache` <[boolean | number]> TTL of the cache (in seconds). Node.js only, will be automatically set to `false` if used in the browser. Defaults to `true` (no expiry).
  
#### new BotDetector([options])

- `options` <[Object]> Options object which might have the following property:
  - `cache` <[boolean | number]> TTL of the cache (in seconds). Node.js only, will be automatically set to `false` if used in the browser. Defaults to `true` (no expiry).
  
## What device-detector-js is able to detect

The lists below are auto generated and updated from time to time. Some of them might not be complete.

*Last update: 2018/09/12*

### List of detected operating systems:

AIX, Android, AmigaOS, Apple TV, Arch Linux, BackTrack, Bada, BeOS, BlackBerry OS, BlackBerry Tablet OS, Brew, CentOS, Chrome OS, CyanogenMod, Debian, DragonFly, Fedora, Firefox OS, Fire OS, FreeBSD, Gentoo, Google TV, HP-UX, Haiku OS, IRIX, Inferno, KaiOS, Knoppix, Kubuntu, GNU/Linux, Lubuntu, VectorLinux, Mac, Maemo, Mandriva, MeeGo, MocorDroid, Mint, MildWild, MorphOS, NetBSD, MTK / Nucleus, Nintendo, Nintendo Mobile, OS/2, OSF1, OpenBSD, PlayStation Portable, PlayStation, Red Hat, RISC OS, Remix OS, RazoDroiD, Sabayon, SUSE, Sailfish OS, Slackware, Solaris, Syllable, Symbian, Symbian OS, Symbian OS Series 40, Symbian OS Series 60, Symbian^3, ThreadX, Tizen, Ubuntu, WebTV, Windows, Windows CE, Windows IoT, Windows Mobile, Windows Phone, Windows RT, Xbox, Xubuntu, YunOs, iOS, palmOS, webOS

### List of detected browsers:

360 Phone Browser, 360 Browser, Avant Browser, ABrowse, ANT Fresco, ANTGalio, Aloha Browser, Amaya, Amigo, Android Browser, Arora, Amiga Voyager, Amiga Aweb, Atomic Web Browser, Avast Secure Browser, BlackBerry Browser, Baidu Browser, Baidu Spark, Beonex, Bunjalloo, B-Line, Brave, BriskBard, BrowseX, Camino, Coc Coc, Comodo Dragon, Coast, Charon, Chrome Frame, Headless Chrome, Chrome, Chrome Mobile iOS, Conkeror, Chrome Mobile, CoolNovo, CometBird, ChromePlus, Chromium, Cyberfox, Cheshire, Cunaguaro, dbrowser, Deepnet Explorer, Dolphin, Dorado, Dooble, Dillo, Epic, Elinks, Element Browser, GNOME Web, Espial TV Browser, Firebird, Fluid, Fennec, Firefox, Firefox Focus, Flock, Firefox Mobile, Fireweb, Fireweb Navigator, Galeon, Google Earth, HotJava, Iceape, IBrowse, iCab, iCab Mobile, Iridium, IceDragon, Isivioo, Iceweasel, Internet Explorer, IE Mobile, Iron, Jasmine, Jig Browser, Kindle Browser, K-meleon, Konqueror, Kapiko, Kylo, Kazehakase, Liebao, LG Browser, Links, LuaKit, Lunascape, Lynx, MicroB, NCSA Mosaic, Mercury, Mobile Safari, Midori, MIUI Browser, Mobile Silk, Maxthon, Nokia Browser, Nokia OSS Browser, Nokia Ovi Browser, NetSurf, NetFront, NetFront Life, NetPositive, Netscape, NTENT Browser, Obigo, Odyssey Web Browser, Off By One, ONE Browser, Opera Mini, Opera Mobile, Opera, Opera Next, Oregano, Openwave Mobile Browser, OmniWeb, Otter Browser, Palm Blazer, Pale Moon, Oppo Browser, Palm Pre, Puffin, Palm WebPro, Palmscape, Phoenix, Polaris, Polarity, Microsoft Edge, QQ Browser, Qutebrowser, QupZilla, Rekonq, RockMelt, Samsung Browser, Sailfish Browser, SEMC-Browser, Sogou Explorer, Safari, Shiira, Skyfire, Seraphic Sraf, Sleipnir, SeaMonkey, Snowshoe, Sunrise, SuperBird, Streamy, Swiftfox, Tizen Browser, TweakStyle, UC Browser, Vivaldi, Vision Mobile Browser, WebPositive, Waterfox, wOSBrowser, WeTab Browser, Yandex Browser, Xiino

### List of detected browser engines:

WebKit, Blink, Trident, Text-based, Dillo, iCab, Elektra, Presto, Gecko, KHTML, NetFront, Edge, NetSurf

### List of detected libraries:

aiohttp, curl, Faraday, Go-http-client, Google HTTP Java Client, Guzzle (PHP HTTP Client), HTTP_Request2, Java, libdnf, Mechanize, OkHttp, Perl, Python Requests, Python urllib, urlgrabber (yum), Wget, WWW-Mechanize

### List of detected media players:

Audacious, Banshee, Boxee, Clementine, Deezer, FlyCast, Foobar2000, iTunes, Kodi, MediaMonkey, Miro, NexPlayer, Nightingale, QuickTime, Songbird, Stagefright, SubStream, VLC, Winamp, Windows Media Player, XBMC

### List of detected mobile apps:

AndroidDownloadManager, AntennaPod, Apple News, BeyondPod, bPod, Castro, Castro 2, DoggCatcher, Facebook, Facebook Messenger, FeedR, Google Play Newsstand, Google Plus, iCatcher, Instacast, Line, Overcast, Pinterest, Player FM, Pocket Casts, Podcast & Radio Addict, Podcast Republic, Podcasts, Podcat, Podcatcher Deluxe, Podkicker, Sina Weibo, WeChat, WhatsApp, Yahoo! Japan, Yelp Mobile, YouTube  and *mobile apps using [AFNetworking](https://github.com/AFNetworking/AFNetworking)*

### List of detected PIMs (personal information manager):

Airmail, Barca, DAVdroid, Lotus Notes, MailBar, Microsoft Outlook, Outlook Express, Postbox, The Bat!, Thunderbird

### List of detected feed readers:

Akregator, Apple PubSub, BashPodder, Downcast, FeedDemon, Feeddler RSS Reader, gPodder, JetBrains Omea Reader, Liferea, NetNewsWire, Newsbeuter, NewsBlur, NewsBlur Mobile App, PritTorrent, Pulp, ReadKit, Reeder, RSS Bandit, RSS Junkie, RSSOwl, Stringer

### List of brands with detected devices:

3Q, 4Good, Acer, Ainol, Airness, Airties, Aiwa, Alcatel, Allview, Altech UEC, Amazon, Amoi, Apple, Archos, Arnova, ARRIS, Asus, Audiovox, Avvio, Axxion, Azumi Mobile, BangOlufsen, Barnes & Noble, BBK, Becker, Beetel, BenQ, BenQ-Siemens, BGH, Bird, Bitel, Blackview, Blaupunkt, Blu, Bmobile, Boway, bq, Bravis, Brondi, Bush, Capitel, Captiva, Carrefour, Casio, Cat, Celkon, Changhong, Cherry Mobile, China Mobile, CnM, Coby Kyros, Compal, Compaq, ConCorde, Condor, Coolpad, Cowon, CreNova, Cricket, Crius Mea, Crosscall, Cube, CUBOT, Cyrus, Danew, Datang, Dbtel, Dell, Denver, Desay, DEXP, Dialog, Dicam, Digma, DMM, DNS, DoCoMo, Doogee, Doov, Dopod, Doro, Dune HD, E-Boda, Easypix, EBEST, ECS, EKO, Elephone, Energy Sistem, Ericsson, Ericy, Essential, Eton, eTouch, Evertek, Evolveo, Explay, Ezio, Ezze, Fairphone, Fly, Foxconn, Freetel, Fujitsu, Garmin-Asus, Gateway, Gemini, Gigabyte, Gigaset, Gionee, GOCLEVER, Goly, Google, Gradiente, Grundig, Haier, HannSpree, Hasee, Hi-Level, Hisense, Homtom, Hosin, HP, HTC, Huawei, Humax, Hyrican, Hyundai, i-Joy, i-mate, i-mobile, iBall, iBerry, IconBIT, Ikea, iKoMo, iNew, Infinix, Inkti, Innostream, INQ, Intek, Intex, Inverto, iOcean, iTel, JAY-Tech, Jiayu, Jolla, K-Touch, Karbonn, Kazam, KDDI, Kiano, Kingsun, Kogan, Komu, Konka, Konrow, Koobee, KOPO, Koridy, KT-Tech, Kumai, Kyocera, Landvo, Lanix, Lava, LCT, LeEco, Lenco, Lenovo, Le Pan, Lexand, Lexibook, LG, Lingwin, Loewe, Logicom, LYF, M.T.T., Majestic, Manta Multimedia, Mecer, Mediacom, MediaTek, Medion, MEEG, Meizu, Memup, Metz, MEU, MicroMax, Microsoft, Mio, Mitsubishi, MIXC, MLLED, Mobiistar, Mobistel, Modecom, Mofut, Motorola, Mpman, MSI, MyPhone, NEC, Neffos, Netgear, Newgen, Nexian, NextBook, NGM, Nikon, Nintendo, Noain, Noblex, Nokia, Nomi, Nous, Nvidia, O2, Obi, Odys, Onda, OnePlus, OPPO, Opsson, Orange, Ouki, OUYA, Overmax, Oysters, Palm, Panasonic, Pantech, PEAQ, Pentagram, Philips, phoneOne, Pioneer, Ployer, Point of View, Polaroid, PolyPad, Pomp, Positivo, PPTV, Prestigio, ProScan, PULID, Qilive, QMobile, Qtek, Quechua, Ramos, RCA Tablets, Readboy, Rikomagic, RIM, Roku, Rover, Sagem, Samsung, Sanyo, Sega, Selevision, Sencor, Sendo, Senseit, SFR, Sharp, Siemens, Skyworth, Smart, Smartfren, Smartisan, Softbank, Sony, Sony Ericsson, Spice, Star, STK, Stonex, Storex, Sumvision, SunVan, SuperSonic, Supra, Symphony, T-Mobile, TB Touch, TCL, TechniSat, TechnoTrend, TechPad, Teclast, Tecno Mobile, Telefunken, Telenor, Telit, Tesco, Tesla, teXet, ThL, Thomson, TIANYU, TiPhone, Tolino, Toplux, Toshiba, TrekStor, Trevi, Tunisie Telecom, Turbo-X, TVC, Ulefone, UMIDIGI, Uniscope, Unknown, Unnecto, Unonu, Unowhy, UTStarcom, Vastking, Vernee, Vertu, Verykool, Vestel, Videocon, Videoweb, ViewSonic, Vitelcom, Vivo, Vizio, VK Mobile, Vodafone, Vonino, Voto, Voxtel, Walton, Web TV, WellcoM, Wexler, Wiko, Wileyfox, Wolder, Wolfgang, Wonu, Woxter, Xiaomi, Xolo, Yarvik, Ytone, Yuandao, Yusun, Zeemi, Zen, Zonda, Zopo, ZTE, Zuum

### List of detected bots:

360Spider, Aboundexbot, Acoon, AddThis.com, ADMantX, aHrefs Bot, Alexa Crawler, Alexa Site Audit, Amorank Spider, Analytics SEO Crawler, ApacheBench, Applebot, archive.org bot, Ask Jeeves, Backlink-Check.de, BacklinkCrawler, Baidu Spider, BazQux Reader, BingBot, BitlyBot, Blekkobot, BLEXBot Crawler, Bloglovin, Blogtrottr, Bountii Bot, Browsershots, BUbiNG, Butterfly Robot, CareerBot, Castro 2, Catchpoint, ccBot crawler, Charlotte, Cliqzbot, CloudFlare Always Online, CloudFlare AMP Fetcher, Collectd, CommaFeed, CSS Certificate Spider, Cốc Cốc Bot, Datadog Agent, Dataprovider, Daum, Dazoobot, Discobot, Domain Re-Animator Bot, DotBot, DuckDuckGo Bot, Easou Spider, EMail Exractor, EmailWolf, evc-batch, ExaBot, ExactSeek Crawler, Ezooms, Facebook External Hit, Feedbin, FeedBurner, Feedly, Feedspot, Feed Wrangler, Fever, Findxbot, Flipboard, Generic Bot, Generic Bot, Genieo Web filter, Gigablast, Gigabot, Gluten Free Crawler, Gmail Image Proxy, Goo, Googlebot, Google PageSpeed Insights, Google Partner Monitoring, Google Structured Data Testing Tool, Grapeshot, Heritrix, Heureka Feed, HTTPMon, HubPages, HubSpot, ICC-Crawler, ichiro, IIS Site Analysis, Inktomi Slurp, IP-Guide Crawler, IPS Agent, Kouio, Larbin web crawler, Let's Encrypt Validation, Lighthouse, Linkdex Bot, LinkedIn Bot, LTX71, Lycos, Magpie-Crawler, MagpieRSS, Mail.Ru Bot, masscan, Meanpath Bot, MetaInspector, MetaJobBot, Mixrank Bot, MJ12 Bot, Mnogosearch, MojeekBot, Monitor.Us, Munin, Nagios check_http, NalezenCzBot, Netcraft Survey Bot, netEstate, NetLyzer FastProbe, NetResearchServer, Netvibes, NewsBlur, NewsGator, NLCrawler, Nmap, Nutch-based Bot, Octopus, Omgili bot, Openindex Spider, OpenLinkProfiler, OpenWebSpider, Orange Bot, Outbrain, PagePeeker, PaperLiBot, Phantomas, PHP Server Monitor, Picsearch bot, Pingdom Bot, Pinterest, PocketParser, Pompos, PritTorrent, QuerySeekerSpider, Quora Link Preview, Qwantify, Rainmeter, RamblerMail Image Proxy, Reddit Bot, Riddler, Rogerbot, ROI Hunter, SafeDNSBot, Scooter, ScoutJet, Scrapy, Screaming Frog SEO Spider, ScreenerBot, Semrush Bot, Sensika Bot, Sentry Bot, SEOENGBot, SEOkicks-Robot, Seoscanners.net, Server Density, Seznam Bot, Seznam Email Proxy, Seznam Zbozi.cz, ShopAlike, ShopWiki, SilverReader, SimplePie, SISTRIX Crawler, Site24x7 Website Monitoring, SiteSucker, Sixy.ch, Skype URI Preview, Slackbot, Sogou Spider, Soso Spider, Sparkler, Speedy, Spinn3r, Sputnik Bot, sqlmap, SSL Labs, StatusCake, Superfeedr Bot, Survey Bot, Tarmot Gezgin, TelgramBot, TinEye Crawler, Tiny Tiny RSS, TLSProbe, Trendiction Bot, TurnitinBot, TweetedTimes Bot, Tweetmeme Bot, Twitterbot, UkrNet Mail Proxy, UniversalFeedParser, Uptimebot, Uptime Robot, URLAppendBot, Vagabondo, Visual Site Mapper Crawler, VK Share Button, W3C CSS Validator, W3C I18N Checker, W3C Link Checker, W3C Markup Validation Service, W3C MobileOK Checker, W3C Unified Validator, Wappalyzer, WebbCrawler, WebPageTest, WebSitePulse, WebThumbnail, WeSEE:Search, Willow Internet Crawler, WordPress, Wotbox, YaCy, Yahoo! Cache System, Yahoo! Link Preview, Yahoo! Slurp, Yahoo Gemini, Yandex Bot, Yeti/Naverbot, Yottaa Site Monitor, Youdao Bot, Yourls, Yunyun Bot, Zao, zgrab, Zookabot, ZumBot

## Built with

* [Matomo device detector](https://github.com/etienne-martin/matomo-device-detector) - A powerful device detection library.
* [node.js](https://nodejs.org/en/) - Cross-platform JavaScript run-time environment for executing JavaScript code server-side. 
* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript.
* [Jest](https://facebook.github.io/jest/) - Delightful JavaScript Testing.

## Contributing

When contributing to this project, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Update the [README.md](https://github.com/etienne-martin/device-detector-js/blob/master/README.md) with details of changes to the library.

Execute `npm run test` and update the [tests](https://github.com/etienne-martin/device-detector-js/tree/master/src/tests) if needed.

## Authors

* **Etienne Martin** - *Initial work* - [etiennemartin.ca](http://etiennemartin.ca/)
* **Alex Beauchemin** - *Contributor* - [linkedin.com/in/alexbeauchemin](https://www.linkedin.com/in/alexbeauchemin/)

## License

This is a free/libre library under license LGPL v3 or later.
