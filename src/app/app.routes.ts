import { Routes } from '@angular/router';
import { SigninComponent } from './loginpage/signin/signin.component';
import { ForgotpaswordComponent } from './loginpage/forgotpasword/forgotpasword.component';
import { LoginlayoutComponent } from './loginpage/loginlayout/loginlayout.component';
import { OTPComponent } from './loginpage/otp/otp.component';
import { ResetpasswordComponent } from './loginpage/resetpassword/resetpassword.component';
import { PageslayoutComponent } from './pages/pageslayout/pageslayout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UnitComponent } from './pages/unit/unit.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ToolsComponent } from './pages/tools/tools.component';
import { SupportComponent } from './pages/support/support.component';
import { HomepageComponent } from './environment/homepage/homepage.component';
import { PersonInformationComponent } from './editStaff/person-information/person-information.component';
import { EmploymentDetailsComponent } from './editStaff/employment-details/employment-details.component';
import { FamilyDetailsComponent } from './editStaff/family-details/family-details.component';
import { NextOfKinsComponent } from './editStaff/next-of-kins/next-of-kins.component';
import { EditstaffLayoutComponent } from './pages/editstaff-layout/editstaff-layout.component';
import { StaffComponent } from './pages/staff/staff.component';


export const routes: Routes = [

           {path: "", redirectTo: 'homepage', pathMatch: 'full'}, 
            {path: "homepage", component: HomepageComponent},


            {path: "", component: LoginlayoutComponent,
        children:[
            
        {path: 'signin', component: SigninComponent},
        {path: "forgotpassword", component: ForgotpaswordComponent},
        {path: "otp", component: OTPComponent},
        {path: "resetpassword", component: ResetpasswordComponent},

        ]
         },

          {path: "", component: PageslayoutComponent,
           children:[
            {path: "dashboard", component: DashboardComponent},
            {path: "tools", component: ToolsComponent},
            {path: "unit", component: UnitComponent},
             {path: "support", component: SupportComponent},
            {path: "settings", component: SettingsComponent},
            {path: "staff", component: StaffComponent},
           
               {path: "", component: EditstaffLayoutComponent,
                children:[
                {path: '', redirectTo: 'person-information', pathMatch: 'full'},
                {path: "person-information", component: PersonInformationComponent},
                {path: "employment-details", component: EmploymentDetailsComponent},
                {path: "family-details", component: FamilyDetailsComponent},
                {path: "next-of-kins", component: NextOfKinsComponent},
              ]
            },
          ]
          }

        ]
  