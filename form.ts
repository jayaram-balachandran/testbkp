import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from '../agent.service';
import { Agent } from '../agent';



@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {

agentModel = new Agent();

  invalidName:boolean;
  disableIdField: boolean;
  public agent: Agent;
  constructor(private _router: Router, private _agentService: AgentService) { }

  ngOnInit() {
    
    this.invalidName = false;
    this.agent = this._agentService.getter();
  if(this._agentService.editgetter()) {
    this.agentModel= this.agent;
    this.disableIdField = true;
  } else {
    this.agentModel = new Agent();
    this.disableIdField = false;
  }
    console.log("getter data in add agent",this.agent);
  }

  saveAgent(){
    if(this._agentService.editgetter()) {
    //Update Function
    this._agentService
      .updateAgent(JSON.stringify(this.agentModel))
      .subscribe(
        (data) => {
          console.log("Update data",data);
          this._router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      )
    } else {
    //Save Function  
    console.log("json data",this.agentModel );
    console.log("strigified data",JSON.stringify(this.agentModel) );
    this._agentService
      .saveAgent(JSON.stringify(this.agentModel))
    
    }      
  }


}
