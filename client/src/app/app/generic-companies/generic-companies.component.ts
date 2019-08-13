import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IConfig } from 'src/app/models/config.model';
import { ICompany } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { SharedService } from 'src/app/services/shared.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-generic-companies',
  templateUrl: './generic-companies.component.html',
  styleUrls: ['./generic-companies.component.css']
})
export class GenericCompaniesComponent implements OnInit {
  @Input() state: String;
  @Input() user: IUser;
  private config: IConfig;
  companies: ICompany[];
  displayColumns: string[] = [
    'select',
    'status',
    'info',
    'image',    
    'comments',
    'user'
  ];
  constructor(
    private companiesClient: CompanyService,
    private sharedClient: SharedService
  ) {
  }

  ngOnInit() {    
    this.sharedClient.config.subscribe((config) => {
      this.config = config;
    });
    this.sharedClient.token.subscribe((token) => {
      if (token != null && this.config != null) {
        this.companiesClient.getCompanies(token, this.config).subscribe((companies) => {
          this.companies = companies;
        });
      }
    });
    this.sharedClient.socket.subscribe((emit) => {
      if (emit == null) {
        return;
      }
      if (emit.modelName === 'company') {
        const company = <ICompany>emit.data;
        switch (emit.actionDb) {
          case 'create': {
            this.addNewCompanySocket(company);
          }break;
          case 'update': {
            this.editCompanySocket(company);
          }break;
          case 'delete': {
            this.removeCompanySocket(company);
          }break;
        }
      }
    });
  }
  removeCompanySocket(company: ICompany) {
    this.companies = this.companies.filter((inCompany) => {
      return inCompany._id !== company._id;
    });
  }
  addNewCompanySocket(company: ICompany) {
    this.companies.push(company);
  }
  editCompanySocket(company: ICompany) {
    this.companies = this.companies.map((inCompany) => {
      if (inCompany._id === company._id) {
        return company;
      } else {
        return inCompany;
      }
    });
  }

}
