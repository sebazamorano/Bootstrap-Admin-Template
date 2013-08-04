function progRess() {
    "use strict";
    /* required bootstrap-progressbar.min.js*/

    $('.progress .bar.text-no').progressbar();
    $('.progress .bar.text-filled').progressbar({
        display_text: 1
    });
    $('.progress .bar.text-centered').progressbar({
        display_text: 2
    });
}
