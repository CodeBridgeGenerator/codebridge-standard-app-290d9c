import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class DepartmentHOS {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? departmentId;
	 
	@HiveField(2)
	final String? sectionHead;
	 

  DepartmentHOS({
    this.id,
		this.departmentId,
		this.sectionHead
  });

  factory DepartmentHOS.fromJson(Map<String, dynamic> map) {
    return DepartmentHOS(
      id: map['_id'] as String?,
			map['departmentId'] != null ? departmentId : map['departmentId'] as String : "",
			map['sectionHead'] != null ? sectionHead : map['sectionHead'] as String : ""
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id
    };
}

  @override
  String toString() => 'DepartmentHOS('_id' : $id,"departmentId": $departmentId,"sectionHead": $sectionHead)';
}