import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from '../agent.service';
import { Admin } from '../admin';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.scss'],
})
export class AddadminComponent implements OnInit {
  adminModel = new Admin();

  invalidName: boolean;
  disableIdField: boolean;
  public admin: Admin;
  constructor(private _router: Router, private _agentService: AgentService) {}

  ngOnInit() {
    this.invalidName = false;
    this.admin = this._agentService.getter();
    if (this._agentService.editgetter()) {
      this.adminModel = this.admin;
      this.disableIdField = true;
    } else {
      this.adminModel = new Admin();
      this.disableIdField = false;
    }
    console.log('getter data in add agent', this.admin);
  }

  saveAgent() {
    if (this._agentService.editgetter()) {
      //Update Function
      this._agentService.updateAgent(JSON.stringify(this.adminModel)).subscribe(
        (data) => {
          console.log('Update data', data);
          this._router.navigate(['/agentdetail']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      //Save Function
      console.log('json data', this.adminModel);
      console.log('strigified data', JSON.stringify(this.adminModel));
      this._agentService.saveAgent(JSON.stringify(this.adminModel)).subscribe(
        (data) => {
          console.log('Add data', data);
          this._router.navigate(['/agentdetail']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
