---
title: Applying for 1000 jobs per hour
description: Use Userscript to automate job applications
author: "Ricardo de Arruda"
date: 2020-06-11
draft: false 
tags: [Jobs, JavaScript, userscript]
---

Since over 90% of large companies use Applicant Tracking Systems [1],
your resume or application is scanned through a bot and pre-selected by some algorithm, for that we can do the same as the applicant, make a bot.

We could scrap some job posting using a powerful framework as [ scrapy ]( https://scrapy.org/ ) or use [beautifulsoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) +  [request](https://requests.readthedocs.io/en/master/).
However if the website is a [SPA](https://en.wikipedia.org/wiki/Single-page_application) or heavily use JavaScript we need to render the page before scrapping in this case we could use [selenium](https://selenium-python.readthedocs.io/) or the JavaScript counterpart [puppeteer](https://pptr.dev/), but since you probably just want a quick-and-dirty bot to apply for as many jobs that fit your requirement I recommend use the chrome plugin [tampermonkey](https://tampermonkey.net/) or [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) for firefox as a [UserScript](https://en.wikipedia.org/wiki/Userscript) manager.

As exemple we are going to apply for jobs at [cwjobs](https://www.cwjobs.co.uk) for all the jobs matching the search query.

In order to do that we need to install one of the UserScript managers mentioned on our browser.

Two Scripts are necessary, one to go to every page of the search query and open the link, and another one for applying to the job.

Every UserScript has a header that defines metadata as @name, for the name of the script and @version, the important for our case is the @match and @exclude tags.
@match defined the pages on which a script should run. And @exclude exclude URLs even if they are included by or @match.

Since our first script will run at the jobs list for the search query cwjobs.co.uk/jobs/?=keyword, so the plugin can automatically start running if the url is matched.

```userscript
// ==UserScript==
// @name         CWJobs Search 
// @match        https://www.cwjobs.co.uk/jobs/*
// ==UserScript==
```

The script is a plain javascript file, with access to the page [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) API.

Since we can't open a new tab using the browser API we need to use TamperMonkey function to open a new tab:
```userscript
// ==UserScript==
// @grant        GM_openInTab
// ==UserScript==

```

```javascript
(function() {
    window.addEventListener('load', function() {
        start()
    }, false);

    function start () {
        // get an array of all applications in the page.
        const applications = Array.from(document.getElementsByClassName("job"))

        // a timer to open the link
        let timer = 0

        // iterate through all the jobs elements 
        for (let i in applications ) {

            // get link tag for the job post
            let aTag = applications[i].jobTitle?.firstElementChild

            // if already applied
            if (applications[i].classList.contains('applied')) { 
                continue
            }
            // open a new tab in time * 5s
            setTimeout(() => {
                if (aTag !== undefined && aTag.href !== undefined) {
                    // open a new tab but don't switch to it.
                    GM_openInTab(aTag.href, true)
                    }
                }, timer * 5000)
            timer += 1
            }

        // go to next jobs list page when finish  to open all links
        setTimeout(()=> {goNextPage()}, (timer * 5000 + 5000))
        function goNextPage(){
            const nextPageAtag = document.getElementsByClassName('btn btn-default next')[0]
            if (nextPageAtag.classList.contains('disabled')){ // end of list of jobs
                window.close()
            } else {
                nextPageAtag.click()
            }
        }
    }

})();
```

Right now, we are opening all the jobs links on the page in a new tab, and now need to apply for each one of them, and for that we need a new script, that will only include the **job**:
```userscript
// ==UserScript==
// @name         Apply for JOB
// @description  try to take over the world!
// @match        https://www.cwjobs.co.uk/job/*/*
// @grant window.close
// ==/UserScript==
```
We included the function windows.close in order to close the tab after applying for the job.

Since we can apply using the **one click** the script should be simple:
```javascript
(function() {
    window.addEventListener('load', function() {
        start()
    }, false);
    function start () {
      // iterate through all a tags until we find the right button
        for (let el of document.getElementsByTagName('a') ) {
             if (el.innerText === 'SEND APPLICATION') {
                 el.click()
                 break
             }
        }
         setTimeout(() => { window.close() }, 1000)
    }

})();
```

Final result:
![gif](https://media.giphy.com/media/KBOvyqVMQMBKkOtw7n/giphy.gif)


[1]: https://www.wsj.com/articles/SB10001424052970204624204577178941034941330


