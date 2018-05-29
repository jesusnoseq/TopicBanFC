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
    const homePath = "/"
    const homeTopicRoute = ".cajasnews>tbody>tr:nth-child(3)>td.texto>table>tbody>tr";
    const forumTopicRoute = '#threadslist tbody[id^="collapseobj_st_"]>tr, #threadslist tbody[id^="threadbits_forum_"]>tr';

    let query;
    if (currentPath === homePath) {
        query = homeTopicRoute;
    } else if (currentPath === forumPath) {
        query = forumTopicRoute;
    }

    let childs = document.querySelectorAll(query);
    console.debug("childs to check", childs);

    let len = childs.length;
    let eliminados = 0
    for (i = len - 1; i > 0; i--) {
        let c = childs[i];
        let content = c.textContent;
        for (let bw of bannedWords) {
            if (content.toUpperCase().includes(bw.toUpperCase())) {
                console.debug("child", c, " removed because it contains ", bw);
                eliminados++;
                c.remove()
                break;
            }
        }
    }
    console.debug("bannedWordsFC end, removed elements: ", eliminados);
}

