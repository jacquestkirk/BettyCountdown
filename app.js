(function () {
'use strict';

angular.module('BettyCountdownApp', [])
.controller('BettyCountdownController', BettyCountdownController)
.service('TimeRemainingService', TimeRemainingService);


var TimeRemainingFormat = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

BettyCountdownController.$inject=['TimeRemainingService'];
function BettyCountdownController(TimeRemainingService)
{
  var bettyContdownController = this;
  this.currentTime = 0;
  this.returnTime = 0;
  this.timeRemaining= Object.create(TimeRemainingFormat);

  this.updateCurrentTime = function()
  {
    console.log(TimeRemainingService)
    TimeRemainingService.updateCurrentTime();
    this.currentTime = TimeRemainingService.currentTime;
    this.returnTime = TimeRemainingService.returnTime;
    this.timeRemaining = TimeRemainingService.timeRemaining;

  }

}

function TimeRemainingService()
{

  var timeRemaingService = this;

  this.currentTime = 0;
  this.returnTime = 0;
  this.timeRemaining = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  this.updateCurrentTime = function()
  {
    //find current time
    var currentDateTime = new Date();
    var currentDate_Str = currentDateTime.toDateString();
    var currentTime_Str = currentDateTime.toTimeString();

    this.currentTime = currentDate_Str + " " + currentTime_Str;

    //find time of Betty's return
    var returnDateTime = new Date(2017,6,23,17,25,0,0);
    var returnDate_Str = returnDateTime.toDateString();
    var returnTime_Str = returnDateTime.toTimeString();

    this.returnTime = returnDate_Str + " " + returnTime_Str;

    //Calculate time remaining

    var ms_per_s = 1000;
    var s_per_min = 60;
    var min_per_hour = 60;
    var hrs_per_day = 24;

    var remainingTime_ms = returnDateTime - currentDateTime;

    console.log(new moment.duration(remainingTime_ms).asDays())
    var daysRemaining = Math.floor(remainingTime_ms / (ms_per_s * s_per_min * min_per_hour * hrs_per_day));
    var daysRemaining_ms = daysRemaining * (ms_per_s * s_per_min * min_per_hour * hrs_per_day)

    console.log(remainingTime_ms)
    remainingTime_ms = remainingTime_ms - daysRemaining_ms
    var hoursRemaining = Math.floor(remainingTime_ms / (ms_per_s * s_per_min * min_per_hour));
    var hoursRemaining_ms = hoursRemaining * (ms_per_s * s_per_min * min_per_hour);

    remainingTime_ms = remainingTime_ms - hoursRemaining_ms
    var minRemaining = Math.floor(remainingTime_ms / (ms_per_s * s_per_min));
    var minRemaining_ms = minRemaining * (ms_per_s * s_per_min);

    console.log(remainingTime_ms)
    console.log(minRemaining_ms)
    remainingTime_ms = remainingTime_ms - minRemaining_ms
    console.log(remainingTime_ms)
    var secRemaining = Math.floor(remainingTime_ms / (ms_per_s));

    this.timeRemaining.days = daysRemaining
    this.timeRemaining.hours = hoursRemaining
    this.timeRemaining.minutes = minRemaining
    this.timeRemaining.seconds = secRemaining
  };
}

})();
