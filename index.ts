import { io } from "socket.io-client";

class MyLife {
  _experience_years;
  _employment_status;
  _job_title;
  _lifeUpdates;

  constructor(init_values) {
    this._experience_years = init_values?.experience_years || 0;
    this._employment_status = init_values?.employment_status || "UNEMPLOYED";
    this._job_title = init_values?.job_title || null;

    this._initSocket();
  }

  _initSocket() {
    this._lifeUpdates = io("ws://my-life.com");

    this._lifeUpdates.
        data.employment_status || this._employment_status;
      this._job_title as
    });
  }


}