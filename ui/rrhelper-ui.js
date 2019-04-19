

function tab_init(id) {

    var tabs = $(id).getElementsByTagName("li");  // ul

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].index = i;
        tabs[i].onclick = function (evt) {
            var pnls = $(id).children[1].children;  // div pannel
            var tabs = this.parentNode.children;  // ul

            for (var j = 0; j < tabs.length; j++) {
                tabs[j].className = "";
                pnls[j].className = "";
            }
            this.className = "active";
            pnls[this.index].className = "active";

        };
    }
}


function init() {
    // bind event

    // tab and pannel
    tab_init("tab_mode");
}