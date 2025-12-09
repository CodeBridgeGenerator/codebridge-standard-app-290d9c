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
import SingleTestsPage from "../components/app_components/TestsPage/SingleTestsPage";
import TestProjectLayoutPage from "../components/app_components/TestsPage/TestProjectLayoutPage";
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
import SingleSuperiorPage from "../components/app_components/SuperiorPage/SingleSuperiorPage";
import SuperiorProjectLayoutPage from "../components/app_components/SuperiorPage/SuperiorProjectLayoutPage";
import SingleDepartmentAdminPage from "../components/app_components/DepartmentAdminPage/SingleDepartmentAdminPage";
import DepartmentAdminProjectLayoutPage from "../components/app_components/DepartmentAdminPage/DepartmentAdminProjectLayoutPage";
import SingleDepartmentHODPage from "../components/app_components/DepartmentHODPage/SingleDepartmentHODPage";
import DepartmentHODProjectLayoutPage from "../components/app_components/DepartmentHODPage/DepartmentHODProjectLayoutPage";
import SingleDepartmentHOSPage from "../components/app_components/DepartmentHOSPage/SingleDepartmentHOSPage";
import DepartmentHOProjectLayoutPage from "../components/app_components/DepartmentHOSPage/DepartmentHOProjectLayoutPage";
import SingleStepsPage from "../components/app_components/StepsPage/SingleStepsPage";
import StepProjectLayoutPage from "../components/app_components/StepsPage/StepProjectLayoutPage";
import SingleUserGuidePage from "../components/app_components/UserGuidePage/SingleUserGuidePage";
import UserGuideProjectLayoutPage from "../components/app_components/UserGuidePage/UserGuideProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
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
<Route path="/tests/:singleTestsId" exact element={<SingleTestsPage />} />
<Route path="/tests" exact element={<TestProjectLayoutPage />} />
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
<Route path="/superior/:singleSuperiorId" exact element={<SingleSuperiorPage />} />
<Route path="/superior" exact element={<SuperiorProjectLayoutPage />} />
<Route path="/departmentAdmin/:singleDepartmentAdminId" exact element={<SingleDepartmentAdminPage />} />
<Route path="/departmentAdmin" exact element={<DepartmentAdminProjectLayoutPage />} />
<Route path="/departmentHOD/:singleDepartmentHODId" exact element={<SingleDepartmentHODPage />} />
<Route path="/departmentHOD" exact element={<DepartmentHODProjectLayoutPage />} />
<Route path="/departmentHOS/:singleDepartmentHOSId" exact element={<SingleDepartmentHOSPage />} />
<Route path="/departmentHOS" exact element={<DepartmentHOProjectLayoutPage />} />
<Route path="/steps/:singleStepsId" exact element={<SingleStepsPage />} />
<Route path="/steps" exact element={<StepProjectLayoutPage />} />
<Route path="/userGuide/:singleUserGuideId" exact element={<SingleUserGuidePage />} />
<Route path="/userGuide" exact element={<UserGuideProjectLayoutPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
        </Routes>
    );
}

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
