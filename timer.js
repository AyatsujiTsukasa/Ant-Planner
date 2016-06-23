function getCookie(c_name){
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1){
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) {
                c_end=document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start,c_end).replace(/\+/g, " "));
        }
    }
    return "";
}

$("#usernameSide").html(getCookie("username"));

var workTime = 25 * 60;
var breakTime = 5 * 60;
var longBreak = 25 * 60;
var timerId = undefined;
var val;

function timer(){
    var diff = workTime;
    var current = new Date();
    var end = new Date();
    end.setTime(current.getTime() + diff * 1000 + 1000);
    var minute = 0;
    var second = 0;
    var correctedDiff = 0;
    var count = 0;
    var work = true;
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
                } else {
                    diff = breakTime;
                }
                $(".digit").css("background-color", "#428bca");
                $(".countDiv").css("color", "#428bca");
                $(".stop-btn").removeClass("stop-btn-green");
                $(".stop-btn").addClass("stop-btn-blue");
                $("#task").show();
                $('#taskName').html("Break");
                // Enable friends during break
                $(".friends").show();
            } else {
                work = true;
                diff = workTime;
                $(".digit").css("background-color", "#5cb85c");
                $(".countDiv").css("color", "#5cb85c");
                $(".stop-btn").removeClass("stop-btn-blue");
                $(".stop-btn").addClass("stop-btn-green");
                val = $('#task').val();
                $("#task").hide();
                $('#taskName').html(val);
                // Disable friends during work time
                $(".friends").hide();
            }
            end.setTime(current.getTime() + diff * 1000);
        }
        minute = Math.floor(diff / 60);
        second = Math.floor(diff) - (minute * 60);
        $('#minute_tens').html(Math.floor(minute / 10));
        $('#minute_single').html(minute % 10);
        $('#second_tens').html(Math.floor(second / 10));
        $('#second_single').html(second % 10);
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
        timer();
    } else {
        audio.pause();
        clearInterval(timerId);
        timerId = undefined;
        $('#minute_tens').html(2);
        $('#minute_single').html(5);
        $('#second_tens').html(0);
        $('#second_single').html(0);
        $(".ctrl-btn").removeClass("stop-btn stop-btn-green stop-btn-blue");
        $(".ctrl-btn").addClass("start-btn");
        if (!work) {
            $(".digit").css("background-color", "#5cb85c");
            $(".countDiv").css("color", "#5cb85c");
        }
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

function enter(){
    if (timerId === undefined && event.keyCode === 13) {
        ctrl();
    }
}

var audio = $("#audio")[0];  

function music() {
    audio.play();
    setTimeout("audio.pause()", 5000);
}

$(document).ready(toggleMenu);

// 以后要加的功能：Task可以直接从plan中选择；时间到时有notification