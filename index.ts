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

    this._lifeUpdates.on("update", (data) => {
      this._experience_years = data.experience_years || this._experience_years;
      this._employment_status =
        data.employment_status || this._employment_status;
      this._job_title = data.job_title || this._job_title;

      console.log(this.getLifeState());
    });
  }

  getLifeState() {
    return {
      experience_years: this._experience_years,
      employment_status: this._employment_status,
      job_title: this._job_title,
    };
  }
}

/**
  Event 1:
 
  {
    experience_years: 0,
    employment_status: "EMPLOYED",
    job_title: "QA Engineer",
  }

*/

/**
  Event 2:
 
  {
    experience_years: 0.7,
    employment_status: "EMPLOYED",
    job_title: "JavaScript Front-end Engineer",
  }

*/
asd
/**
  Event 3:
 
  {
    experience_years: 1.3,
    employment_status: "EMPLOYED",
    job_title: "Full-stack Engineer",
  }

*/

/**
  Event 3:
 
  {
    experience_years: 1.8,
    employment_status: "UNEMPLOYED",
    job_title: "Searching for Job",
  }

*/