(function (window,document, $) {window.iFoneFix = {

    loadData : function () {

        var viewModel = {}
        var dateobject = new Date();

        //the current cal-cell that has a popup
        viewModel.currentHover = ko.observable();
        

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

        //increment the current day from the last entry in row1
        currentday++;

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

        //boolean to see if last row is ever populated
        var populated = false;

        for (var i = 0 ; i < 7 ; i++) {
            if (currentday <= viewModel.selectedDaysInMonth()) {
                viewModel.dayArrayrow6.push({ name: currentday, val: currentday });
                currentday++;
                populated = true;
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
        //depending on the month, the last row might not be populate, if so dont add to the month array
        if(populated)
            viewModel.weeksArray.push(viewModel.dayArrayrow6());


        //ajax request made to return appointments in database
        $.get('/home/getappointments', function (data) {
            viewModel.appointments = ko.observable(data)
        });
        

        //ko.computed functions


        //updates the month name whenever the selected month changes
        viewModel.updateMonthName = ko.computed(function () {
            this.selectedMonthName(monthNames[this.selectedMonth()]);
        }, viewModel);
     
      


        
        ko.applyBindings(viewModel);

        $('#days .cal-cell [value = ' + viewModel.selectedDay() + ']').parent().addClass('active');

        $.fn.sequenceEqual = function(compareTo) {
            if (!compareTo || !compareTo.length || this.length !== compareTo.length) {
                return false;
            }
            for (var i = 0, length = this.length; i < length; i++) {
                if (this[i] !== compareTo[i]) 
                    return false;
            }
        
            return true;
        }; 


        //when a cell is clicked, a popup will show with appointment signup
        $('#days').delegate(".cal-cell", "click", function () {
            var val = ko.contextFor(this).$data.val
            var name = ko.contextFor(this).$data.name;

            viewModel.selectedDay(name);


            //not a valid day
            if (val === -1 || val < viewModel.currentDay)
                return;

            //show appt form
            $('#appointmentmodal').modal({ show: true });

        });

        $('#days').delegate(".cal-cell", "hover", function () {
       
            $(viewModel.currentHover()).popover('hide');

            if (ko.contextFor(this).$data.val !== -1) {

                viewModel.currentHover(this);

                $(this).popover({
                    title: "test",
                    placement: "bottom",
                    animation: true
                });

                $(this).popover('show');
            }
       
        });

    

        return viewModel;

    },


    /// <reference path="jquery-1.4.4.js" />
    /// <reference path="jquery.validate.js" />
    /// <reference path="jquery.validate.unobtrusive.js" />
 

   




    
}

}(window, document, jQuery));