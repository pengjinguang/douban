


(function ($) {
    var obj = {
        //入口函数
        init: function (opt) {
            this.options = opt || {};
            this.createDom();
            this.bindEvent();
        },
        createDom: function () {
            var self = this;
            var opt = self.options;
            var wrap = opt.father;
            var len = opt.tabList.length;
            var oSpan = $('<span class="header"></span>');
            var oUl = $('<ul id="tabs"></ul>');
            var con = $('<div id="content"></div>');
            var tabHtml = '';
            for (var i = 0; i < len; i++) {
                tabHtml += '<li><a href="#" tittle="tab' + i + '">' + opt.tabList[i] + '</a></li>';
            }
            wrap.append(oSpan.text(opt.spanStr))
                .append(oUl.html(tabHtml))
                .append(con.html(opt.conStr));
            for (var i = 0; i < len; i++) {
                $($('.conBox')[i]).attr('id', 'tab' + i);
            }
            $('#content').find('.conBox:first').addClass('current');
            $('#tabs').find('a').eq(0).addClass('active1');
        },
        bindEvent: function () {
            var self = this;
            $('#tabs').on('click', 'a', function (e) {
                e.preventDefault();
                var tittle = $(this).attr('tittle');
                $('.active1').removeClass('active1');
                $(this).attr('class', 'active1');
                $('.current').removeClass('current');
                $('#' + tittle).addClass('current');
            })
        }
    };

    //实现插件
    $.fn.extend({
        tab: function (option) {
            option.father = this || $('body');
            obj.init(option);
        }
    })
})(jQuery)