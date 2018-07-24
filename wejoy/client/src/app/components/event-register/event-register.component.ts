import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Event } from '../../type/event';
import { Order } from "../../type/order";
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';

const DEFAULT_EVENT: Order = Object.freeze({
  id: 0,
  name: "",
  email: "",
  phone: "",
  eventID: 0
})

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css']
})
export class EventRegisterComponent implements OnInit {

  event: Event;
  newOrder: Order = Object.assign({}, DEFAULT_EVENT);
  eventID: Number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    @Inject("get_events") private getEvent
  ) { }


  message = "";
  error = "";
  ngOnInit() {
    this.route.params.subscribe(params =>{
      console.log(params);
      this.newOrder.eventID = +params["id"];
      //this.event = this.events[+params["id"]-1];
      this.getEvent.getEventInfo(+params["id"])
        .subscribe((event)=>{
          this.event = event
        });
    });
  }

  registerEvent(): void {
    this.message = "";
    if(!this.newOrder.name){
      this.message = "please enter an name";
    }
    else if(!this.newOrder.email){
      this.message = "please enter an email";
    }
    else if(!this.newOrder.phone){
      this.message = "please enter an phone";
    }
    else{
      this.getEvent.registerEvent(this.newOrder).subscribe(
        (response) =>{
          this.message = "success";
          this.router.navigate(['/ticket']);
        },
        (error) => {
          console.log(error.error);
          this.error = error.error;
          this.message = this.error;
        }
      );
        // .catch(res => console.log(res + "this is the body"));

      // if(this.error){
      //   this.getEvent = Object.assign({}, DEFAULT_EVENT);
      //   this.message = this.error;
      // }else{
      //   this.message = "success";
      // }

    }

  }


}
