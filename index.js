// 1. Create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// 2. Create multiple employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// 3. Create a TimeIn event
function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return this;
}

// 4. Create a TimeOut event
function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return this;
}

// 5. Compute hours worked on a specific date
function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(e => e.date === date);
    const timeOut = this.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// 6. Compute wages earned on a specific date
function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// 7. Provided: Calculate all wages for one employee
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0);

    return payable;
};

// 8. Find an employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

// 9. Calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
        return total + allWagesFor.call(record);
    }, 0);
}

// 10. Export all functions so the test suite can access them
module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
};
