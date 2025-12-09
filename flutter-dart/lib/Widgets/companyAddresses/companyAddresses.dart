import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class CompanyAddresses {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? companyId;
	 
	@HiveField(2)
	final String? Street1;
	 
	@HiveField(3)
	final String? Street2;
	 
	@HiveField(4)
	final String? Poscode;
	 
	@HiveField(5)
	final String? City;
	 
	@HiveField(6)
	final String? State;
	 
	@HiveField(7)
	final String? Province;
	 
	@HiveField(8)
	final String? Country;
	 
	@HiveField(9)
	final bool? isDefault;
	 

  CompanyAddresses({
    this.id,
		this.companyId,
		this.Street1,
		this.Street2,
		this.Poscode,
		this.City,
		this.State,
		this.Province,
		this.Country,
		this.isDefault
  });

  factory CompanyAddresses.fromJson(Map<String, dynamic> map) {
    return CompanyAddresses(
      id: map['_id'] as String?,
			map['companyId'] != null ? companyId : map['companyId'] as String : "",
			map['Street1'] != null ? Street1 : map['Street1'] as String : "",
			map['Street2'] != null ? Street2 : map['Street2'] as String : "",
			map['Poscode'] != null ? Poscode : map['Poscode'] as String : "",
			map['City'] != null ? City : map['City'] as String : "",
			map['State'] != null ? State : map['State'] as String : "",
			map['Province'] != null ? Province : map['Province'] as String : "",
			map['Country'] != null ? Country : map['Country'] as String : "",
			isDefault : map['isDefault'] as bool
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			'isDefault' : isDefault
    };
}

  @override
  String toString() => 'CompanyAddresses('_id' : $id,"companyId": $companyId,"Street1": $Street1,"Street2": $Street2,"Poscode": $Poscode,"City": $City,"State": $State,"Province": $Province,"Country": $Country,"isDefault": $isDefault)';
}