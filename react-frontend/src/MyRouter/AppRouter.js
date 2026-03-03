import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleCompaniesPage from "../components/app_components/CompaniesPage/SingleCompaniesPage";
import CompanyProjectLayoutPage from "../components/app_components/CompaniesPage/CompanyProjectLayoutPage";
import SingleBranchesPage from "../components/app_components/BranchesPage/SingleBranchesPage";
import BranchProjectLayoutPage from "../components/app_components/BranchesPage/BranchProjectLayoutPage";
import SingleDepartmentsPage from "../components/app_components/DepartmentsPage/SingleDepartmentsPage";
import DepartmentProjectLayoutPage from "../components/app_components/DepartmentsPage/DepartmentProjectLayoutPage";
import SingleSectionsPage from "../components/app_components/SectionsPage/SingleSectionsPage";
import SectionProjectLayoutPage from "../components/app_components/SectionsPage/SectionProjectLayoutPage";
import SingleRolesPage from "../components/app_components/RolesPage/SingleRolesPage";
import RoleProjectLayoutPage from "../components/app_components/RolesPage/RoleProjectLayoutPage";
import SinglePositionsPage from "../components/app_components/PositionsPage/SinglePositionsPage";
import PositionProjectLayoutPage from "../components/app_components/PositionsPage/PositionProjectLayoutPage";
import SingleProfilesPage from "../components/app_components/ProfilesPage/SingleProfilesPage";
import ProfileProjectLayoutPage from "../components/app_components/ProfilesPage/ProfileProjectLayoutPage";
import SingleTemplatesPage from "../components/app_components/TemplatesPage/SingleTemplatesPage";
import TemplateProjectLayoutPage from "../components/app_components/TemplatesPage/TemplateProjectLayoutPage";
import SingleUserAddressesPage from "../components/app_components/UserAddressesPage/SingleUserAddressesPage";
import UserAddressProjectLayoutPage from "../components/app_components/UserAddressesPage/UserAddressProjectLayoutPage";
import SingleCompanyAddressesPage from "../components/app_components/CompanyAddressesPage/SingleCompanyAddressesPage";
import CompanyAddressProjectLayoutPage from "../components/app_components/CompanyAddressesPage/CompanyAddressProjectLayoutPage";
import SingleCompanyPhonesPage from "../components/app_components/CompanyPhonesPage/SingleCompanyPhonesPage";
import CompanyPhoneProjectLayoutPage from "../components/app_components/CompanyPhonesPage/CompanyPhoneProjectLayoutPage";
import SingleUserPhonesPage from "../components/app_components/UserPhonesPage/SingleUserPhonesPage";
import UserPhoneProjectLayoutPage from "../components/app_components/UserPhonesPage/UserPhoneProjectLayoutPage";
import SingleStaffinfoPage from "../components/app_components/StaffinfoPage/SingleStaffinfoPage";
import StaffinfoProjectLayoutPage from "../components/app_components/StaffinfoPage/StaffinfoProjectLayoutPage";
import SingleEmployeesPage from "../components/app_components/EmployeesPage/SingleEmployeesPage";
import EmployeeProjectLayoutPage from "../components/app_components/EmployeesPage/EmployeeProjectLayoutPage";
import SingleSuperiorsPage from "../components/app_components/SuperiorsPage/SingleSuperiorsPage";
import SuperiorProjectLayoutPage from "../components/app_components/SuperiorsPage/SuperiorProjectLayoutPage";
import SingleDepartmentAdminPage from "../components/app_components/DepartmentAdminPage/SingleDepartmentAdminPage";
import DepartmentAdminProjectLayoutPage from "../components/app_components/DepartmentAdminPage/DepartmentAdminProjectLayoutPage";
import SingleDepartmentHODPage from "../components/app_components/DepartmentHODPage/SingleDepartmentHODPage";
import DepartmentHODProjectLayoutPage from "../components/app_components/DepartmentHODPage/DepartmentHODProjectLayoutPage";
import SingleDepartmentHOSPage from "../components/app_components/DepartmentHOSPage/SingleDepartmentHOSPage";
import DepartmentHOProjectLayoutPage from "../components/app_components/DepartmentHOSPage/DepartmentHOProjectLayoutPage";
import SingleUserGuideStepsPage from "../components/app_components/UserGuideStepsPage/SingleUserGuideStepsPage";
import UserGuideStepProjectLayoutPage from "../components/app_components/UserGuideStepsPage/UserGuideStepProjectLayoutPage";
import SingleUserGuidePage from "../components/app_components/UserGuidePage/SingleUserGuidePage";
import UserGuideProjectLayoutPage from "../components/app_components/UserGuidePage/UserGuideProjectLayoutPage";
import SingleAuditsPage from "../components/app_components/AuditsPage/SingleAuditsPage";
import AuditProjectLayoutPage from "../components/app_components/AuditsPage/AuditProjectLayoutPage";
import SingleChataiEnablerPage from "../components/app_components/ChataiEnablerPage/SingleChataiEnablerPage";
import ChataiEnablerProjectLayoutPage from "../components/app_components/ChataiEnablerPage/ChataiEnablerProjectLayoutPage";
import SingleChataiConfigPage from "../components/app_components/ChataiConfigPage/SingleChataiConfigPage";
import ChataiConfigProjectLayoutPage from "../components/app_components/ChataiConfigPage/ChataiConfigProjectLayoutPage";
import SingleChataiPromptsPage from "../components/app_components/ChataiPromptsPage/SingleChataiPromptsPage";
import ChataiPromptProjectLayoutPage from "../components/app_components/ChataiPromptsPage/ChataiPromptProjectLayoutPage";
import SingleDocumentStoragesPage from "../components/app_components/DocumentStoragesPage/SingleDocumentStoragesPage";
import DocumentStorageProjectLayoutPage from "../components/app_components/DocumentStoragesPage/DocumentStorageProjectLayoutPage";
import SingleFcmsPage from "../components/app_components/FcmsPage/SingleFcmsPage";
import FcmProjectLayoutPage from "../components/app_components/FcmsPage/FcmProjectLayoutPage";
import SingleFcmQuesPage from "../components/app_components/FcmQuesPage/SingleFcmQuesPage";
import FcmQueProjectLayoutPage from "../components/app_components/FcmQuesPage/FcmQueProjectLayoutPage";
import SingleFcmMessagesPage from "../components/app_components/FcmMessagesPage/SingleFcmMessagesPage";
import FcmMessageProjectLayoutPage from "../components/app_components/FcmMessagesPage/FcmMessageProjectLayoutPage";
import SingleHelpSidebarContentsPage from "../components/app_components/HelpSidebarContentsPage/SingleHelpSidebarContentsPage";
import HelpSidebarContentProjectLayoutPage from "../components/app_components/HelpSidebarContentsPage/HelpSidebarContentProjectLayoutPage";
import SingleLoginHistoriesPage from "../components/app_components/LoginHistoriesPage/SingleLoginHistoriesPage";
import LoginHistoryProjectLayoutPage from "../components/app_components/LoginHistoriesPage/LoginHistoryProjectLayoutPage";
import SingleMailQuesPage from "../components/app_components/MailQuesPage/SingleMailQuesPage";
import MailQueProjectLayoutPage from "../components/app_components/MailQuesPage/MailQueProjectLayoutPage";
import SingleProfileMenuPage from "../components/app_components/ProfileMenuPage/SingleProfileMenuPage";
import ProfileMenuProjectLayoutPage from "../components/app_components/ProfileMenuPage/ProfileMenuProjectLayoutPage";
import SingleMenuItemsPage from "../components/app_components/MenuItemsPage/SingleMenuItemsPage";
import MenuItemProjectLayoutPage from "../components/app_components/MenuItemsPage/MenuItemProjectLayoutPage";
import SingleUploaderPage from "../components/app_components/UploaderPage/SingleUploaderPage";
import UploaderProjectLayoutPage from "../components/app_components/UploaderPage/UploaderProjectLayoutPage";
import SingleUserChangePasswordPage from "../components/app_components/UserChangePasswordPage/SingleUserChangePasswordPage";
import UserChangePasswordProjectLayoutPage from "../components/app_components/UserChangePasswordPage/UserChangePasswordProjectLayoutPage";
import SingleUserInvitesPage from "../components/app_components/UserInvitesPage/SingleUserInvitesPage";
import UserInviteProjectLayoutPage from "../components/app_components/UserInvitesPage/UserInviteProjectLayoutPage";
import SingleUserTrackerIdPage from "../components/app_components/UserTrackerIdPage/SingleUserTrackerIdPage";
import UserTrackerIdProjectLayoutPage from "../components/app_components/UserTrackerIdPage/UserTrackerIdProjectLayoutPage";
import SinglePermissionServicesPage from "../components/app_components/PermissionServicesPage/SinglePermissionServicesPage";
import PermissionServiceProjectLayoutPage from "../components/app_components/PermissionServicesPage/PermissionServiceProjectLayoutPage";
import SinglePermissionFieldsPage from "../components/app_components/PermissionFieldsPage/SinglePermissionFieldsPage";
import PermissionFieldProjectLayoutPage from "../components/app_components/PermissionFieldsPage/PermissionFieldProjectLayoutPage";
import SingleErrorLogsPage from "../components/app_components/ErrorLogsPage/SingleErrorLogsPage";
import ErrorLogProjectLayoutPage from "../components/app_components/ErrorLogsPage/ErrorLogProjectLayoutPage";
import SingleInboxPage from "../components/app_components/InboxPage/SingleInboxPage";
import InboxProjectLayoutPage from "../components/app_components/InboxPage/InboxProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/companies/:singleCompaniesId" exact element={<SingleCompaniesPage />} />
<Route path="/companies" exact element={<CompanyProjectLayoutPage />} />
<Route path="/branches/:singleBranchesId" exact element={<SingleBranchesPage />} />
<Route path="/branches" exact element={<BranchProjectLayoutPage />} />
<Route path="/departments/:singleDepartmentsId" exact element={<SingleDepartmentsPage />} />
<Route path="/departments" exact element={<DepartmentProjectLayoutPage />} />
<Route path="/sections/:singleSectionsId" exact element={<SingleSectionsPage />} />
<Route path="/sections" exact element={<SectionProjectLayoutPage />} />
<Route path="/roles/:singleRolesId" exact element={<SingleRolesPage />} />
<Route path="/roles" exact element={<RoleProjectLayoutPage />} />
<Route path="/positions/:singlePositionsId" exact element={<SinglePositionsPage />} />
<Route path="/positions" exact element={<PositionProjectLayoutPage />} />
<Route path="/profiles/:singleProfilesId" exact element={<SingleProfilesPage />} />
<Route path="/profiles" exact element={<ProfileProjectLayoutPage />} />
<Route path="/templates/:singleTemplatesId" exact element={<SingleTemplatesPage />} />
<Route path="/templates" exact element={<TemplateProjectLayoutPage />} />
<Route path="/userAddresses/:singleUserAddressesId" exact element={<SingleUserAddressesPage />} />
<Route path="/userAddresses" exact element={<UserAddressProjectLayoutPage />} />
<Route path="/companyAddresses/:singleCompanyAddressesId" exact element={<SingleCompanyAddressesPage />} />
<Route path="/companyAddresses" exact element={<CompanyAddressProjectLayoutPage />} />
<Route path="/companyPhones/:singleCompanyPhonesId" exact element={<SingleCompanyPhonesPage />} />
<Route path="/companyPhones" exact element={<CompanyPhoneProjectLayoutPage />} />
<Route path="/userPhones/:singleUserPhonesId" exact element={<SingleUserPhonesPage />} />
<Route path="/userPhones" exact element={<UserPhoneProjectLayoutPage />} />
<Route path="/staffinfo/:singleStaffinfoId" exact element={<SingleStaffinfoPage />} />
<Route path="/staffinfo" exact element={<StaffinfoProjectLayoutPage />} />
<Route path="/employees/:singleEmployeesId" exact element={<SingleEmployeesPage />} />
<Route path="/employees" exact element={<EmployeeProjectLayoutPage />} />
<Route path="/superiors/:singleSuperiorsId" exact element={<SingleSuperiorsPage />} />
<Route path="/superiors" exact element={<SuperiorProjectLayoutPage />} />
<Route path="/departmentAdmin/:singleDepartmentAdminId" exact element={<SingleDepartmentAdminPage />} />
<Route path="/departmentAdmin" exact element={<DepartmentAdminProjectLayoutPage />} />
<Route path="/departmentHOD/:singleDepartmentHODId" exact element={<SingleDepartmentHODPage />} />
<Route path="/departmentHOD" exact element={<DepartmentHODProjectLayoutPage />} />
<Route path="/departmentHOS/:singleDepartmentHOSId" exact element={<SingleDepartmentHOSPage />} />
<Route path="/departmentHOS" exact element={<DepartmentHOProjectLayoutPage />} />
<Route path="/userGuideSteps/:singleUserGuideStepsId" exact element={<SingleUserGuideStepsPage />} />
<Route path="/userGuideSteps" exact element={<UserGuideStepProjectLayoutPage />} />
<Route path="/userGuide/:singleUserGuideId" exact element={<SingleUserGuidePage />} />
<Route path="/userGuide" exact element={<UserGuideProjectLayoutPage />} />
<Route path="/audits/:singleAuditsId" exact element={<SingleAuditsPage />} />
<Route path="/audits" exact element={<AuditProjectLayoutPage />} />
<Route path="/chataiEnabler/:singleChataiEnablerId" exact element={<SingleChataiEnablerPage />} />
<Route path="/chataiEnabler" exact element={<ChataiEnablerProjectLayoutPage />} />
<Route path="/chataiConfig/:singleChataiConfigId" exact element={<SingleChataiConfigPage />} />
<Route path="/chataiConfig" exact element={<ChataiConfigProjectLayoutPage />} />
<Route path="/chataiPrompts/:singleChataiPromptsId" exact element={<SingleChataiPromptsPage />} />
<Route path="/chataiPrompts" exact element={<ChataiPromptProjectLayoutPage />} />
<Route path="/documentStorages/:singleDocumentStoragesId" exact element={<SingleDocumentStoragesPage />} />
<Route path="/documentStorages" exact element={<DocumentStorageProjectLayoutPage />} />
<Route path="/fcms/:singleFcmsId" exact element={<SingleFcmsPage />} />
<Route path="/fcms" exact element={<FcmProjectLayoutPage />} />
<Route path="/fcmQues/:singleFcmQuesId" exact element={<SingleFcmQuesPage />} />
<Route path="/fcmQues" exact element={<FcmQueProjectLayoutPage />} />
<Route path="/fcmMessages/:singleFcmMessagesId" exact element={<SingleFcmMessagesPage />} />
<Route path="/fcmMessages" exact element={<FcmMessageProjectLayoutPage />} />
<Route path="/helpSidebarContents/:singleHelpSidebarContentsId" exact element={<SingleHelpSidebarContentsPage />} />
<Route path="/helpSidebarContents" exact element={<HelpSidebarContentProjectLayoutPage />} />
<Route path="/loginHistories/:singleLoginHistoriesId" exact element={<SingleLoginHistoriesPage />} />
<Route path="/loginHistories" exact element={<LoginHistoryProjectLayoutPage />} />
<Route path="/mailQues/:singleMailQuesId" exact element={<SingleMailQuesPage />} />
<Route path="/mailQues" exact element={<MailQueProjectLayoutPage />} />
<Route path="/profileMenu/:singleProfileMenuId" exact element={<SingleProfileMenuPage />} />
<Route path="/profileMenu" exact element={<ProfileMenuProjectLayoutPage />} />
<Route path="/menuItems/:singleMenuItemsId" exact element={<SingleMenuItemsPage />} />
<Route path="/menuItems" exact element={<MenuItemProjectLayoutPage />} />
<Route path="/uploader/:singleUploaderId" exact element={<SingleUploaderPage />} />
<Route path="/uploader" exact element={<UploaderProjectLayoutPage />} />
<Route path="/userChangePassword/:singleUserChangePasswordId" exact element={<SingleUserChangePasswordPage />} />
<Route path="/userChangePassword" exact element={<UserChangePasswordProjectLayoutPage />} />
<Route path="/userInvites/:singleUserInvitesId" exact element={<SingleUserInvitesPage />} />
<Route path="/userInvites" exact element={<UserInviteProjectLayoutPage />} />
<Route path="/userTrackerId/:singleUserTrackerIdId" exact element={<SingleUserTrackerIdPage />} />
<Route path="/userTrackerId" exact element={<UserTrackerIdProjectLayoutPage />} />
<Route path="/permissionServices/:singlePermissionServicesId" exact element={<SinglePermissionServicesPage />} />
<Route path="/permissionServices" exact element={<PermissionServiceProjectLayoutPage />} />
<Route path="/permissionFields/:singlePermissionFieldsId" exact element={<SinglePermissionFieldsPage />} />
<Route path="/permissionFields" exact element={<PermissionFieldProjectLayoutPage />} />
<Route path="/errorLogs/:singleErrorLogsId" exact element={<SingleErrorLogsPage />} />
<Route path="/errorLogs" exact element={<ErrorLogProjectLayoutPage />} />
<Route path="/inbox/:singleInboxId" exact element={<SingleInboxPage />} />
<Route path="/inbox" exact element={<InboxProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
