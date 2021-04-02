
var TAB_INDEX_CALC_DIS = 0;
var TAB_INDEX_SDIS = 1;
var TAB_INDEX_DDIS = 2;
function tab_init(id) {

    var tabs = $("#"+id).getElementsByTagName("li");  // ul

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].index = i;
        tabs[i].onclick = function (evt) {
            var pnls = $("#"+id).children[1].children;  // div pannel
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

function sel_z_Changed(sender, flag) {

    var extra_tables = sender.parentNode.parentNode.parentNode.parentNode.parentNode.children;
    for (var i = 1; i < extra_tables.length; i++) {
        extra_tables[i].className = "extra-tb";
    }
    if (sender.value != "std") {
        extra_tables[1].className = "extra-tb active";
        $("#txt_rxratio_" + flag).disabled = true;
    }
    if (sender.value == "ratio") {
        $("#txt_rxratio_" + flag).disabled = false;
    }
}

function sel_sc_phs_Changed(sender){
    var chked = parseInt(sender.value);
    if (chked > 3 || chked == 0){
        $("#txt_kz1").disabled="disabled";
    }
    else if(chked <3){
        $("#txt_kz1").disabled="";
    }
}


function btn_dis_single_onClick(sender) {
    // 检查阻抗输入模式
    var z_mode = $("#z_mode_s");

    // 计算阻抗、补偿系数
    var z1, z2, z3, t2, t3, kz, i12, i3;
    z1 = RRHelper.getFloat("txt_z1_s");
    z2 = RRHelper.getFloat("txt_z2_s");
    z3 = RRHelper.getFloat("txt_z3_s");
    t2 = RRHelper.getFloat("txt_t2_s") * 1000;
    t3 = RRHelper.getFloat("txt_t3_s") * 1000;
    kz = RRHelper.getFloat("txt_kz");
    i12 = RRHelper.getFloat("txt_i12_s");
    i3 = RRHelper.getFloat("txt_i3_s");

    var u1, u2, u3;
    u1 = (1 + kz) * i12 * z1;
    u2 = (1 + kz) * i12 * z2;
    u3 = (1 + kz) * i3 * z3;


    var disSingleRst = new Object();
    disSingleRst.type = "single_distance";
    disSingleRst.u1l = (0.95 * u1).toFixed(2);
    disSingleRst.u1h = (1.05 * u1).toFixed(2);
    disSingleRst.u2l = (0.95 * u2).toFixed(2);
    disSingleRst.u2h = (1.05 * u2).toFixed(2);
    disSingleRst.u3l = (0.95 * u3).toFixed(2);
    disSingleRst.u3h = (1.05 * u3).toFixed(2);
    disSingleRst.dt1a = RRHelper.random(10, 27) + "ms 动作";
    disSingleRst.dt2a = t2 + RRHelper.random(10, 27)+ "ms 动作";
    disSingleRst.dt3a = t3 + RRHelper.random(10, 27) + "ms 动作";

    disSingleRst.dt1b = RRHelper.random(10, 27) + "ms 动作";
    disSingleRst.dt2b = t2 + RRHelper.random(10, 27) + "ms 动作";
    disSingleRst.dt3b = t3 + RRHelper.random(10, 27) + "ms 动作";

    disSingleRst.dt1c = RRHelper.random(10, 27) + "ms 动作";
    disSingleRst.dt2c = t2 + RRHelper.random(10, 27) + "ms 动作";
    disSingleRst.dt3c = t3 + RRHelper.random(10, 27) + "ms 动作";
    updateUI(disSingleRst);

}

function btn_dis_double_onClick(sender) {
    // 检查阻抗输入模式
    var z_mode = $("#z_mode_d");

    // 计算阻抗、补偿系数
    var z1, z2, z3, t2, t3, i12, i3;
    z1 = RRHelper.getFloat("txt_z1_d");
    z2 = RRHelper.getFloat("txt_z2_d");
    z3 = RRHelper.getFloat("txt_z3_d");
    t2 = RRHelper.getFloat("txt_t2_d") * 1000;
    t3 = RRHelper.getFloat("txt_t3_d") * 1000;
    i12 = RRHelper.getFloat("txt_i12_d");
    i3 = RRHelper.getFloat("txt_i3_d");

    var u1, u2, u3;
    u1 = 2 * i12 * z1;
    u2 = 2 * i12 * z2;
    u3 = 2 * i3 * z3;


    var disDoubleRst = new Object();
    disDoubleRst.type = "double_distance";
    disDoubleRst.u1l = (0.95 * u1).toFixed(2);
    disDoubleRst.u1h = (1.05 * u1).toFixed(2);
    disDoubleRst.u2l = (0.95 * u2).toFixed(2);
    disDoubleRst.u2h = (1.05 * u2).toFixed(2);
    disDoubleRst.u3l = (0.95 * u3).toFixed(2);
    disDoubleRst.u3h = (1.05 * u3).toFixed(2);
    disDoubleRst.dt1a = RRHelper.random(10, 27) + "ms 动作";
    disDoubleRst.dt2a = t2 + RRHelper.random(10, 27) + "ms 动作";
    disDoubleRst.dt3a = t3 + RRHelper.random(10, 27) + "ms 动作";

    disDoubleRst.dt1b = RRHelper.random(10, 27) + "ms 动作";
    disDoubleRst.dt2b = t2 + RRHelper.random(10, 27) + "ms 动作";
    disDoubleRst.dt3b = t3 + RRHelper.random(10, 27) + "ms 动作";

    disDoubleRst.dt1c = RRHelper.random(10, 27) + "ms 动作";
    disDoubleRst.dt2c = t2 + RRHelper.random(10, 27) + "ms 动作";
    disDoubleRst.dt3c = t3 + RRHelper.random(10, 27) + "ms 动作";
    updateUI(disDoubleRst); 
}

function updateUI(model) {
    if (model.type == "single_distance") {
        var html = "<hr /><table><tbody>";
        html += "<tr><th width='13%'>0.95Z1</th><th width='13%'>1.05Z1</th><th width='13%'>0.95Z2</th><th width='13%'>1.05Z2</th>" +
            "<th width='13%'>0.95Z3</th><th width='13%'>1.05Z3</th></tr>"
        html += "<tr><td width='13%'>" + model.u1l + "V</td><td width='13%'>" + model.u1h + "V</td>" +
            "<td width='13%'>" + model.u2l + "V</td><td width='13%'>" + model.u2h + "V</td>" +
            "<td width='13%'>" + model.u3l + "V</td><td width='13%'>" + model.u3h + "V</td></tr>";
        html += "<tr><td width='13%'>" + model.dt1a + "</td><td width='13%'>不动作</td>" +
            "<td width='13%'>" + model.dt2a + "</td><td width='13%'>不动作</td>" +
            "<td width='13%'>" + model.dt3a + "</td><td width='13%'>不动作</td></tr>";
        html += "<tr><td width='13%'>" + model.dt1b + "</td><td width='13%'>不动作</td>" +
            "<td width='13%'>" + model.dt2b + "</td><td width='13%'>不动作</td>" +
            "<td width='13%'>" + model.dt3b + "</td><td width='13%'>不动作</td></tr>";
        html += "<tr><td width='13%'>" + model.dt1c + "</td><td width='13%'>不动作</td>" +
            "<td width='13%'>" + model.dt2c + "</td><td width='13%'>不动作</td>" +
            "<td width='13%'>" + model.dt3c + "</td><td width='13%'>不动作</td></tr>"
        html += "</tbody></table>";
        $(".page footer")[TAB_INDEX_SDIS].innerHTML = html;
    }
    else if (model.type=="double_distance") {
        var html = "<hr /><table><tbody>";
        html += "<tr><th width='13%'>0.95Z1</th><th width='13%'>1.05Z1</th><th width='13%'>0.95Z2</th><th width='13%'>1.05Z2</th>" +
            "<th width='13%'>0.95Z3</th><th width='13%'>1.05Z3</th></tr>"
        html += "<tr><td width='13%'>" + model.u1l + "V</td><td width='13%'>" + model.u1h + "V</td>" +
            "<td width='13%'>" + model.u2l + "V</td><td width='13%'>" + model.u2h + "V</td>" +
            "<td width='13%'>" + model.u3l + "V</td><td width='13%'>" + model.u3h + "V</td></tr>";
        html += "<tr><td width='13%'>" + model.dt1a + "</td><td width='13%'>不动作</td>" +
            "<td width='13%'>" + model.dt2a + "</td><td width='13%'>不动作</td>" +
            "<td width='13%'>" + model.dt3a + "</td><td width='13%'>不动作</td></tr>";
        html += "<tr><td width='13%'>" + model.dt1b + "</td><td width='13%'>不动作</td>" +
            "<td width='13%'>" + model.dt2b + "</td><td width='13%'>不动作</td>" +
            "<td width='13%'>" + model.dt3b + "</td><td width='13%'>不动作</td></tr>";
        html += "<tr><td width='13%'>" + model.dt1c + "</td><td width='13%'>不动作</td>" +
            "<td width='13%'>" + model.dt2c + "</td><td width='13%'>不动作</td>" +
            "<td width='13%'>" + model.dt3c + "</td><td width='13%'>不动作</td></tr>"
        html += "</tbody></table>";
        $(".page footer")[TAB_INDEX_DDIS].innerHTML = html;
    }
}

// modeVal
function checkZMode(modeVal) {
    if (modeVal == "std") {
        return;
    }
    else if (modeVal == "r+x") {
        // calc z
        thorw("R+X模式尚未实现");
    }
    else if (modeVal == "ratio") {
        thorw("阻抗比模式尚未实现");
    }
    else {
        alert("未知的阻抗模式参数");
    }

}