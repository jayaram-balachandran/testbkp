import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { AddAgentComponent } from './add-agent/add-agent.component';

import { AgentService } from './agent.service';
import { HttpClientModule } from '@angular/common/http';
import { AgentHomeComponent } from './agent-home/agent-home.component';
import { AgentdetailsComponent } from './agentdetails/agentdetails.component';
import { AddagentComponent } from './addagent/addagent.component';
import { AddadminComponent } from './addadmin/addadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAgentComponent,
    AgentHomeComponent,
    AgentdetailsComponent,
    AddagentComponent,
    AddadminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatDialogModule,
  ],

  providers: [AgentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
