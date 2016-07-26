var workTime = 25 * 60;
var breakTime = 5 * 60;
var longBreak = 25 * 60;
var timerId = undefined;
var val;
var notify;
var work = false;

function timer(){
    var diff = workTime;
    var current = new Date();
    var end = new Date();
    end.setTime(current.getTime() + diff * 1000 + 1000);
    var minute = 0;
    var second = 0;
    var correctedDiff = 0;
    var count = 0;
    timerId = setInterval(function(){
        // 每过5秒钟校对一下，以防进入待机状态后，js不再运行，倒计时不正确。
        if (second % 5 === 0) {
            current = new Date();
            correctedDiff = (end.getTime() - current.getTime()) / 1000;
            if (Math.abs(correctedDiff - diff) > 1) {
                diff = correctedDiff;
            }
        }
        if(diff < 0){
            music();
            if (work) {
                work = false;
                count++;
                if (count % 4 === 0) {
                    diff = longBreak;
                    showNotificatioin("Break", "Take a 25-minute break");
                } else {
                    diff = breakTime;
                    showNotificatioin("Break", "Take a 5-minute break");
                }
                $(".half").removeClass("half-green");
                $(".half").addClass("half-blue");
                $(".stop-btn").removeClass("stop-btn-green");
                $(".stop-btn").addClass("stop-btn-blue");
                $("#task").show();
                $('#taskName').html("Break");
                // Enable friends during break
                $(".friends").show();
            } else {
                work = true;
                diff = workTime;
                $(".half").removeClass("half-blue");
                $(".half").addClass("half-green");
                $(".stop-btn").removeClass("stop-btn-blue");
                $(".stop-btn").addClass("stop-btn-green");
                val = $('#task').val();
                $("#task").hide();
                showNotificatioin("Work", val);
                $('#taskName').html(val);
                // Disable friends during work time
                $(".friend-list").prop("hidden", true);
                $(".main").animate({
                    right: "0rem"
                }, 0);
                $(".friends").hide();
            }
            end.setTime(current.getTime() + diff * 1000);
        }
        minute = Math.floor(diff / 60);
        second = Math.floor(diff) - (minute * 60);
        toDigit($('#minute_tens'), Math.floor(minute / 10));
        toDigit($('#minute_single'), minute % 10);
        toDigit($('#second_tens'), Math.floor(second / 10));
        toDigit($('#second_single'),second % 10);
        diff--;
    }, 1000);
}

function ctrl() {
    if ($(".ctrl-btn").hasClass("start-btn")){
        $(".ctrl-btn").removeClass("start-btn");
        $(".ctrl-btn").addClass("stop-btn stop-btn-green");
        val = $('#task').val();
        $("#task").hide();
        $('#taskName').html(val);
        $('#taskName').prop("hidden", false);
        // Disable friends during work time
        $(".friends").hide();
        $(".friend-list").prop("hidden", true);
        $(".main").animate({
            right: "0rem"
        }, 0);
        work = true;
        timer();
    } else {
        audio.pause();
        if (notify !== undefined) {
            notify.close();
        }
        clearInterval(timerId);
        timerId = undefined;
        work = false;
        toDigit($('#minute_tens'), 2);
        toDigit($('#minute_single'), 5);
        toDigit($('#second_tens'), 0);
        toDigit($('#second_single'), 0);
        $(".ctrl-btn").removeClass("stop-btn stop-btn-green stop-btn-blue");
        $(".ctrl-btn").addClass("start-btn");
        $(".half").removeClass("half-blue");
        $(".half").addClass("half-green");
        $("#task").show();
        $('#taskName').prop("hidden", true);
        $(".friends").show();
    }
}

function toggleMenu() {
    $(".menu").click(function() {
        $(".sidebar").animate({
            left: "0rem"
        }, 100);
        $(".main").animate({
            left: "12rem"
        }, 100);
        $(".menu").hide();
    });

    $(".close-menu").click(function() {
        $(".sidebar").animate({
            left: "-12rem"
        }, 100);
        $(".main").animate({
            left: "0rem"
        }, 100);
        $(".menu").show();
    });

    $(".friends").click(function() {
        $(".main").animate({
            right: "16rem"
        }, 0);
        $(".friend-list").prop("hidden", false);
        $(".friends").hide();
    });

    $(".close-friend").click(function() {
        $(".friend-list").prop("hidden", true);
        $(".main").animate({
            right: "0rem"
        }, 0);
        $(".friends").show();
    });
}

function enter(e){
    if (timerId === undefined && e.keyCode === 13) {
        ctrl();
    }
} 

$(document).ready(toggleMenu);

function piece(upDigit, bottomDigit, isUp) {
    var color;
    if (work) {
        color = "half-green";
    } else {
        color = "half-blue";
    }
    return "<div class='piece "+(isUp?'up':'bottom')+"'><div class='half front "+color+"'>"+upDigit+"</div><div class='half back "+color+"'>"+bottomDigit+"</div></div>";
}

function digit(number) {
    return "<div class='digit'>"+piece(number, "", true) + piece("", number, false)+"</div>";
}

function toDigit(digitElement, number) {
    if(digitElement.find('.up .front').html() !== number.toString()){
        var newPiece = $(piece(number, '', true));
        newPiece.css('z-index', -99);
        digitElement.find('>:nth-child(2)').css('z-index', -100);
        digitElement.prepend(newPiece);
        digitElement.find('>:nth-child(2)').find('>:nth-child(2)').html(number);
        digitElement.find('>:nth-child(2)').removeClass('up').addClass('bottom');
        setTimeout(function(){newPiece.css('z-index', 99);}, 50);
        setTimeout(function(){digitElement.find('>:nth-child(3)').remove();newPiece.css('z-index', 0);}, 200);
    }
}

setNotification();

// 以后要加的功能：Task可以直接从plan中选择