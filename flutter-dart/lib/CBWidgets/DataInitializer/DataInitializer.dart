import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import 'package:rename/platform_file_editors/abs_platform_file_editor.dart';

import 'DataFetchable.dart';
import '../../CBWidgets/Users/UsersProvider.dart';
import '../../CBWidgets/Companies/CompaniesProvider.dart';
import '../../CBWidgets/Branches/BranchesProvider.dart';
import '../../CBWidgets/Departments/DepartmentsProvider.dart';
import '../../CBWidgets/Sections/SectionsProvider.dart';
import '../../CBWidgets/Roles/RolesProvider.dart';
import '../../CBWidgets/Positions/PositionsProvider.dart';
import '../../CBWidgets/Profiles/ProfilesProvider.dart';
import '../../CBWidgets/Templates/TemplatesProvider.dart';
import '../../CBWidgets/UserAddresses/UserAddressesProvider.dart';
import '../../CBWidgets/CompanyAddresses/CompanyAddressesProvider.dart';
import '../../CBWidgets/CompanyPhones/CompanyPhonesProvider.dart';
import '../../CBWidgets/UserPhones/UserPhonesProvider.dart';
import '../../CBWidgets/Staffinfo/StaffinfoProvider.dart';
import '../../CBWidgets/Employees/EmployeesProvider.dart';
import '../../CBWidgets/Superiors/SuperiorsProvider.dart';
import '../../CBWidgets/DepartmentAdmin/DepartmentAdminProvider.dart';
import '../../CBWidgets/DepartmentHOD/DepartmentHODProvider.dart';
import '../../CBWidgets/DepartmentHOS/DepartmentHOSProvider.dart';
import '../../CBWidgets/UserGuideSteps/UserGuideStepsProvider.dart';
import '../../CBWidgets/UserGuide/UserGuideProvider.dart';
import '../../CBWidgets/Audits/AuditsProvider.dart';
import '../../CBWidgets/ChataiEnabler/ChataiEnablerProvider.dart';
import '../../CBWidgets/ChataiConfig/ChataiConfigProvider.dart';
import '../../CBWidgets/ChataiPrompts/ChataiPromptsProvider.dart';
import '../../CBWidgets/DocumentStorages/DocumentStoragesProvider.dart';
import '../../CBWidgets/Fcms/FcmsProvider.dart';
import '../../CBWidgets/FcmQues/FcmQuesProvider.dart';
import '../../CBWidgets/FcmMessages/FcmMessagesProvider.dart';
import '../../CBWidgets/HelpSidebarContents/HelpSidebarContentsProvider.dart';
import '../../CBWidgets/LoginHistories/LoginHistoriesProvider.dart';
import '../../CBWidgets/MailQues/MailQuesProvider.dart';
import '../../CBWidgets/ProfileMenu/ProfileMenuProvider.dart';
import '../../CBWidgets/MenuItems/MenuItemsProvider.dart';
import '../../CBWidgets/Uploader/UploaderProvider.dart';
import '../../CBWidgets/UserChangePassword/UserChangePasswordProvider.dart';
import '../../CBWidgets/UserInvites/UserInvitesProvider.dart';
import '../../CBWidgets/UserTrackerId/UserTrackerIdProvider.dart';
import '../../CBWidgets/PermissionServices/PermissionServicesProvider.dart';
import '../../CBWidgets/PermissionFields/PermissionFieldsProvider.dart';
import '../../CBWidgets/ErrorLogs/ErrorLogsProvider.dart';
import '../../CBWidgets/Inbox/InboxProvider.dart';
import '../../Widgets/Users/UsersProvider.dart';
import '../../Widgets/Companies/CompaniesProvider.dart';
import '../../Widgets/Branches/BranchesProvider.dart';
import '../../Widgets/Departments/DepartmentsProvider.dart';
import '../../Widgets/Sections/SectionsProvider.dart';
import '../../Widgets/Roles/RolesProvider.dart';
import '../../Widgets/Positions/PositionsProvider.dart';
import '../../Widgets/Profiles/ProfilesProvider.dart';
import '../../Widgets/Templates/TemplatesProvider.dart';
import '../../Widgets/UserAddresses/UserAddressesProvider.dart';
import '../../Widgets/CompanyAddresses/CompanyAddressesProvider.dart';
import '../../Widgets/CompanyPhones/CompanyPhonesProvider.dart';
import '../../Widgets/UserPhones/UserPhonesProvider.dart';
import '../../Widgets/Staffinfo/StaffinfoProvider.dart';
import '../../Widgets/Employees/EmployeesProvider.dart';
import '../../Widgets/Superiors/SuperiorsProvider.dart';
import '../../Widgets/DepartmentAdmin/DepartmentAdminProvider.dart';
import '../../Widgets/DepartmentHOD/DepartmentHODProvider.dart';
import '../../Widgets/DepartmentHOS/DepartmentHOSProvider.dart';
import '../../Widgets/UserGuideSteps/UserGuideStepsProvider.dart';
import '../../Widgets/UserGuide/UserGuideProvider.dart';
import '../../Widgets/Audits/AuditsProvider.dart';
import '../../Widgets/ChataiEnabler/ChataiEnablerProvider.dart';
import '../../Widgets/ChataiConfig/ChataiConfigProvider.dart';
import '../../Widgets/ChataiPrompts/ChataiPromptsProvider.dart';
import '../../Widgets/DocumentStorages/DocumentStoragesProvider.dart';
import '../../Widgets/Fcms/FcmsProvider.dart';
import '../../Widgets/FcmQues/FcmQuesProvider.dart';
import '../../Widgets/FcmMessages/FcmMessagesProvider.dart';
import '../../Widgets/HelpSidebarContents/HelpSidebarContentsProvider.dart';
import '../../Widgets/LoginHistories/LoginHistoriesProvider.dart';
import '../../Widgets/MailQues/MailQuesProvider.dart';
import '../../Widgets/ProfileMenu/ProfileMenuProvider.dart';
import '../../Widgets/MenuItems/MenuItemsProvider.dart';
import '../../Widgets/Uploader/UploaderProvider.dart';
import '../../Widgets/UserChangePassword/UserChangePasswordProvider.dart';
import '../../Widgets/UserInvites/UserInvitesProvider.dart';
import '../../Widgets/UserTrackerId/UserTrackerIdProvider.dart';
import '../../Widgets/PermissionServices/PermissionServicesProvider.dart';
import '../../Widgets/PermissionFields/PermissionFieldsProvider.dart';
import '../../Widgets/ErrorLogs/ErrorLogsProvider.dart';
import '../../Widgets/Inbox/InboxProvider.dart';
// ~cb-data-initializer-provider-import~

class DataInitializer {
  final BuildContext context;

  DataInitializer(this.context);

  // List of providers to initialize
  final Map<String, DataFetchable> Function(BuildContext) _providerMap =
      (ctx) => {
        //'companies': Provider.of<CompanyProvider>(ctx, listen: false),
				'users': Provider.of<UsersProvider>(ctx, listen: false),
				'companies': Provider.of<CompaniesProvider>(ctx, listen: false),
				'branches': Provider.of<BranchesProvider>(ctx, listen: false),
				'departments': Provider.of<DepartmentsProvider>(ctx, listen: false),
				'sections': Provider.of<SectionsProvider>(ctx, listen: false),
				'roles': Provider.of<RolesProvider>(ctx, listen: false),
				'positions': Provider.of<PositionsProvider>(ctx, listen: false),
				'profiles': Provider.of<ProfilesProvider>(ctx, listen: false),
				'templates': Provider.of<TemplatesProvider>(ctx, listen: false),
				'userAddresses': Provider.of<UserAddressesProvider>(ctx, listen: false),
				'companyAddresses': Provider.of<CompanyAddressesProvider>(ctx, listen: false),
				'companyPhones': Provider.of<CompanyPhonesProvider>(ctx, listen: false),
				'userPhones': Provider.of<UserPhonesProvider>(ctx, listen: false),
				'staffinfo': Provider.of<StaffinfoProvider>(ctx, listen: false),
				'employees': Provider.of<EmployeesProvider>(ctx, listen: false),
				'superiors': Provider.of<SuperiorsProvider>(ctx, listen: false),
				'departmentAdmin': Provider.of<DepartmentAdminProvider>(ctx, listen: false),
				'departmentHOD': Provider.of<DepartmentHODProvider>(ctx, listen: false),
				'departmentHOS': Provider.of<DepartmentHOSProvider>(ctx, listen: false),
				'userGuideSteps': Provider.of<UserGuideStepsProvider>(ctx, listen: false),
				'userGuide': Provider.of<UserGuideProvider>(ctx, listen: false),
				'audits': Provider.of<AuditsProvider>(ctx, listen: false),
				'chataiEnabler': Provider.of<ChataiEnablerProvider>(ctx, listen: false),
				'chataiConfig': Provider.of<ChataiConfigProvider>(ctx, listen: false),
				'chataiPrompts': Provider.of<ChataiPromptsProvider>(ctx, listen: false),
				'documentStorages': Provider.of<DocumentStoragesProvider>(ctx, listen: false),
				'fcms': Provider.of<FcmsProvider>(ctx, listen: false),
				'fcmQues': Provider.of<FcmQuesProvider>(ctx, listen: false),
				'fcmMessages': Provider.of<FcmMessagesProvider>(ctx, listen: false),
				'helpSidebarContents': Provider.of<HelpSidebarContentsProvider>(ctx, listen: false),
				'loginHistories': Provider.of<LoginHistoriesProvider>(ctx, listen: false),
				'mailQues': Provider.of<MailQuesProvider>(ctx, listen: false),
				'profileMenu': Provider.of<ProfileMenuProvider>(ctx, listen: false),
				'menuItems': Provider.of<MenuItemsProvider>(ctx, listen: false),
				'uploader': Provider.of<UploaderProvider>(ctx, listen: false),
				'userChangePassword': Provider.of<UserChangePasswordProvider>(ctx, listen: false),
				'userInvites': Provider.of<UserInvitesProvider>(ctx, listen: false),
				'userTrackerId': Provider.of<UserTrackerIdProvider>(ctx, listen: false),
				'permissionServices': Provider.of<PermissionServicesProvider>(ctx, listen: false),
				'permissionFields': Provider.of<PermissionFieldsProvider>(ctx, listen: false),
				'errorLogs': Provider.of<ErrorLogsProvider>(ctx, listen: false),
				'inbox': Provider.of<InboxProvider>(ctx, listen: false),
        // ~cb-data-initializer-provider-map~
      };

  // Method to initialize all providers' fetchAllAndSave methods
  Future<void> initializeAll() async {
    final registry = _providerMap(context);

    await Future.wait(
      registry.values.map((provider) {
        return provider.fetchAllAndSave();
      }),
    );
  }

  Future<void> fetchByName(String providerName) async {
    final registry = _providerMap(context);
    final provider = registry[providerName];
    if (provider == null) {
      throw Exception("No provider found with name '$providerName'.");
    }
    await provider.fetchAllAndSave();
  }
}
