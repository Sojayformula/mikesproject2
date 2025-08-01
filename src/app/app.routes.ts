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
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PersonInformationComponent } from './editStaff/person-information/person-information.component';
import { EmploymentDetailsComponent } from './editStaff/employment-details/employment-details.component';
import { FamilyDetailsComponent } from './editStaff/family-details/family-details.component';
import { NextOfKinsComponent } from './editStaff/next-of-kins/next-of-kins.component';
import { EditstaffLayoutComponent } from './editStaff/editstaff-layout/editstaff-layout.component';
import { StaffComponent } from './pages/staff/staff.component';
import { EmengencycontactComponent } from './editStaff/emengencycontact/emengencycontact.component';
import { EducationdetailsComponent } from './editStaff/educationdetails/educationdetails.component';
import { EditPersonalInfoComponent } from './editStaff/edit-personal-info/edit-personal-info.component';
import { EditsettingsComponent } from './editStaff/settingsfolder/editsettings/editsettings.component';
import { EmergencyContactComponent2 } from './editStaff/settingsfolder/emergency-contact/emergency-contact.component';
import { EmploymentDetailsComponent2 } from './editStaff/settingsfolder/employment-details/employment-details.component';
import { FamilyDetailsComponent2 } from './editStaff/settingsfolder/family-details/family-details.component';
import { NextOfKinComponent2 } from './editStaff/settingsfolder/next-of-kin/next-of-kin.component';
import { PersonalInformationComponent2 } from './editStaff/settingsfolder/personal-information/personal-information.component';
import { EducationBackgroundComponent2 } from './editStaff/settingsfolder/education-background/education-background.component';
import { ProfilepersonalinfoComponent } from './profilePage/profilepersonalinfo/profilepersonalinfo.component';
import { ProfileemploymentDetailsComponent } from './profilePage/profile-employment/profile-employment.component';
import { ProfileFamilyComponent } from './profilePage/profile-family/profile-family.component';
import { ProfileNextOfKinsComponent } from './profilePage/profile-next-of-kins/profile-next-of-kins.component';
import { ProfileemergencycontactComponent } from './profilePage/profileemergencycontact/profileemergencycontact.component';
import { ProfileEducationComponent } from './profilePage/profile-education/profile-education.component';
import { ProfilePageLayoutComponent } from './profilePage/profile-page-layout/profile-page-layout.component';
import { ManageTicketComponent } from './MPAPP/manage-ticket/manage-ticket.component';
import { MPDashboardComponent } from './MPAPP/dashboard/dashboard.component';
import { ResourceComponent } from './MPAPP/resource/resource.component';
import { MPPageslayoutyComponent } from './MPAPP/mppageslayouty/mppageslayouty.component';




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
           
               {path: 'editstaff-layout', 
                component: EditstaffLayoutComponent,
                children:[
                {path: '', redirectTo: 'person-information', pathMatch: 'full'},
                {path: 'person-information', component: PersonInformationComponent},
                {path: 'employment-details', component: EmploymentDetailsComponent},
                {path: 'family-details', component: FamilyDetailsComponent},
                {path: 'next-of-kins', component: NextOfKinsComponent},
                {path: 'emengency-contact', component: EmengencycontactComponent},
                {path: 'education-details', component: EducationdetailsComponent},
                {path: 'edit-personal-info', component: EditPersonalInfoComponent}   
              ]
            },


             { path: 'editsettings', component: EditsettingsComponent,
            children:[
              {path: '', redirectTo: 'personal-information', pathMatch: 'full'},
              {path: 'personal-information', component: PersonalInformationComponent2},
              {path: 'employment-details', component: EmploymentDetailsComponent2},
               {path: 'family-details', component: FamilyDetailsComponent2},
               {path: 'next-of-kin', component: NextOfKinComponent2},
               {path: 'emergency-contact', component: EmergencyContactComponent2},
              {path: 'education-details', component: EducationBackgroundComponent2 },
                
            ]
           },
           


        
               { path: 'profile-page-layout', component: ProfilePageLayoutComponent,
                children: [
                  { path: '', redirectTo: 'personal-information', pathMatch: 'full' }, 
                  { path: 'personal-information', component: ProfilepersonalinfoComponent },
                  { path: 'employment-details', component: ProfileemploymentDetailsComponent },
                  { path: 'family-details', component: ProfileFamilyComponent },
                  { path: 'next-of-kins', component: ProfileNextOfKinsComponent },
                  { path: 'emergency-contact', component: ProfileemergencycontactComponent },
                  { path: 'education-details', component: ProfileEducationComponent }
                ]
              }

           ]
          },



               {
              path: 'MPpageslayout2', component: MPPageslayoutyComponent,
              children: [
                { path: '', redirectTo: 'MPdashbaord', pathMatch: 'full' },
                { path: 'MPdashboard', component: MPDashboardComponent },
                { path: 'manage-ticket', component: ManageTicketComponent },
                { path: 'resource', component: ResourceComponent },
                
              ]
            },
            
// MPpageslayout2
        ]
  




           
          //    { path: 'profile-page-layout/:id', component: ProfilePageLayoutComponent,
          //   children:[
          //     {path: '', redirectTo: 'profilepersonalinfo', pathMatch: 'full'},
          //     { path: 'profilepersonalinfo', component: ProfilepersonalinfoComponent },
          //     {path: 'profile-employment', component: ProfileemploymentDetailsComponent},
          //      {path: 'profile-family', component: ProfileFamilyComponent},
          //      {path: 'profile-next-of-kins', component: ProfileNextOfKinsComponent},
          //      {path: 'profileemergencycontact', component: ProfileemergencycontactComponent},
          //     {path: 'education-details', component: ProfileEducationComponent },
                
          //   ]
          //  }