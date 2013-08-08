(function (window,document, $) {window.iFoneFix = {

    loadData : function () {

        var viewModel = {}
        var dateobject = new Date();
        

        viewModel.currentDay = dateobject.getDate();
        viewModel.currentMonth = dateobject.getMonth();
        viewModel.currentYear = dateobject.getFullYear();
        viewModel.currentDaysInMonth = Date.getDaysInMonth(viewModel.currentYear, viewModel.currentMonth);

        ////grabs the first day of the months date to find the day of the week
        ///sunday is 0, saturday is 6
        var currentmonthdate = new Date(viewModel.currentYear, viewModel.currentMonth, 1);
        viewModel.currentFirstDay = currentmonthdate.getDay();

        var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

        //initialized to the current day
        viewModel.selectedDay = ko.observable(viewModel.currentDay);
        viewModel.selectedMonth = ko.observable(viewModel.currentMonth);
        viewModel.selectedMonthName = ko.observable(monthNames[viewModel.selectedMonth()]);
        viewModel.selectedYear = ko.observable(viewModel.currentYear);
        viewModel.selectedDaysInMonth = ko.observable(Date.getDaysInMonth(viewModel.selectedYear(), viewModel.selectedMonth()));
        viewModel.selectedDate = ko.observable(viewModel.selectedMonth() + "/" + viewModel.selectedDay() + "/" + viewModel.selectedYear());
        //grabs the first day of the months date to find the day of the week
        ///sunday is 0, saturday is 6
        var selectedmonthdate = new Date(viewModel.selectedYear(), viewModel.selectedMonth(), 1);
        viewModel.selectedFirstDay = ko.observable(selectedmonthdate.getDay());

        viewModel.weeksArray = ko.observableArray();

        viewModel.dayArrayrow1 = ko.observableArray();
        viewModel.dayArrayrow2 = ko.observableArray();
        viewModel.dayArrayrow3 = ko.observableArray();
        viewModel.dayArrayrow4 = ko.observableArray();
        viewModel.dayArrayrow5 = ko.observableArray();
        viewModel.dayArrayrow6 = ko.observableArray();


        //populating the array for the first row specifying first day and date 
        var found = 0;
        var currentday = 0;
        for (var i = 0; i < 7; i++)
        {
            if(i === (viewModel.selectedFirstDay()+found))
            {
                currentday = found + 1;
                viewModel.dayArrayrow1.push({ name: currentday, val: currentday });
                found++;
            }
            else
            {
                viewModel.dayArrayrow1.push({ name: "", val: -1 });
            }
        }

        //populating the rest of the week rows
        for (var i = 0 ; i < 7 ; i++)
        {
            if (currentday <= viewModel.selectedDaysInMonth()) {
                viewModel.dayArrayrow2.push({ name: currentday, val: currentday });
                currentday++;
            }
            else
                viewModel.dayArrayrow2.push({ name: "", val: -1 });
        }
        for (var i = 0 ; i < 7 ; i++) {
            if (currentday <= viewModel.selectedDaysInMonth()) {
                viewModel.dayArrayrow3.push({ name: currentday, val: currentday });
                currentday++;
            }
            else
                viewModel.dayArrayrow3.push({ name: "", val: -1 });
        }
        for (var i = 0 ; i < 7 ; i++) {
            if (currentday <= viewModel.selectedDaysInMonth()) {
                viewModel.dayArrayrow4.push({ name: currentday, val: currentday });
                currentday++;
            }
            else
                viewModel.dayArrayrow4.push({ name: "", val: -1 });
        }
        for (var i = 0 ; i < 7 ; i++) {
            if (currentday <= viewModel.selectedDaysInMonth()) {
                viewModel.dayArrayrow5.push({ name: currentday, val: currentday });
                currentday++;
            }
            else
                viewModel.dayArrayrow5.push({ name: "", val: -1 });
        }
        for (var i = 0 ; i < 7 ; i++) {
            if (currentday <= viewModel.selectedDaysInMonth()) {
                viewModel.dayArrayrow6.push({ name: currentday, val: currentday });
                currentday++;
            }
            else
                viewModel.dayArrayrow6.push({ name: "", val: -1 });
        }
      


        //pushing the day arrays onto the weeks array
        viewModel.weeksArray.push(viewModel.dayArrayrow1());
        viewModel.weeksArray.push(viewModel.dayArrayrow2());
        viewModel.weeksArray.push(viewModel.dayArrayrow3());
        viewModel.weeksArray.push(viewModel.dayArrayrow4());
        viewModel.weeksArray.push(viewModel.dayArrayrow5());
        viewModel.weeksArray.push(viewModel.dayArrayrow6());





        /*
        MIGHT USE

        viewModel.MonthHtml= ko.observable('﻿<div class="row"><div class="span9"><div id="calendar"><div class="cal-row-fluid cal-row-head"><div class="cal-span1">Sunday</div><div class="cal-span1">Monday</div><div class="cal-span1">Tuesday</div><div class="cal-span1">Wednesday</div><div class="cal-span1">Thursday</div><div class="cal-span1">Friday</div><div class="cal-span1">Saturday</div></div></div></div><div class="span3" id="appointmentsection"><h4>Appoinments</h4></div></div></div>');
        viewModel.YearHtml = ko.observable('<div><h2>YEAR</h2></div>');
        
        
        viewModel.CalendarHtml = ko.observable(viewModel.MonthHtml());

        //use <div data-bind="html: CalendarHtml"></div>
        */
        ko.applyBindings(viewModel);

        return viewModel;

    }





    
}

}(window, document, jQuery));