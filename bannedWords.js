console.debug("bannedWordsFC loading in", window.location.pathname);

restoreOptions();

function restoreOptions() {
    var storeGet =browser.storage.local.get();
    storeGet.then((res) => {
        console.log("sync.get", res.bannedWords);
        cleanPage( res.bannedWords);
    });
}

function cleanPage(bannedWords) {
    const currentPath = window.location.pathname;
    const forumPath = "/foro/forumdisplay.php"
    const homePath = "/foro/trending.php"
    const forumTopicRoute = "section.without-top-corners.without-bottom-corners > div";
    const trendingTopicRoute = trendingTopicRoute;


    let query;
    if (currentPath === trendingTopicRoute) {
        query = trendingTopicRoute;
    } else if (currentPath === forumPath) {
        query = forumTopicRoute;
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

