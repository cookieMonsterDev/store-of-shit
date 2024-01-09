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
 
  }

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, porro architecto dolores dolore accusantium, nesciunt autem in ut libero, laborum qui aspernatur aliquam quaerat dolorum perspiciatis tempora. Placeat maiores reprehenderit veritatis iure sequi ex accusamus, exercitationem molestiae eius error maxime in sunt libero, qui cupiditate tempora possimus dolor quis fuga.
}
