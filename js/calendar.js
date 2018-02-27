(function($) {
    var setting = {
        inputId: '#datecalendar',
        containerId: 'container',
        prevMonth: '#prevMonth',
        prevYear: '#prevYear',
        nextMonth: '#nextMonth',
        nextYear: '#nextYear',
        clickFunction: function() {},

    }
    var calender = $.calender = {}; //隐藏内部函数
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var weekday = date.getDay();
    var dateYS = {
        month: month + 1,
        year: year,
    }
    $.fn.extend({
        calendar: function(opt) {
            console.log(opt)
            opt = opt || {};
            setting = $.extend(opt, setting);
            render(setting.containerId);                    //渲染日历html结构
            $(setting.inputId).on('click', calenderHidden); //点击输入框显示隐藏
            $(setting.prevYear).on('click', prevYear);      //上一年
            $(setting.prevMonth).on('click', prevMonth);    //上一月
            $(setting.nextMonth).on('click', nextMonth);    //下一月
            $(setting.nextYear).on('click', nextYear);      //下一年
            renderDate(dateYS);                             //点击后重新渲染数据
            setToday();                                     //当天标红显示
        }
    });
    var render = function(id) {
        var htmls = `
        <div id="calendar">
        <div class="header">
            <a href="javascript:;" id="prevYear"><<</a>
            <a href="javascript:;" id="prevMonth"><</a>
            <a href="javascript:;" id="nextYear">>></a>
            <a href="javascript:;" id="nextMonth">></a>
             <div id="calendar-hd">
                <span ><span id="calendar-month">2</span>月</span>
                <span id="calendar-year">2017</span>
             </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Su</th>
                    <th>Mo</th>
                    <th>Tu</th>
                    <th>We</th>
                    <th>Th</th>
                    <th>Fr</th>
                    <th>Sa</th>
                </tr>
            </thead>
            <tbody id="tbody">
            </tbody>
        </table>
    </div>`;
        $('#' + id).append(htmls);
    };
    var nextYear = function() {
        dateYS.year += 1;
        renderDate(dateYS);
    };
    var nextMonth = function() {
        if (dateYS.month <= 11) {
            dateYS.month += 1;
            renderDate(dateYS);
        } else {
            dateYS.year += 1;
            dateYS.month = 1;
            renderDate(dateYS);
        }
    };
    var prevYear = function() {
        dateYS.year -= 1;
        renderDate(dateYS);
    };
    var prevMonth = function() {
        if (dateYS.month > 1) {
            dateYS.month -= 1;
            renderDate(dateYS);
        } else {
            dateYS.year -= 1;
            dateYS.month = 12;
            renderDate(dateYS);
        }
    };
    var setToday = function() {
        var now = new Date();
        var month = parseInt($('#calendar-month').text()) - 1;
        var year = parseInt($('#calendar-year').text());
        var today = now.getDate();
        if (year === now.getFullYear()) {
            if (month === now.getMonth()) {
                $('#' + now.getDate()).css({
                    background: 'red',
                });
            }
        }
    }
    var calenderHidden = function() {
        $('#' + setting.containerId).toggle();
    };
    var returnTody = function() {
        var ids = $(this).attr('id');
        var month = parseInt($('#calendar-month').text());
        if (ids === 'notthemonth1') {
            month = month -1;
        }else if (ids === 'notthemonth2') {
            month = month +1;
        }
        var year = parseInt($('#calendar-year').text());
        var today = parseInt($(this).text());
        var date = month + '-' + today + '-' + year;
        $(setting.inputId).val(date);
    }
    var renderDate = function(dates) {
        $('#calendar-month').text(dates.month);
        $('#calendar-year').text(dates.year);
        var lastmonth;
        var days = returnMonthDays(dates.month, dates.year);
        if (dates.month > 1) {
            lastmonth = returnMonthDays(dates.month - 1, dates.year);
        } else {
            lastmonth = returnMonthDays(11, dates.year - 1);
        }
        var weekday = returnWeekday(dates.month, dates.year);
        setDays(weekday, days, lastmonth);
    }
    var returnMonthDays = function(month, year) {
        if (month == 12) {
            month = 1;
            year = year + 1;
        } else {
            month = month + 1;
        }
        var curDay = new Date(Date.parse('' + month + ' 1,' + year + ''));
        curDay.setDate(0);
        var days = curDay.getDate();
        return days
    }
    var returnWeekday = function(month, year) {
        var date = new Date('' + month + ' 1,' + year + '');
        var weekday = date.getDay();
        return weekday;
    }
    var setDays = function(weekday, days, lastmonth) {
        var htmls = '';
        var n = 0;
        var m = 1;
        var k = 0;
        var p = 0;
        var q = lastmonth - weekday;
        if ((weekday + days) > 35) {
            k = 6;
        } else {
            k = 5;
        }
        for (var i = 0; i < k; i++) {
            htmls += '<tr>';
            for (var j = 0; j < 7; j++) {
                if (n <= (days + weekday - 1)) {
                    if (n >= weekday) {
                        htmls += '<td id="' + m + '">' + m + '</td>';
                        m++;
                    } else {
                        q++;
                        htmls += '<td id="notthemonth1">' + q + '</td>';
                    }
                } else {
                    p++;
                    htmls += '<td id="notthemonth2">' + p + '</td>';
                }
                n++;
            }
            htmls += '</tr>';
        }
        $('#calendar table tbody').html(htmls)
        $('#calendar table tbody').find('td').on('click', returnTody);
    }
})(window.jQuery)
