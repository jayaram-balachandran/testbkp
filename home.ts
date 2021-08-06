import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import { Agent } from '../agent';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.scss']
})
export class AgentHomeComponent implements OnInit {

  public agents: Agent[];
  private agent: Agent;
  constructor(private _router: Router, private _agentService: AgentService) { }

  ngOnInit(){
    this.getAgents();
  }
 
getAgents(){
  this._agentService
  .getAgent()
  .subscribe(
    (data: Agent[]) => {
      console.log("Agents data from DB",data);
      this.agents = data;
    },
    (error) => console.log(error)
  );
}

  moveToAddAgent() {
    this._agentService.editsetter(false);
    this._router.navigate(['/addagent']);
  }

  updateAgent(agent){
    console.log("inside update", agent);
    this._agentService.setter(agent);
    this._agentService.editsetter(true);
    this._router.navigate(["/addagent"]);
  }

  deleteAgent(id: Number){
    console.log("id",id)
    this._agentService
      .deleteAgent(id)
      .subscribe(
        (id) => {
          console.log("Agent Deleted");
          this.getAgents();
        },
        (error) => console.log(error)
      );
  }
}
