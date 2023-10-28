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
    console.debug("current path ", currentPath);
    const homePath = "/";
    const forumPath = "/foro/forumdisplay.php";
    const trendingPath = "/foro/trending.php";

    const forumTopicCSSRoute = "section.without-top-corners.without-bottom-corners > div";
    const oldForumTopicSSRoute = '#threadslist tbody[id^="collapseobj_st_"]>tr, #threadslist tbody[id^="threadbits_forum_"]>tr';
    const homeCSSRoute = ".cajasnews>tbody>tr:nth-child(3)>td.texto>table>tbody>tr";
    const trendingTopicCSSRoute = forumTopicCSSRoute;


    isOldStyle = document.getElementById("inlinemodform") != null

    const pageQuery = {
        [forumPath]: isOldStyle ? oldForumTopicSSRoute : forumTopicCSSRoute,
        [trendingPath]: trendingTopicCSSRoute,
        [homePath]: homeCSSRoute
    }


    let query = pageQuery[currentPath];
    if (query == null) {
        console.debug("no query found for current page", pageQuery);
        return;
    }

    let childs = document.querySelectorAll(query);
    console.debug("childs to check", childs, "with query", query);

    let len = childs.length;
    let removed = 0
    for (i = len - 1; i > 0; i--) {
        let c = childs[i];
        let content = c.textContent;
        for (let bw of bannedWords) {
            if (content.toUpperCase().includes(bw.toUpperCase())) {
                console.debug("child", c, "removed because it contains", bw);
                removed++;
                c.remove();
                break;
            }
        }
    }
    console.debug("bannedWordsFC execution ended. It removed", removed, "elements");
}
