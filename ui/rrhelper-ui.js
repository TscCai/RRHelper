

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

function sel_z_onChange(sender, flag) {

    var extra_tables = sender.parentNode.parentNode.parentNode.parentNode.parentNode.children;
    for (var i = 1; i < extra_tables.length; i++) {
        extra_tables[i].className = "extra-tb";
    }
    if (sender.value > 0) {
        extra_tables[1].className = "extra-tb active";
        $("txt_rxratio_" + flag).disabled = true;
    }
    if (sender.value > 1) {
        $("txt_rxratio_" + flag).disabled = false;
    }
}

function btn_dis_single_onClick(sender){
    // 检查阻抗输入模式
    var z_mode = document.getElementById("z_mode_s")
    // 计算阻抗、补偿系数
}

// flag: s --> single
//       d --> double
function checkZMode(flag){

}