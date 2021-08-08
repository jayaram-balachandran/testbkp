import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AgentService } from '../agent.service';
import { Agent } from '../agent';
import { Router } from '@angular/router';

export interface agentDetails {
  firstName: string;
  lastName: string;
  emailId: string;
  language: string;
  province: string;
  group: string;
  status: string;
}

@Component({
  selector: 'app-agentdetails',
  templateUrl: './agentdetails.component.html',
  styleUrls: ['./agentdetails.component.scss'],
})
export class AgentdetailsComponent implements OnInit, AfterViewInit {
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'emailId',
    'language',
    'province',
    'group',
    'status',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<agentDetails>();

  constructor(private _router: Router, private _agentService: AgentService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {}

  ngOnInit() {
    this.getAgents();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  getAgents() {
    this._agentService.getAgent().subscribe(
      (data: agentDetails[]) => {
        console.log('Agents data from DB', data);
        this.dataSource = new MatTableDataSource<agentDetails>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => console.log(error)
    );
  }

  updateAgent(agent) {
    console.log('inside update', agent);
    this._agentService.setter(agent);
    this._agentService.editsetter(true);
    this._router.navigate(['/addadmin']);
  }

  deleteAgent(emailId: string) {
    console.log('emailId', emailId);
    this._agentService.deleteAgent(emailId).subscribe(
      (id) => {
        console.log('Agent Deleted');
        this.getAgents();
      },
      (error) => console.log(error)
    );
  }
}
