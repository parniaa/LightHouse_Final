import React from "react";
import {useHistory} from "react-router-dom";
import {AvailabilityCalendar} from "react-availability-calendar";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";

const msInHour = 60 * 60 * 1000;

const Calendar = (props) => {
  const now = new Date();

  const history = useHistory();
  const onAvailabilitySelected = (a) => {
    const data = {
      title: props.services.title,
      rating: 3,
      isconfirmed: false,
      st_date: a.startDate,
      end_date: a.endDate,
      services_id: props.services.id,
      availabilities_id: props.timeframe.id,
      users_id: props.user.id,
    };

    props.setBooking(data);
    history.push("/confirm");
  };

  const onChangedCalRange = (r) =>
    console.log("Calendar range selected (fetch bookings here): ", r);

  const avail = [props.timeframe.start_time, props.timeframe.end_time]; //this is the receiving input

  const blockOutPeriods = [
    [0 * msInHour, avail[0] * msInHour],
    [(avail[1] + 1) * msInHour, 24 * msInHour],
  ];

  const bookings = [
    {
      startDate: new Date(2020, 2, 1, 19),
      endDate: new Date(2020, 2, 1, 20),
    },
    {
      startDate: new Date(2020, 2, 1, 16, 30),
      endDate: new Date(2020, 2, 1, 17),
    },
  ];

  const providerTimeZone = "America/New_York";

  return (
    <>
      <div className="calendarBox">
        <div id="innerCalDiv">
          <div className="actualCalendar" style={{width: 350}}>
            <AvailabilityCalendar
              bookings={bookings}
              providerTimeZone={providerTimeZone}
              moment={moment}
              initialDate={now}
              onAvailabilitySelected={onAvailabilitySelected}
              onCalRangeChange={onChangedCalRange}
              blockOutPeriods={blockOutPeriods}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
