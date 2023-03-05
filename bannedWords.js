console.debug("bannedWordsFC loading in", window.location.pathname);

restoreOptions();

function restoreOptions() {
    var storeGet = browser.storage.local.get();
    storeGet.then((res) => {
        console.log("sync.get", res.bannedWords);
        cleanPage(res.bannedWords);
    });
}

function cleanPage(bannedWords) {
    const currentPath = window.location.pathname;
    const forumPath = "/foro/forumdisplay.php"
    const trendingPath = "/foro/trending.php"
    const forumTopicCSSRoute = "section.without-top-corners.without-bottom-corners > div";
    const trendingTopicCSSRoute = forumTopicCSSRoute;


    let query;
    if (currentPath === trendingPath) {
        query = trendingTopicCSSRoute;
    } else if (currentPath === forumPath) {
        query = forumTopicCSSRoute;
    }

    let childs = document.querySelectorAll(query);
    console.debug("childs to check", childs);

    let len = childs.length;
    let removed = 0
    for (i = len - 1; i > 0; i--) {
        let c = childs[i];
        let content = c.textContent;
        for (let bw of bannedWords) {
            if (content.toUpperCase().includes(bw.toUpperCase())) {
                console.debug("child", c, " removed because it contains ", bw);
                removed++;
                c.remove()
                break;
            }
        }
    }
    console.debug("bannedWordsFC end, removed elements: ", removed);
}
